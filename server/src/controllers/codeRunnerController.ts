import { Request, Response } from "express";
import axios from "axios";
import { languageIdToNameMap } from "../utils/languageMap";
import { QUESTION } from "../models/questionModel";
import { USERQUESTIONRELATION } from "../models/userQuestionRelationsModel";
import { getEligibleBadges,getNewBadges,getPointsForDifficulty } from "../utils/pointsAndBadges";
import { USER } from "../models/userModel";

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function getFunctionSignatureRegex(
  language: string,
  signatureLine: string
): RegExp {
  const escaped = escapeRegex(signatureLine.trim()).replace(/\s+/g, "\\s*");

  if (language === "python") {
    return new RegExp(escaped + "\\s*:", "m"); // e.g. def twoSum(...)
  }

  if (language === "javascript") {
    return new RegExp(escaped + "\\s*{", "m"); // function twoSum(...) {
  }

  if (language === "java" || language === "cpp") {
    const funcName = signatureLine.match(/\b(\w+)\s*\(/)?.[1]; // extract "twoSum"
    if (!funcName) throw new Error("Invalid function signature format");

    return new RegExp(`\\b${funcName}\\s*\\(`); // match: twoSum(
  }

  // default fallback
  return new RegExp(escaped);
}

// This function not handle string parsing in testcases
// function parseInputString(input: string): Record<string, any> {
//   const result: Record<string, any> = {};

//   input.split(";").forEach((pair) => {
//     const [key, value] = pair.split("=").map((s) => s.trim());

//     if (value?.startsWith("[") || value?.startsWith("{")) {
//       // Try to parse arrays or objects
//       try {
//         result[key] = eval(value); // or use JSON5 if you want safer parsing
//       } catch {
//         result[key] = value; // fallback to string
//       }
//     } else if (!isNaN(Number(value))) {
//       result[key] = Number(value);
//     } else {
//       result[key] = value;
//     }
//   });

//   return result;
// }

function parseInputString(input: string): Record<string, any> {
  const result: Record<string, any> = {};

  input.split(";").forEach((pair) => {
    const [key, valueRaw] = pair.split("=").map((s) => s.trim());

    if (!key || valueRaw === undefined) return;

    let value: any = valueRaw;

    // Try to parse JSON if it looks like an array or object
    if ((value.startsWith("[") && value.endsWith("]")) || (value.startsWith("{") && value.endsWith("}"))) {
      try {
        result[key] = JSON.parse(value);
        return;
      } catch {
        result[key] = value;
        return;
      }
    }

    // Handle numbers
    if (!isNaN(Number(value))) {
      result[key] = Number(value);
      return;
    }

    // Handle quoted strings (like "bbbbb" or 'bbbbb')
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      result[key] = value.slice(1, -1); // Remove surrounding quotes
      return;
    }

    // Fallback to raw string
    result[key] = value;
  });

  return result;
}


interface Judge0Response {
  stdout?: string;
  stderr?: string;
  compile_output?: string;
  status?: {
    id: number;
    description: string;
  };
  time?: number;
  memory?: number;
}

