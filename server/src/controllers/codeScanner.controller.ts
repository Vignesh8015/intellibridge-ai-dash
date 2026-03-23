import { Request, Response } from 'express';
import { scanCode } from '../services/codeScanner.service';

const scanResults: Map<string, any> = new Map();

export const uploadAndScan = async (req: Request, res: Response) => {
  try {
    const file = req.file;
    if (!file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const content = file.buffer.toString('utf-8');
    const result = scanCode(file.originalname, content);
    result.projectId = req.body.projectId || 'default';
    scanResults.set(result.id, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Scan failed' });
  }
};

export const getScanResult = async (req: Request, res: Response) => {
  const result = scanResults.get(req.params.id);
  if (!result) return res.status(404).json({ error: 'Scan result not found' });
  res.json(result);
};
