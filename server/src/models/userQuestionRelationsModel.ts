import mongoose, { Schema, Types, Model } from "mongoose";

interface ISolution {
  language: string;
  solutionCode: string;
  status: string; 
  submittedAt: Date;
  time: number | null;
  memory: number | null;
}

export interface IUserQuestionRelation{
  user_id: mongoose.Types.ObjectId;
  question_id: mongoose.Types.ObjectId;
  isSolved: string;
  solutions: ISolution[];
}

type UserQuestionRelationModel = Model<IUserQuestionRelation>;

const solutionSchema = new Schema<ISolution>({
  language: { type: String, required: true },
  solutionCode: { type: String, required: true },
  status: { type: String},
  submittedAt: { type: Date, default: Date.now },
  time: { type: Number },
  memory: { type: Number },
},{ _id: false });

const userQuestionRelationSchema = new Schema<IUserQuestionRelation,UserQuestionRelationModel>({
  user_id: { type: Schema.Types.ObjectId, ref: 'Users', required: true },
  question_id: { type: Schema.Types.ObjectId, ref: 'Questions', required: true },
  isSolved: { type: String, enum: ['Solved', 'Pending'], default: 'Pending' },
  solutions: { type: [solutionSchema], default: [] },
});

export type UserQuestionRelationDocument = IUserQuestionRelation & mongoose.Document;
export const USERQUESTIONRELATION = mongoose.model<IUserQuestionRelation,UserQuestionRelationModel>(
  'UserQuestionRelation',
  userQuestionRelationSchema
);