export const runCode = async (req: Request, res: Response): Promise<void> => {
  const { sourceCode, languageId, stdin, questionId } = req.body;

  if (!questionId) {
    res.status(400).json({ error: "Missing questionId" });
    return;
  }

  try {
    const languageName = languageIdToNameMap[languageId];
    if (!languageName) {
      res.status(400).json({ error: "Unsupported languageId" });
      return;
    }

    const question = await QUESTION.findById(questionId);
    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    const requiredSignature =
      question.functionSignatures[
        languageName as keyof typeof question.functionSignatures
      ];
    if (!requiredSignature) {
      res
        .status(400)
        .json({
          error: `Function signature not found for language: ${languageName}`,
        });
      return;
    }

    const regex = getFunctionSignatureRegex(languageName, requiredSignature);

    if (!regex.test(sourceCode)) {
      res.status(200).json({
        stdout: "",
        stderr: "",
        compile_output: "",
        error: `Your code must include the predefined function signature:\n\n${requiredSignature}`,
      });
      return;
    }

    const functionNameMatch = requiredSignature.match(
      /([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/
    );
    const functionName = functionNameMatch ? functionNameMatch[1] : null;
    if (!functionName) {
      res.status(400).json({ error: "Invalid function signature format" });
      return;
    }

    const testCases = question.testCases.slice(0, 2);
    let testCaseRunnerCode = "";

    for (const testCase of testCases) {
      const inputs = parseInputString(testCase.input);

      const args = Object.keys(inputs).map((key) => {
        return languageName === "java" || languageName === "cpp"
          ? ""
          : JSON.stringify(inputs[key]);
      });

      if (languageName === "python") {
        testCaseRunnerCode +=
          `\nresult = ${functionName}(${args.join(", ")})\n` +
          `print(str(result).lower() if isinstance(result, bool) else result)`;
      } else if (languageName === "javascript") {
        testCaseRunnerCode += `\nconsole.log(${functionName}(${args.join(", ")}));`;
        console.log("testCaseRunnerCode",testCaseRunnerCode);
      } else if (languageName === "java") {
        const javaMain = `
import java.util.*;
class Main {
  public static int[] ${functionName}(int[] nums, int target) {
    // User function body
  }

  public static void main(String[] args) {
    int[] nums = new int[]{${inputs["nums"]}};
    int target = ${inputs["target"]};
    int[] result = ${functionName}(nums, target);
    System.out.println(Arrays.toString(result));
  }
}`;
        testCaseRunnerCode = javaMain;
        break;
      } else if (languageName === "cpp") {
        const cppMain = `
#include <iostream>
#include <vector>
using namespace std;

vector<int> ${functionName}(vector<int>& nums, int target) {
  // User function body
}

int main() {
  vector<int> nums = {${inputs["nums"]}};
  int target = ${inputs["target"]};
  vector<int> result = ${functionName}(nums, target);
  for (int x : result) cout << x << " ";
  return 0;
}`;
        testCaseRunnerCode = cppMain;
        break;
      }
    }

    const finalCode =
      languageName === "java" || languageName === "cpp"
        ? testCaseRunnerCode
        : `${sourceCode}\n${testCaseRunnerCode}`;

    const response = await axios.post(
      "https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: finalCode,
        language_id: languageId,
        stdin: stdin || "",
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
          "X-RapidAPI-Host": process.env.JUDGE0_API_HOST!,
        },
      }
    );
    console.log(response.data);
    res.status(200).json(response.data);
  } catch (error:any) {
    console.error(error.response?.data || error.message);
    res.status(200).json({ message: "Code execution failed" ,error:(error as Error).message});
  }
};

