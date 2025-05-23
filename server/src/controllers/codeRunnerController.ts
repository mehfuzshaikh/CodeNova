import { Request, Response } from 'express';
import axios from 'axios';
import { languageIdToNameMap } from '../utils/languageMap';
import { QUESTION } from '../models/questionModel';

function escapeRegex(str: string) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function getFunctionSignatureRegex(language: string, signatureLine: string): RegExp {
  const escaped = escapeRegex(signatureLine.trim()).replace(/\s+/g, '\\s*');

  if (language === 'python') {
    return new RegExp(escaped + '\\s*:', 'm'); // e.g. def twoSum(...)
  }

  if (language === 'javascript') {
    return new RegExp(escaped + '\\s*{', 'm'); // function twoSum(...) {
  }

  if (language === 'java' || language === 'cpp') {
    const funcName = signatureLine.match(/\b(\w+)\s*\(/)?.[1]; // extract "twoSum"
    if (!funcName) throw new Error("Invalid function signature format");

    return new RegExp(`\\b${funcName}\\s*\\(`); // match: twoSum(
  }

  // default fallback
  return new RegExp(escaped);
}

function parseInputString(input: string): Record<string, any> {
  const result: Record<string, any> = {};

  input.split(';').forEach(pair => {
    const [key, value] = pair.split('=').map(s => s.trim());

    if (value?.startsWith('[') || value?.startsWith('{')) {
      // Try to parse arrays or objects
      try {
        result[key] = eval(value); // or use JSON5 if you want safer parsing
      } catch {
        result[key] = value; // fallback to string
      }
    } else if (!isNaN(Number(value))) {
      result[key] = Number(value);
    } else {
      result[key] = value;
    }
  });

  return result;
}

export const runCode = async (req: Request, res: Response):Promise<void> => {
  const { sourceCode, languageId, stdin, questionId } = req.body;

  if (!questionId) {
    res.status(400).json({ error: "Missing questionId" });
    return;
  }

  try {
    const languageName = languageIdToNameMap[languageId];
    if (!languageName) {
      res.status(400).json({ error: "Unsupported languageId" });
      return
    }

    const question = await QUESTION.findById(questionId);
    if (!question) {
      res.status(404).json({ error: "Question not found" });
      return;
    }

    const requiredSignature = question.functionSignatures[languageName as keyof typeof question.functionSignatures];
    if (!requiredSignature) {
      res.status(400).json({ error: `Function signature not found for language: ${languageName}` });
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
      res
        .status(400)
        .json({ error: "Invalid function signature format" });
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
        testCaseRunnerCode += `\nprint(${functionName}(${args.join(", ")}))`;
      } else if (languageName === "javascript") {
        testCaseRunnerCode += `\nconsole.log(${functionName}(${args.join(
          ", "
        )}));`;
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
      'https://judge0-ce.p.rapidapi.com/submissions?base64_encoded=true&wait=true',
      {
        source_code: finalCode,
        language_id: languageId,
        stdin: stdin || '',
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-RapidAPI-Key': process.env.JUDGE0_API_KEY!,
          'X-RapidAPI-Host': process.env.JUDGE0_API_HOST!,
        },
      }
    );

    res.status(200).json(response.data);
  } catch (error: any) {
    console.error(error.response?.data || error.message);
    res.status(500).json({ error: 'Code execution failed' });
  }
};
