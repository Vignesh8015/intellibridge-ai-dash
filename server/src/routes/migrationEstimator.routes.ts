import { Router } from 'express';
import { estimate, getEstimateByProject } from '../controllers/migrationEstimator.controller';

const router = Router();
router.post('/estimate', estimate);
router.get('/project/:projectId', getEstimateByProject);

export default router;
