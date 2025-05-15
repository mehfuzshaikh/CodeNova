"use client";

import React, { useEffect, useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useRouter, useParams } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/redux/store";
import { updateQuestionAction } from "@/redux/features/admin/questions/questionActions";
import { getQuestions } from "@/redux/features/admin/questions/questionActions";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
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

const schema = yup.object().shape({
  title: yup.string().trim().required("Title is required"),
  description: yup.string().trim().required("Description is required"),
  difficulty: yup.string().oneOf(["Easy", "Medium", "Hard"]).required("Difficulty is required"),
  topics: yup.string().optional(),
  constraints: yup.string().optional(),
  examples: yup.array().of(
    yup.object().shape({
      input: yup.string().required("Input is required"),
      output: yup.string().required("Output is required"),
      explanation: yup.string().required("Explanation is required"),
    })
  ),
  testCases: yup.array().of(
    yup.object().shape({
      input: yup.string().required("Input is required"),
      expectedOutput: yup.string().required("Expected output is required"),
    })
  ),
});

type EditQuestionFormData = yup.InferType<typeof schema>;

export default function EditQuestionPage() {
  const { id } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  
  const question = useSelector((state: RootState) =>
    state.questions.questions.find((q) => q._id === id)
  );

  useEffect(() => {
    if (!question) {
      dispatch(getQuestions());
    } else {
      setLoading(false);
    }
  }, [dispatch, question]);

  const { register, handleSubmit, control, setValue } = useForm<EditQuestionFormData>({
    resolver: yupResolver(schema),
    defaultValues: question || {},
  });

  const { fields: exampleFields, append: addExample, remove: removeExample } = useFieldArray({
    control,
    name: "examples",
  });

  const { fields: testCaseFields, append: addTestCase, remove: removeTestCase } = useFieldArray({
    control,
    name: "testCases",
  });

  const onSubmit = async (data: EditQuestionFormData) => {
    try {
      const formattedData = {
        ...data,
        topics: data.topics?.split(",").map((topic) => topic.trim()).filter((topic) => topic) || [],
        constraints: data.constraints?.split(",").map((constraint) => constraint.trim()).filter((constraint) => constraint) || [],
      };
      await dispatch(updateQuestionAction(id, formattedData));
      toast.success("Question updated successfully!");
      router.push("/admin/challenges");
    } catch {
      toast.error("Failed to update question");
    }
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-20">
      <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-3xl space-y-4 bg-white p-8 shadow-md rounded">
        <h2 className="text-2xl font-bold text-center">Edit Question</h2>

        <Input placeholder="Title" {...register("title")} />
        <Textarea placeholder="Description" {...register("description")} />

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

        {exampleFields.map((field, index) => (
          <div key={field.id}>
            <Input placeholder="Input" {...register(`examples.${index}.input`)} />
            <Input placeholder="Output" {...register(`examples.${index}.output`)} />
            <Input placeholder="Explanation" {...register(`examples.${index}.explanation`)} />
            <Button variant="destructive" onClick={() => removeExample(index)}><FiTrash2 /></Button>
          </div>
        ))}
        <Button onClick={() => addExample({ input: "", output: "", explanation: "" })}>Add Example</Button>

        {testCaseFields.map((field, index) => (
          <div key={field.id}>
            <Input placeholder="Input" {...register(`testCases.${index}.input`)} />
            <Input placeholder="Expected Output" {...register(`testCases.${index}.expectedOutput`)} />
            <Button variant="destructive" onClick={() => removeTestCase(index)}><FiTrash2 /></Button>
          </div>
        ))}
        <Button onClick={() => addTestCase({ input: "", expectedOutput: "" })}>Add Test Case</Button>

        <Button type="submit">Update Question</Button>
      </form>
    </div>
  );
}
