import mongoose, { Schema, Types, Model } from "mongoose";

export interface IQuestion {
  _id: Types.ObjectId;
  title: string;
  description: string;
  difficulty: "Easy" | "Medium" | "Hard";
  topics: string[];
  constraints: string[];
  examples: { input: string; output: string; explanation?: string }[];
  testCases: { input: string; expectedOutput: string }[];
  functionSignatures: {
    javascript: string;
    python: string;
    cpp: string;
    java: string;
  };
  createdBy: Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}

type QuestionModel = Model<IQuestion>;

const questionSchema = new Schema<IQuestion, QuestionModel>(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    topics: {
      type: [String],
      default: [],
    },
    constraints: {
      type: [String],
      default: [],
    },
    examples: [
      {
        _id: false,
        input: { type: String, required: true },
        output: { type: String, required: true },
        explanation: { type: String },
      },
    ],
    testCases: [
      {
        _id: false,
        input: { type: String, required: true },
        expectedOutput: { type: String, required: true },
      },
    ],
    functionSignatures: {
      javascript: { type: String, required: true },
      python: { type: String, required: true },
      cpp: { type: String, required: true },
      java: { type: String, required: true },
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "Admin",
      required: true,
    },
  },
  { timestamps: true }
);

export type QuestionDocument = IQuestion & mongoose.Document;
export const QUESTION = mongoose.model<IQuestion,QuestionModel>("Questions", questionSchema);