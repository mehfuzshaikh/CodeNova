import * as authController from '../controllers/authController';
import { protect } from '../middlewares/protectMiddleware';
import express from 'express';

const router = express.Router();

router.post('/sendotp',authController.senOTP);
router.post('/signup',authController.verifyOtpAndSignUp);
router.post('/login',authController.logIn);
router.post('/resendotp',authController.resendOTP);

// testing
router.get('/',protect,async(req,res)=>{
    res.send('Route accessed')
})

export default router;
