import express from 'express';
import { runCode } from '../controllers/codeRunnerController';
import { protect } from '../middlewares/protectMiddleware';

const router = express.Router();

router.post('/run',protect,runCode);

export default router;