export const submitCode = async (req: Request,res: Response): Promise<void> => {
  const { sourceCode, languageId, questionId } = req.body;
  const userId = req.user?._id;

  if (!questionId) {
    res.status(400).json({ error: "Missing questionId" });
    return;
  }

  try {
    const languageName = languageIdToNameMap[languageId];
    if (!languageName) {
      res.status(400).json({ error: "Unsupported language" });
      return;
    }

    const question = await QUESTION.findById(questionId);
    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    const requiredSignature = question.functionSignatures[languageName as keyof typeof question.functionSignatures];
    if (!requiredSignature) {
      res
        .status(400)
        .json({
          error: `Function signature not found for language: ${languageName}`,
        });
      return;
    }

    const regex = getFunctionSignatureRegex(languageName, requiredSignature);

    if (!regex.test(sourceCode)) {
      res.status(200).json({
        stdout: "",
        stderr: "", 
        compile_output: "",
        error: `Your code must include the predefined function signature:\n\n${requiredSignature}`,
      });
      return;
    }

    const functionName = requiredSignature.match(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\(/)?.[1];
    if (!functionName) {
      res.status(400).json({ error: "Invalid function signature" });
      return;
    }

    const testCases = question.testCases;
    let combinedCode = "";

    if (languageName === "python") {
      combinedCode = `${sourceCode}\n`;
      for (const testCase of testCases) {
        const inputs = parseInputString(testCase.input);
        const args = Object.values(inputs).map((arg) => JSON.stringify(arg)).join(", ");
        combinedCode += `print(${functionName}(${args}))\n`;
      }
    } else if (languageName === "javascript") {
      combinedCode = `${sourceCode}\n`;
      for (const testCase of testCases) {
        const inputs = parseInputString(testCase.input);
        const args = Object.values(inputs).map((arg) => JSON.stringify(arg)).join(", ");
        combinedCode += `console.log(${functionName}(${args}));\n`;
      }
    } else if (languageName === "java") {
      combinedCode = `
import java.util.*;
class Main {
  public static ${sourceCode}

  public static void main(String[] args) {
    ${testCases
      .map((testCase) => {
        const inputs = parseInputString(testCase.input);
        const nums = inputs["nums"] || "";
        const target = inputs["target"] || "";
        return `int[] nums = new int[]{${nums}};
int target = ${target};
int[] result = ${functionName}(nums, target);
System.out.println(Arrays.toString(result));`;
      })
      .join("\n")}
  }
}`;
    } else if (languageName === "cpp") {
      combinedCode = `
#include <iostream>
#include <vector>
using namespace std;

${sourceCode}

int main() {
${testCases
  .map((testCase) => {
    const inputs = parseInputString(testCase.input);
    const nums = inputs["nums"] || "";
    const target = inputs["target"] || "";
    return `vector<int> nums = {${nums}};
int target = ${target};
vector<int> result = ${functionName}(nums, target);
for (int x : result) cout << x << " ";
cout << endl;`;
  })
  .join("\n")}
  return 0;
}`;
    }

    // Submit combined code
    const result = await axios.post<Judge0Response>("https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=false&wait=true",
      {
        source_code: combinedCode,
        language_id: languageId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-RapidAPI-Key": process.env.JUDGE0_API_KEY!,
          "X-RapidAPI-Host": process.env.JUDGE0_API_HOST!,
        },
      }
    );


    const {stdout,stderr,compile_output,status,time: execTime,memory: execMemory} = result.data;

    // const normalize = (s: string) => s.replace(/\s+/g, ''); // remove all whitespace
    const safeParse = (val: string): any => {
      if (val == "True") return true;
      if (val == "False") return false;
      try {
        return JSON.parse(val);
      } catch {
        return val.trim(); // fallback to trimmed string if not valid JSON
      }
    };

    const actualOutputs =
      stdout?.trim().split("\n").slice(1).map((line) => safeParse(line)) || [];
    const expectedOutputs = testCases.map((tc) => safeParse(tc.expectedOutput));

    const isEqual = (a: any, b: any): boolean => {
      if (typeof a !== typeof b) return false;
      if (Array.isArray(a) && Array.isArray(b)) {
        return (
          a.length === b.length && a.every((val, idx) => isEqual(val, b[idx]))
        );
      }
      return a === b;
    };

    const isAccepted =
      actualOutputs.length === expectedOutputs.length &&
      actualOutputs.every((out, i) => isEqual(out, expectedOutputs[i]));

    const finalStatus = isAccepted ? "Accepted" : "Wrong Answer";
  
    const existingRelation = await USERQUESTIONRELATION.findOne({
      user_id: userId,
      question_id: questionId,
    });

    const user = await USER.findById(userId);

    if (!existingRelation) {
      // Create new document
      const newRelation = await USERQUESTIONRELATION.create({
        user_id: userId,
        question_id: questionId,
        isSolved: isAccepted ? "Solved" : "Pending",
        solutions: [
          {
            language: languageName,
            solutionCode: sourceCode,
            status: finalStatus,
            time: isAccepted ? execTime : null,
            memory: isAccepted ? execMemory : null,
            submittedAt: new Date(),
          },
        ],
      });

      if (isAccepted && user) {
        const points = getPointsForDifficulty(
          question.difficulty as "Easy" | "Medium" | "Hard"
        );
        const newBadges = getNewBadges(user.points, points, user.badges || []);

        user.points += points;
        user.badges = Array.from(
          new Set([...(user.badges || []), ...newBadges])
        );
        await user.save();

        // pointsAwarded = points;
        // newlyAwardedBadges = newBadges;
      }

      res.status(200).json({
        message: "Submission recorded",
        language:languageName,
        solutionCode: sourceCode,
        time: execTime,
        memory: execMemory,
        status: finalStatus,
        isSolved: newRelation.isSolved,
        submittedAt: new Date(),
      });
      return;
    } else {
      // Already exists: always push the solution
      existingRelation.solutions.push({
        language: languageName,
        solutionCode: sourceCode,
        status: finalStatus,
        time: isAccepted ? execTime ?? 0 : null,
        memory: isAccepted ? execMemory ?? 0 : null,
        submittedAt: new Date(),
      });

      // Only update isSolved if it's not already "Solved" and the current is accepted
      if (existingRelation.isSolved !== "Solved" && isAccepted && user) {
        existingRelation.isSolved = "Solved";

        const points = getPointsForDifficulty(question.difficulty as "Easy" | "Medium" | "Hard");
        const newBadges = getNewBadges(user.points, points, user.badges || []);

        user.points += points;
        user.badges = Array.from(new Set([...(user.badges || []), ...newBadges]));
        await user.save();

        // pointsAwarded = points;
        // newlyAwardedBadges = newBadges;
      }

      await existingRelation.save();

      res.status(200).json({
        message: "Submission recorded",
        language:languageName,
        solutionCode: sourceCode,
        time: execTime,
        memory: execMemory,
        status: finalStatus,
        isSolved: existingRelation.isSolved,
        submittedAt: new Date(),
      });
      return;
    }
  } catch (error) {
    // console.error(error.response?.data || error.message);
    res.status(500).json({ message: "Code submission failed",error: (error as Error).message });
  }
};