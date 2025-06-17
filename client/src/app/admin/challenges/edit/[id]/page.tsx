"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { fetchOneQuestion, updateQuestionAction } from "@/redux/features/admin/questions/questionActions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { FiTrash2 } from "react-icons/fi";
import ProtectedAdminRoute from "@/components/shared/ProtectedAdminRoute";

const schema = yup.object().shape({
  title: yup.string().trim().min(3).max(100).required("Title is required"),
  description: yup.string().trim().min(10).required("Description is required"),
  difficulty: yup.string().oneOf(["Easy", "Medium", "Hard"]).required("Difficulty is required"),
  topics: yup.string().trim().optional(),
  constraints: yup.string().trim().optional(),
  examples: yup.array().of(
    yup.object().shape({
      input: yup.string().required("Example input is required"),
      output: yup.string().required("Example output is required"),
      explanation: yup.string().required("Explanation is required"),
    })
  ).min(1, "At least one example is required"),
  testCases: yup.array().of(
    yup.object().shape({
      input: yup.string().required("Test case input is required"),
      expectedOutput: yup.string().required("Expected output is required"),
    })
  ).min(1, "At least one test case is required"),
  functionSignatures: yup.object({
      python: yup
        .string()
        .trim()
        .required('Function signature for Python is required')
        .max(300, "Python signature must be at most 300 characters"),
      javascript: yup
        .string()
        .trim()
        .required('Function signature for Javascript is required')
        .max(300, "JavaScript signature must be at most 300 characters"),
      java: yup
        .string()
        .trim()
        .required('Function signature for Java is required')
        .max(300, "Java signature must be at most 300 characters"),
      cpp: yup
        .string()
        .trim()
        .required('Function signature for C++ is required')
        .max(300, "C++ signature must be at most 300 characters"),
    }),
});

