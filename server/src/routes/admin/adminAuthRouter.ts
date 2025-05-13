import * as authController from '../../controllers/admin/adminAuthController';
import * as questionController from '../../controllers/admin/questionController';

import express from 'express';
import { protect } from '../../middlewares/admin/adminProtectMiddleware';
import { questionSchema } from '../../validators/questionSchema';
import { validate } from '../../middlewares/validateSchemaMiddleware';

const router = express.Router();

router.post('/add-admin',authController.addAdmin);
router.post('/login',authController.adminLogin);
router.post('/logout',protect,authController.logout);

router.get('/me',protect,authController.getMe);

router.post('/question',protect,validate(questionSchema),questionController.addQuestion); // Add question

export default router;

