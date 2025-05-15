"use client";

import React, { useState, ChangeEvent, FormEvent } from "react";
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

// Types for form data and errors
interface Example {
  input: string;
  output: string;
  explanation?: string;
}

interface TestCase {
  input: string;
  expectedOutput: string;
}

interface FormData {
  title: string;
  description: string;
  difficulty: string;
  topics: string;
  constraints: string;
  examples: Example[];
  testCases: TestCase[];
}

interface ExampleError {
  input?: string;
  output?: string;
  explanation?: string;
}

interface TestCaseError {
  input?: string;
  expectedOutput?: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  difficulty?: string;
  topics?: string;
  constraints?: string;
  examples?: string;
  testCases?: string;
  exampleItems?: (ExampleError | null)[];
  testCaseItems?: (TestCaseError | null)[];
}

export default function AddQuestionPage() {
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    difficulty: "",
    topics: "",
    constraints: "",
    examples: [{ input: "", output: "", explanation: "" }],
    testCases: [{ input: "", expectedOutput: "" }]
  });

  // Form validation function
  const validateForm = (): FormErrors => {
    const errors: FormErrors = {};
    
    if (!formData.title || formData.title.trim().length < 3) {
      errors.title = "Title must be at least 3 characters";
    } else if (formData.title.trim().length > 100) {
      errors.title = "Title must be at most 100 characters";
    }

    if (!formData.description || formData.description.trim().length < 10) {
      errors.description = "Description must be at least 10 characters";
    }

    if (!formData.difficulty) {
      errors.difficulty = "Difficulty is required";
    }

    // Validate topics (optional field)
    if (formData.topics && !formData.topics.split(",").every(topic => topic.trim().length > 0)) {
      errors.topics = "Enter topics separated by commas";
    }

    // Validate constraints (optional field)
    if (formData.constraints && !formData.constraints.split(",").every(constraint => constraint.trim().length > 0)) {
      errors.constraints = "Enter constraints separated by commas";
    }

    // Validate examples
    if (!formData.examples || formData.examples.length === 0) {
      errors.examples = "At least one example is required";
    } else {
      const exampleErrors = formData.examples.map((example) => {
        const exampleError: ExampleError = {};
        if (!example.input || example.input.trim() === "") {
          exampleError.input = "Example input is required";
        }
        if (!example.output || example.output.trim() === "") {
          exampleError.output = "Example output is required";
        }
        return Object.keys(exampleError).length > 0 ? exampleError : null;
      });
      
      if (exampleErrors.some(error => error !== null)) {
        errors.exampleItems = exampleErrors;
      }
    }

    // Validate test cases
    if (!formData.testCases || formData.testCases.length === 0) {
      errors.testCases = "At least one test case is required";
    } else {
      const testCaseErrors = formData.testCases.map((testCase) => {
        const testCaseError: TestCaseError = {};
        if (!testCase.input || testCase.input.trim() === "") {
          testCaseError.input = "Test case input is required";
        }
        if (!testCase.expectedOutput || testCase.expectedOutput.trim() === "") {
          testCaseError.expectedOutput = "Expected output is required";
        }
        return Object.keys(testCaseError).length > 0 ? testCaseError : null;
      });
      
      if (testCaseErrors.some(error => error !== null)) {
        errors.testCaseItems = testCaseErrors;
      }
    }

    return errors;
  };

  // Handle form input changes
  const handleInputChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle select changes
  const handleSelectChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      difficulty: value
    }));
  };

  // Handle example changes
  const handleExampleChange = (index: number, field: keyof Example, value: string) => {
    setFormData(prev => {
      const updatedExamples = [...prev.examples];
      updatedExamples[index] = {
        ...updatedExamples[index],
        [field]: value
      };
      return {
        ...prev,
        examples: updatedExamples
      };
    });
  };

  // Handle test case changes
  const handleTestCaseChange = (index: number, field: keyof TestCase, value: string) => {
    setFormData(prev => {
      const updatedTestCases = [...prev.testCases];
      updatedTestCases[index] = {
        ...updatedTestCases[index],
        [field]: value
      };
      return {
        ...prev,
        testCases: updatedTestCases
      };
    });
  };

  // Add a new example
  const addExample = () => {
    setFormData(prev => ({
      ...prev,
      examples: [...prev.examples, { input: "", output: "", explanation: "" }]
    }));
  };

  // Remove an example
  const removeExample = (index: number) => {
    setFormData(prev => ({
      ...prev,
      examples: prev.examples.filter((_, i) => i !== index)
    }));
  };

  // Add a new test case
  const addTestCase = () => {
    setFormData(prev => ({
      ...prev,
      testCases: [...prev.testCases, { input: "", expectedOutput: "" }]
    }));
  };

  // Remove a test case
  const removeTestCase = (index: number) => {
    setFormData(prev => ({
      ...prev,
      testCases: prev.testCases.filter((_, i) => i !== index)
    }));
  };

  // Form submission handler
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // Validate form
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setIsSubmitting(true);
    setFormErrors({});

    try {
      // Format data for submission
      const formattedData = {
        ...formData,
        topics: formData.topics
          ? formData.topics.split(",").map(topic => topic.trim()).filter(topic => topic)
          : [],
        constraints: formData.constraints
          ? formData.constraints.split(",").map(constraint => constraint.trim()).filter(constraint => constraint)
          : [],
        examples: formData.examples.map(example => ({
          ...example,
          explanation: example.explanation ?? ""
        }))
      };

      const res = await dispatch(addQuestionAction(formattedData));
      console.log('res from add question:', res);
      toast.success("Question added successfully!");
      router.push("/admin/challenges");
    } catch (error) {
      toast.error("Failed to add question");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen items-start justify-center bg-gray-50 px-4 pt-20">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-3xl space-y-4 bg-white p-8 shadow-md rounded"
      >
        <h2 className="text-2xl font-bold text-center">Add New Question</h2>

        <Input 
          placeholder="Title" 
          name="title"
          value={formData.title}
          onChange={handleInputChange}
        />
        {formErrors.title && <p className="text-red-600">{formErrors.title}</p>}

        <Textarea 
          placeholder="Description" 
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
        {formErrors.description && (
          <p className="text-red-600">{formErrors.description}</p>
        )}

        <Select value={formData.difficulty} onValueChange={handleSelectChange}>
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
        {formErrors.difficulty && (
          <p className="text-red-600">{formErrors.difficulty}</p>
        )}

        <Input 
          placeholder="Topics (comma-separated)" 
          name="topics"
          value={formData.topics}
          onChange={handleInputChange}
        />
        {formErrors.topics && (
          <p className="text-red-600">{formErrors.topics}</p>
        )}

        <Input
          placeholder="Constraints (comma-separated)"
          name="constraints"
          value={formData.constraints}
          onChange={handleInputChange}
        />
        {formErrors.constraints && (
          <p className="text-red-600">{formErrors.constraints}</p>
        )}

        <h3>Examples:</h3>
        {formErrors.examples && (
          <p className="text-red-600">{formErrors.examples}</p>
        )}
        {formData.examples.map((example, index) => (
          <div key={index} className="space-y-2">
            <Input
              placeholder="Input"
              value={example.input}
              onChange={(e) => handleExampleChange(index, "input", e.target.value)}
            />
            {formErrors.exampleItems?.[index]?.input && (
              <p className="text-red-600">
                {formErrors.exampleItems[index]?.input}
              </p>
            )}

            <Input
              placeholder="Output"
              value={example.output}
              onChange={(e) => handleExampleChange(index, "output", e.target.value)}
            />
            {formErrors.exampleItems?.[index]?.output && (
              <p className="text-red-600">
                {formErrors.exampleItems[index]?.output}
              </p>
            )}

            <Input
              placeholder="Explanation"
              value={example.explanation || ""}
              onChange={(e) => handleExampleChange(index, "explanation", e.target.value)}
            />

            <Button 
              type="button"
              onClick={() => removeExample(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button
          type="button"
          onClick={addExample}
        >
          Add Example
        </Button>

        <h3>Test Cases:</h3>
        {formErrors.testCases && (
          <p className="text-red-600">{formErrors.testCases}</p>
        )}
        {formData.testCases.map((testCase, index) => (
          <div key={index} className="space-y-2">
            <Input
              placeholder="Input"
              value={testCase.input}
              onChange={(e) => handleTestCaseChange(index, "input", e.target.value)}
            />
            {formErrors.testCaseItems?.[index]?.input && (
              <p className="text-red-600">
                {formErrors.testCaseItems[index]?.input}
              </p>
            )}

            <Input
              placeholder="Expected Output"
              value={testCase.expectedOutput}
              onChange={(e) => handleTestCaseChange(index, "expectedOutput", e.target.value)}
            />
            {formErrors.testCaseItems?.[index]?.expectedOutput && (
              <p className="text-red-600">
                {formErrors.testCaseItems[index]?.expectedOutput}
              </p>
            )}

            <Button 
              type="button"
              onClick={() => removeTestCase(index)}
            >
              Remove
            </Button>
          </div>
        ))}
        <Button 
          type="button"
          onClick={addTestCase}
        >
          Add Test Case
        </Button>

        <Button type="submit" disabled={isSubmitting} className="w-full">
          {isSubmitting ? "Adding..." : "Add Question"}
        </Button>
      </form>
    </div>
  );
}