import { Router } from 'express';
import multer from 'multer';
import { uploadAndScan, getScanResult } from '../controllers/codeScanner.controller';

const router = Router();
const upload = multer({ storage: multer.memoryStorage(), limits: { fileSize: 10 * 1024 * 1024 } });

router.post('/upload', upload.single('file'), uploadAndScan);
router.get('/:id', getScanResult);

export default router;
