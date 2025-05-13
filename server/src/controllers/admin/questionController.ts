import { Request, Response } from "express";
import { QUESTION } from "../../models/questionModel";

export const addQuestion = async (req: Request, res: Response):Promise<void> => {
  try {
    const {
      title,
      description,
      difficulty,
      topics,
      constraints,
      examples,
      testCases,
    } = req.body;

    const questionData = {
      title,
      description,
      difficulty,
      topics,
      constraints,
      examples,
      testCases,
      createdBy:req.admin?._id
    };

    const newQuestion = await QUESTION.create(questionData);

    res.status(201).json({message: "Question added successfully",data: newQuestion});
  } catch (error) {
    res.status(400).json({message: "Something went wrong",error: (error as Error).message});
  }
};
