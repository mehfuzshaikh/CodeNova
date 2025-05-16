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

    res.status(201).json({message: "Question added successfully.",data: newQuestion});
  } catch (error) {
    res.status(400).json({message: "Failed to add question.",error: (error as Error).message});
  }
};

export const updateQuestion = async (req: Request, res: Response):Promise<void> => {
  try {
    const questionId = req.params.id;

    const {
      title,
      description,
      difficulty,
      topics,
      constraints,
      examples,
      testCases,
    } = req.body;

    const updatedData = {
      title,
      description,
      difficulty,
      topics,
      constraints,
      examples,
      testCases,
    };

    const updatedQuestion = await QUESTION.findByIdAndUpdate( questionId,updatedData,{ new: true });

    if (!updatedQuestion) {
      res.status(404).json({ message: "Question not found." });
      return;
    }

    res.status(200).json({ message: "Question updated successfully.",data: updatedQuestion });
  } catch (error) {
    res.status(500).json({ message: "Failed to update question.", error: (error as Error).message });
  }
};

export const deleteQuestion = async (req: Request, res: Response): Promise<void> => {
  try {
    const questionId = req.params.id;

    const deletedQuestion = await QUESTION.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      res.status(404).json({ message: "Question not found." });
      return;
    }

    res.status(200).json({ message: "Question deleted successfully." });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete question.", error: (error as Error).message });
  }
};

export const questions = async (req: Request, res: Response): Promise<void> => {
  try {

    const allQuestions = await QUESTION.find();

    if (!allQuestions.length) {
      res.status(404).json({ message: "No Questions" });
      return;
    }

    res.status(200).json({ message: "Question fetched successfully.",data:allQuestions });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete question.", error: (error as Error).message });
  }
};

export const getQuestion = async (req: Request, res: Response): Promise<void> => {
  try {

    const questionId = req.params.id;
    const question = await QUESTION.findOne({_id:questionId});

    if (!question) {
      res.status(404).json({ message: "No Question found" });
      return;
    }

    res.status(200).json({ message: "Question fetched successfully.",data:question });
  } catch (error) {
    res.status(500).json({ message: "Failed to delete question.", error: (error as Error).message });
  }
};