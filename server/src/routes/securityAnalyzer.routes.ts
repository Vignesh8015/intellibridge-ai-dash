import { Router } from 'express';
import { scan } from '../controllers/securityAnalyzer.controller';

const router = Router();
router.post('/scan', scan);

export default router;
