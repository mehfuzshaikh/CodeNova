import * as authController from '../controllers/authController';
import * as userController from '../controllers/userController';
import uploadImage from '../middlewares/imageUpload';
import { protect } from '../middlewares/protectMiddleware';
import { validate } from '../middlewares/validateSchemaMiddleware';
import { userProfileSchema } from '../validators/userProfileSchema';
import express from 'express';

const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/verify-otp',authController.verifyOtp);
router.post('/login',authController.logIn);
router.post('/resend-otp',authController.resendOTP);
router.post('/forgot-password',authController.forgotPassword);
router.post('/reset-password/:token',authController.resetPassword);
router.post('/update-password',protect,authController.updatePassword);
router.post('/logout',authController.logout);


router.get('/me',protect,userController.getMe);
router.patch('/update-profile',
    protect,
    validate(userProfileSchema),
    uploadImage,
    userController.updateProfile
);
router.delete('/delete-user',protect,userController.deleteUser);

export default router;
