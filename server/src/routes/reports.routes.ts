import { Router } from 'express';
import { generate, getByProject } from '../controllers/reports.controller';

const router = Router();
router.post('/generate', generate);
router.get('/project/:projectId', getByProject);

export default router;
