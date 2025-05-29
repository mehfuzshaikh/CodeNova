import express from 'express';
import { runCode,submitCode } from '../controllers/codeRunnerController';
import { protect } from '../middlewares/protectMiddleware';

const router = express.Router();

router.post('/run',protect,runCode);
router.post('/submit',protect,submitCode);

export default router;
