import Joi from "joi";
import dayjs from "dayjs";

export const userProfileSchema = Joi.object({
  name: Joi.string().trim().min(1).message("Name cannot be empty or spaces only"),
  gender: Joi.string().valid("Male", "Female", "Other"),
  location: Joi.string().trim().min(1).message("Location cannot be empty or spaces only"),
  birthday: Joi.date().max(dayjs().format("YYYY-MM-DD")).message("Birthday cannot be in the future"),
  summary: Joi.string().trim().min(1).message("Summary cannot be empty or spaces only"),
  website: Joi.string().trim(),
  github: Joi.string().trim(),
  linkedin: Joi.string().trim(),
}).min(1); 
