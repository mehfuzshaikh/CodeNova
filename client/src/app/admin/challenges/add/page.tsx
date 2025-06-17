"use client";

import React from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { addQuestionAction } from "@/redux/features/admin/questions/questionActions";
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
  title: yup
    .string()
    .trim()
    .min(3, "Title must be at least 3 characters")
    .max(100, "Title must be at most 100 characters")
    .required("Title is required"),

  description: yup
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .required("Description is required"),

  difficulty: yup
    .string()
    .trim()
    .oneOf(["Easy", "Medium", "Hard"])
    .required("Difficulty is required"),

  topics: yup
    .string()
    .trim()
    .optional()
    .test("commaSeparated", "Enter topics separated by commas", (value) => {
      if (!value) return true; // Allow empty value
      return value.split(",").every((topic) => topic.trim().length > 0);
    }),

  constraints: yup
    .string()
    .trim()
    .optional()
    .test(
      "commaSeparated",
      "Enter constraints separated by commas",
      (value) => {
        if (!value) return true; // Allow empty value
        return value
          .split(",")
          .every((constraint) => constraint.trim().length > 0);
      }
    ),

  examples: yup
    .array()
    .of(
      yup.object().shape({
        input: yup.string().trim().required("Example input is required"),
        output: yup.string().trim().required("Example output is required"),
        explanation: yup
          .string()
          .trim()
          .required("Example explanation is required"),
      })
    )
    .min(1, "At least one example is required")
    .required("Examples are required"),

  testCases: yup
    .array()
    .of(
      yup.object().shape({
        input: yup.string().trim().required("Test case input is required"),
        expectedOutput: yup
          .string()
          .trim()
          .required("Expected output is required"),
      })
    )
    .min(1, "At least one test case is required")
    .required("Test cases are required"),

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

type AddQuestionFormData = Omit<
  yup.InferType<typeof schema>,
  "topics" | "constraints"
> & {
  difficulty: "Easy" | "Medium" | "Hard";
  topics?: string;
  constraints?: string;
  functionSignatures?: {
    python?: string;
    javascript?: string;
    java?: string;
    cpp?: string;
  };
};

export default function AddQuestionPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddQuestionFormData>({
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    resolver: yupResolver(schema) as any,
    defaultValues: {
      title: "",
      description: "",
      topics: "",
      constraints: "",
      examples: [{ input: "", output: "", explanation: "" }],
      testCases: [{ input: "", expectedOutput: "" }],
      functionSignatures: {
        python: "",
        javascript: "",
        java: "",
        cpp: "",
      },
    },
  });

  const {
    fields: exampleFields,
    append: addExample,
    remove: removeExample,
  } = useFieldArray({
    control,
    name: "examples",
  });

  const {
    fields: testCaseFields,
    append: addTestCase,
    remove: removeTestCase,
  } = useFieldArray({
    control,
    name: "testCases",
  });

  const onSubmit = async (data: AddQuestionFormData) => {
    try {
      const formattedData = {
        ...data,
        topics:
          data.topics
            ?.split(",")
            .map((topic) => topic.trim())
            .filter((topic) => topic) || [],
        constraints:
          data.constraints
            ?.split(",")
            .map((constraint) => constraint.trim())
            .filter((constraint) => constraint) || [],
      };
      const res = await dispatch(addQuestionAction(formattedData));
      console.log("res from add question:", res);
      toast.success("Question added successfully!");
      router.push("/admin/challenges");
    } catch {
      toast.error("Failed to add question");
    }
  };

  return (
    <ProtectedAdminRoute>
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-3xl space-y-4 bg-white p-8 shadow-md rounded"
      >
        <h2 className="text-2xl font-bold text-center text-gray-800">Add New Question</h2>

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
        {errors.difficulty && (
          <p className="text-red-600">{errors.difficulty.message}</p>
        )}

        <Input placeholder="Topics (comma-separated)" {...register("topics")} />
        {errors.topics && (
          <p className="text-red-600">{errors.topics.message}</p>
        )}

        <Input
          placeholder="Constraints (comma-separated)"
          {...register("constraints")}
        />
        {errors.constraints && (
          <p className="text-red-600">{errors.constraints.message}</p>
        )}

        <h3>Examples:</h3>
        {errors.examples && (
          <p className="text-red-600">{errors.examples.message}</p>
        )}
        {exampleFields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <Input
              placeholder="Input"
              {...register(`examples.${index}.input`)}
            />
            {errors.examples?.[index]?.input && (
              <p className="text-red-600">
                {errors.examples[index]?.input?.message}
              </p>
            )}

            <Input
              placeholder="Output"
              {...register(`examples.${index}.output`)}
            />
            {errors.examples?.[index]?.output && (
              <p className="text-red-600">
                {errors.examples[index]?.output?.message}
              </p>
            )}

            <Input
              placeholder="Explanation"
              {...register(`examples.${index}.explanation`)}
            />
            {errors.examples?.[index]?.explanation && (
              <p className="text-red-600">
                {errors.examples[index]?.explanation?.message}
              </p>
            )}

            <Button variant="destructive" onClick={() => removeExample(index)}>
              {" "}
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
        {errors.testCases && (
          <p className="text-red-600">{errors.testCases.message}</p>
        )}
        {testCaseFields.map((field, index) => (
          <div key={field.id} className="space-y-2">
            <Input
              placeholder="Input"
              {...register(`testCases.${index}.input`)}
            />
            {errors.testCases?.[index]?.input && (
              <p className="text-red-600">
                {errors.testCases[index]?.input?.message}
              </p>
            )}

            <Input
              placeholder="Expected Output"
              {...register(`testCases.${index}.expectedOutput`)}
            />
            {errors.testCases?.[index]?.expectedOutput && (
              <p className="text-red-600">
                {errors.testCases[index]?.expectedOutput?.message}
              </p>
            )}

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
          <p className="text-red-600">{errors.functionSignatures.javascript.message}</p>
        )}

        <label className="text-gray-500 text-sm">Python</label>
        <Textarea
          placeholder="def twoSum(nums: List[int], target: int) -> List[int]"
          {...register("functionSignatures.python")}
        />
        {errors.functionSignatures?.python && (
          <p className="text-red-600">{errors.functionSignatures.python.message}</p>
        )}

        <label className="text-gray-500 text-sm">C++</label>
        <Textarea
          placeholder="vector<int> twoSum(vector<int>& nums, int target) { ... }"
          {...register("functionSignatures.cpp")}
        />
        {errors.functionSignatures?.cpp && (
          <p className="text-red-600">{errors.functionSignatures.cpp.message}</p>
        )}

        <label className="text-gray-500 text-sm">Java</label>
        <Textarea
          placeholder="public int[] twoSum(int[] nums, int target) { ... }"
          {...register("functionSignatures.java")}
        />
        {errors.functionSignatures?.java && (
          <p className="text-red-600">{errors.functionSignatures.java.message}</p>
        )}

        <div className="flex justify-between">
          <Button type="submit" disabled={isSubmitting} className="w-1/2 mr-2 btn-ghost-custom">
            {isSubmitting ? "Adding..." : "Add Question"}
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
