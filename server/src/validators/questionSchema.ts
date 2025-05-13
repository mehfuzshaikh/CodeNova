import Joi from "joi";
import { Types } from "mongoose";

export const questionSchema = Joi.object({
  title: Joi.string().min(3).max(100).required(),
  description: Joi.string().min(10).required(),
  difficulty: Joi.string().valid("Easy", "Medium", "Hard").required(),
  topics: Joi.array().items(Joi.string()).optional(),
  constraints: Joi.array().items(Joi.string()).optional(),
  examples: Joi.array()
    .items(
      Joi.object({
        input: Joi.string().required(),
        output: Joi.string().required(),
        explanation: Joi.string().optional(),
      })
    )
    .optional(),
  testCases: Joi.array()
    .items(
      Joi.object({
        input: Joi.string().required(),
        expectedOutput: Joi.string().required(),
      })
    )
    .optional(),
  createdBy: Joi.string()
    .custom((value, helpers) => {
      if (!Types.ObjectId.isValid(value)) {
        return helpers.error("any.invalid");
      }
      return value;
    })
    .messages({
      "any.invalid": "Invalid ObjectId",
    })
    .required(),
});
