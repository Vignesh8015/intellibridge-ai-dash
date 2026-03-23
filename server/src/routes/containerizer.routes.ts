import { Router } from 'express';
import { generate } from '../controllers/containerizer.controller';

const router = Router();
router.post('/generate', generate);

export default router;
