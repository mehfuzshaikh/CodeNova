import * as authController from '../controllers/authController';
import { protect } from '../middlewares/protectMiddleware';
import express from 'express';

const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/verify-otp',authController.verifyOtp);
router.post('/login',authController.logIn);
router.post('/resend-otp',authController.resendOTP);
router.post('/forgot-password',authController.forgotPassword);
router.post('/reset-password/:token',authController.resetPassword);
router.post('/update-password/',protect,authController.updatePassword);

// testing
router.get('/',protect,async(req,res)=>{
    res.send('Route accessed')
})

export default router;
