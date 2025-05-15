import Joi from "joi";
import { Types } from "mongoose";

export const addQuestionSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).required(),
  description: Joi.string().trim().min(10).required(),
  difficulty: Joi.string().trim().valid("Easy", "Medium", "Hard").required(),
  topics: Joi.array().items(Joi.string().trim()).optional(),
  constraints: Joi.array().items(Joi.string().trim()).optional(),
  examples: Joi.array()
    .items(
      Joi.object({
        input: Joi.string().trim().required(),
        output: Joi.string().trim().required(),
        explanation: Joi.string().trim().required(),
      })
    )
    .min(1)
    .required(),
  testCases: Joi.array()
    .items(
      Joi.object({
        input: Joi.string().trim().required(),
        expectedOutput: Joi.string().trim().required(),
      })
    )
    .min(1)
    .required(),
  // createdBy: Joi.string()
  //   .custom((value, helpers) => {
  //     if (!Types.ObjectId.isValid(value)) {
  //       return helpers.error("any.invalid");
  //     }
  //     return value;
  //   })
  //   .messages({
  //     "any.invalid": "Invalid ObjectId",
  //   })
  //   .required(),
});

export const updateQuestionSchema = Joi.object({
  title: Joi.string().trim().min(3).max(100).optional(),
  description: Joi.string().trim().min(10).optional(),
  difficulty: Joi.string().trim().valid("Easy", "Medium", "Hard").optional(),
  topics: Joi.array().items(Joi.string().trim()).optional(),
  constraints: Joi.array().items(Joi.string().trim()).optional(),
  examples: Joi.array()
    .items(
      Joi.object({
        input: Joi.string().trim().required(),
        output: Joi.string().trim().required(),
        explanation: Joi.string().trim().optional(),
      })
    )
    .optional(),
  testCases: Joi.array()
    .items(
      Joi.object({
        input: Joi.string().trim().required(),
        expectedOutput: Joi.string().trim().required(),
      })
    )
    .optional(),
});
