import * as authController from '../../controllers/admin/adminAuthController';
import express from 'express';
import { protect } from '../../middlewares/admin/adminProtectMiddleware';

const router = express.Router();

router.post('/add-admin',authController.addAdmin);
router.post('/login',authController.adminLogin);
router.post('/logout',protect,authController.logout);

router.get('/me',protect,authController.getMe);

export default router;

