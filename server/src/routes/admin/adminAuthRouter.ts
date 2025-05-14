import * as authController from '../../controllers/admin/adminAuthController';
import * as questionController from '../../controllers/admin/questionController';

import express from 'express';
import { protect } from '../../middlewares/admin/adminProtectMiddleware';
import { addQuestionSchema,updateQuestionSchema } from '../../validators/questionSchema';
import { validate } from '../../middlewares/validateSchemaMiddleware';

const router = express.Router();

router.post('/add-admin',authController.addAdmin);
router.post('/login',authController.adminLogin);
router.post('/logout',protect,authController.logout);

router.get('/me',protect,authController.getMe);

router.post('/question',protect,validate(addQuestionSchema),questionController.addQuestion); // Add question
router.patch('/question/:id',protect,validate(updateQuestionSchema),questionController.updateQuestion); // Update question
router.delete('/question/:id',protect,questionController.deleteQuestion); // Delete question
router.get('/question',protect,questionController.questions); // View all question

export default router;

