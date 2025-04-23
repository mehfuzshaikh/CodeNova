import * as authController from '../controllers/authController';
import { protect } from '../middlewares/protectMiddleware';
import express from 'express';

const router = express.Router();

router.post('/signup',authController.signUp);
router.post('/login',authController.logIn);

// testing
router.get('/',protect,async(req,res)=>{
    res.send('Route accessed')
})

export default router;
