"use client";

import React from "react";
import { useForm, useFieldArray } from "react-hook-form";
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
} from "@/components/ui/select"

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
    .oneOf(["Easy", "Medium", "Hard"], "Difficulty must be one of Easy, Medium, or Hard")
    .required("Difficulty is required"),

  topics: yup
    .array()
    .of(yup.string().trim())
    .optional(),

  constraints: yup
    .array()
    .of(yup.string().trim())
    .optional(),

  examples: yup
    .array()
    .of(
      yup.object().shape({
        input: yup
          .string()
          .trim()
          .required("Example input is required"),
        output: yup
          .string()
          .trim()
          .required("Example output is required"),
        explanation: yup
          .string()
          .trim()
          .optional(),
      })
    )
    .min(1, "At least one example is required"),
    // .required("Examples are required"),

  testCases: yup
    .array()
    .of(
      yup.object().shape({
        input: yup
          .string()
          .trim()
          .required("Test case input is required"),
        expectedOutput: yup
          .string()
          .trim()
          .required("Expected output is required"),
      })
    )
    .min(1, "At least one test case is required")
    // .required("Test cases are required"),
});

type AddQuestionFormData = yup.InferType<typeof schema>;

export default function AddQuestionPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<AddQuestionFormData>({
    resolver: yupResolver(schema),
    defaultValues: {
      examples: [{ input: "", output: "", explanation: "" }],
      testCases: [{ input: "", expectedOutput: "" }],
    },
  });

  const { fields: exampleFields, append: addExample, remove: removeExample } =
    useFieldArray({
      control,
      name: "examples",
    });

  const { fields: testCaseFields, append: addTestCase, remove: removeTestCase } =
    useFieldArray({
      control,
      name: "testCases",
    });

  const onSubmit = async (data: AddQuestionFormData) => {
    try {
      await dispatch(addQuestionAction(data));
      toast.success("Question added successfully!");
      router.push("/admin/challenges");
    } catch {
      toast.error("Failed to add question");
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-20">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-5xl space-y-4 rounded-lg bg-white p-8 shadow-lg"
      >
        <h2 className="text-2xl font-bold text-center">Add New Question</h2>

        <Input placeholder="Title" {...register("title")} />
        {errors.title && <p className="text-sm text-red-600">{errors.title.message}</p>}

        <Textarea placeholder="Description" {...register("description")}/>
        {errors.description && (
          <p className="text-sm text-red-600">{errors.description.message}</p>
        )}

        <Select {...register("difficulty")}>
        <SelectTrigger className="w-full">
            <SelectValue placeholder="Select Difficulty" />
        </SelectTrigger>
        <SelectContent>
            <SelectGroup>
            <SelectLabel>Difficulties</SelectLabel>
            <SelectItem value="Easy">Easy</SelectItem>
            <SelectItem value="Medium">Medium</SelectItem>
            <SelectItem value="Hard">Hard</SelectItem>
            </SelectGroup>
        </SelectContent>
        </Select>

        {errors.difficulty && (
          <p className="text-sm text-red-600">{errors.difficulty.message}</p>
        )}

        <Input placeholder="Topics (comma-separated)" {...register("topics")} />
        {errors.topics && <p className="text-sm text-red-600">{errors.topics.message}</p>}

        <Input placeholder="Constraints (comma-separated)" {...register("constraints")} />

        <h3>Examples:</h3>
        {exampleFields.map((_, index) => (
          <div key={index} className="space-y-2">
            <Input placeholder="Input" {...register(`examples.${index}.input`)} />
            <Input placeholder="Output" {...register(`examples.${index}.output`)} />
            <Input placeholder="Explanation" {...register(`examples.${index}.explanation`)} />
            <button type="button" onClick={() => removeExample(index)}>Remove</button>
          </div>
        ))}
        <Button type="button" onClick={() => addExample({ input: "", output: "", explanation: "" })}>
          Add Example
        </Button>

        <h3>Test Cases:</h3>
        {testCaseFields.map((_, index) => (
          <div key={index} className="space-y-2">
            <Input placeholder="Input" {...register(`testCases.${index}.input`)} />
            <Input placeholder="Expected Output" {...register(`testCases.${index}.expectedOutput`)} />
            <button type="button" onClick={() => removeTestCase(index)}>Remove</button>
          </div>
        ))}
        <Button type="button" onClick={() => addTestCase({ input: "", expectedOutput: "" })}>
          Add Test Case
        </Button>

        <Button type="submit" className="w-full" disabled={isSubmitting}>
          {isSubmitting ? "Adding..." : "Add Question"}
        </Button>
      </form>
    </div>
  );
}
