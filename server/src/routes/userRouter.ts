import * as userController from '../controllers/userController';
import express from 'express';

const router = express.Router();

router.post('/signup',userController.signUp);

export default router;