export default function EditQuestionPage() {
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { question, loading } = useSelector((state: RootState) => state.questions);
  type QuestionFormValues = {
    title: string;
    description: string;
    difficulty: string;
    topics?: string;
    constraints?: string;
    examples: { input: string; output: string; explanation: string }[];
    testCases: { input: string; expectedOutput: string }[];
    functionSignatures?: {
      python?: string;
      javascript?: string;
      java?: string;
      cpp?: string;
    };
  };
  
  const [initialValues, setInitialValues] = useState<QuestionFormValues | null>(null);

  useEffect(() => {
    if (id) {
      const questionId = Array.isArray(id) ? id[0] : id;
      dispatch(fetchOneQuestion(questionId));
    }
  }, [dispatch, id]);

  useEffect(() => {
  if (question) {
    setInitialValues({
      title: question.title || "",
      description: question.description || "",
      difficulty: question.difficulty || "Easy",
      topics: question.topics?.join(", ") || "",
      constraints: question.constraints?.join(", ") || "",
      examples: question.examples?.map((example: { input: string; output: string; explanation: string }) => ({
        input: example.input || "",
        output: example.output || "",
        explanation: example.explanation || "",
      })) || [{ input: "", output: "", explanation: "" }],
      testCases: question.testCases?.map((testCase: { input: string; expectedOutput: string }) => ({
        input: testCase.input || "",
        expectedOutput: testCase.expectedOutput || "",
      })) || [{ input: "", expectedOutput: "" }],
      functionSignatures: {
        python: question.functionSignatures?.python || "",
        javascript: question.functionSignatures?.javascript || "",
        java: question.functionSignatures?.java || "",
        cpp: question.functionSignatures?.cpp || "",
      }
    });
  }
}, [question]);

  const { register, handleSubmit, control, reset ,formState: { errors, isSubmitting } } = useForm<QuestionFormValues>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: initialValues || {
      title: "",
      description: "",
      difficulty: "Easy",
      topics: "",
      constraints: "",
      examples: [{ input: "", output: "", explanation: "" }],
      testCases: [{ input: "", expectedOutput: "" }],
      functionSignatures: {
        python:"",
        javascript:"",
        java:"",
        cpp:"",
      }
    }, 
  });

  useEffect(() => {
    if (initialValues) {
      reset(initialValues);
    }
  }, [initialValues, reset]);

  const { fields: exampleFields, append: addExample, remove: removeExample } = useFieldArray({
    control,
    name: "examples",
  });

  const { fields: testCaseFields, append: addTestCase, remove: removeTestCase } = useFieldArray({
    control,
    name: "testCases",
  });

  const onSubmit = async (data:QuestionFormValues) => {
    try {
      const questionId = Array.isArray(id) ? id[0] : id;

      if (!questionId) {
        toast.error("Invalid question ID");
        return;
      }
      const formattedData = {
        ...data,
        topics: data.topics?.trim()
          ? data.topics.split(",").map((topic: string) => topic.trim())
          : [],
        constraints: data.constraints?.trim()
          ? data.constraints.split(",").map((constraint: string) => constraint.trim())
          : [],
      };
      await dispatch(updateQuestionAction(questionId,formattedData));
      toast.success("Question updated successfully!");
      router.push("/admin/challenges");
    } catch {
      toast.error("Failed to update question");
    }
  };

  if (loading || !initialValues) return <p>Loading...</p>;

  return (
    <ProtectedAdminRoute>
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl space-y-4 bg-white p-8 shadow-md rounded"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Edit Question</h2>

        <Input placeholder="Title" {...register("title")} />
        {errors.title && <p className="text-red-600">{errors.title.message}</p>}

        <Textarea placeholder="Description" {...register("description")} />
        {errors.description && (
          <p className="text-red-600">{errors.description.message}</p>
        )}

        <Controller
          name="difficulty"
          control={control}
          render={({ field }) => (
            <Select value={field.value} onValueChange={field.onChange}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Difficulty" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Difficulty</SelectLabel>
                  <SelectItem value="Easy">Easy</SelectItem>
                  <SelectItem value="Medium">Medium</SelectItem>
                  <SelectItem value="Hard">Hard</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          )}
        />

        <Input placeholder="Topics (comma-separated)" {...register("topics")} />
        <Input
          placeholder="Constraints (comma-separated)"
          {...register("constraints")}
        />

        <h3>Examples:</h3>
        {exampleFields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <Input
              placeholder="Input"
              {...register(`examples.${index}.input`)}
            />
            <Input
              placeholder="Output"
              {...register(`examples.${index}.output`)}
            />
            <Input
              placeholder="Explanation"
              {...register(`examples.${index}.explanation`)}
            />
            <Button variant="destructive" onClick={() => removeExample(index)}>
              <FiTrash2 />
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addExample({ input: "", output: "", explanation: "" });
          }}
        >
          Add Example
        </Button>

        <h3>Test Cases:</h3>
        {testCaseFields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <Input
              placeholder="Input"
              {...register(`testCases.${index}.input`)}
            />
            <Input
              placeholder="Expected Output"
              {...register(`testCases.${index}.expectedOutput`)}
            />
            <Button variant="destructive" onClick={() => removeTestCase(index)}>
              <FiTrash2 />
            </Button>
          </div>
        ))}
        <Button
          variant="secondary"
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addTestCase({ input: "", expectedOutput: "" });
          }}
        >
          Add Test Case
        </Button>

        <h3>Function Signatures:</h3>

        <label className="text-gray-500 text-sm">JavaScript</label>
        <Textarea
          placeholder="function twoSum(nums, target) { ... }"
          {...register("functionSignatures.javascript")}
        />
        {errors.functionSignatures?.javascript && (
          <p className="text-red-600">
            {errors.functionSignatures.javascript.message}
          </p>
        )}

        <label className="text-gray-500 text-sm">Python</label>
        <Textarea
          placeholder="def twoSum(nums: List[int], target: int) -> List[int]"
          {...register("functionSignatures.python")}
        />
        {errors.functionSignatures?.python && (
          <p className="text-red-600">
            {errors.functionSignatures.python.message}
          </p>
        )}

        <label className="text-gray-500 text-sm">C++</label>
        <Textarea
          placeholder="vector<int> twoSum(vector<int>& nums, int target) { ... }"
          {...register("functionSignatures.cpp")}
        />
        {errors.functionSignatures?.cpp && (
          <p className="text-red-600">
            {errors.functionSignatures.cpp.message}
          </p>
        )}

        <label className="text-gray-500 text-sm">Java</label>
        <Textarea
          placeholder="public int[] twoSum(int[] nums, int target) { ... }"
          {...register("functionSignatures.java")}
        />
        {errors.functionSignatures?.java && (
          <p className="text-red-600">
            {errors.functionSignatures.java.message}
          </p>
        )}

        <div className="flex justify-between">
          <Button type="submit" disabled={isSubmitting} className="w-1/2 mr-2 btn-ghost-custom">
            {isSubmitting ? "Updating..." : "Update Question"}
          </Button>
          <Button
            type="button"
            variant="outline"
            className="w-1/2 ml-2"
            onClick={() => router.push("/admin/challenges")}
          >
            Cancel
          </Button>
        </div>
      </form>
    </div>
    </ProtectedAdminRoute>
  );
}
