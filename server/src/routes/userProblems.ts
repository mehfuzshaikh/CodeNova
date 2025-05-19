import * as userQuestionController from '../controllers/userQuestionController';
import { protect } from '../middlewares/protectMiddleware';
import express from 'express';

const router = express.Router();
router.get('/problems', protect, userQuestionController.getUserQuestions); // Get all problems
router.get('/problems/:id', protect, userQuestionController.getUserQuestionById); // Get One problem

export default router;