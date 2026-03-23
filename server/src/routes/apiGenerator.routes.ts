import { Router } from 'express';
import { generate } from '../controllers/apiGenerator.controller';

const router = Router();
router.post('/generate', generate);

export default router;
