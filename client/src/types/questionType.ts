export interface Example {
  input: string;
  output: string;
  explanation: string;
}

export interface TestCase {
  input: string;
  expectedOutput: string;
}

export interface FunctionSignatures {
  javascript?: string;
  python?: string;
  java?: string;
  cpp?: string;
}

export interface Question {
  _id?: string;
  title: string;
  description: string;
  difficulty: string;
  topics?: string[];
  constraints?: string[];
  examples: Example[];
  testCases: TestCase[];
  functionSignatures?: FunctionSignatures;
  status?: string;
}

export interface QuestionState {
  questions: Question[];
  question?: Question;
  loading: boolean;
  error: string | null;
}
