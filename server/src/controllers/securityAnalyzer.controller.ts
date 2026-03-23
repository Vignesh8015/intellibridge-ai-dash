import { Request, Response } from 'express';
import { runSecurityScan } from '../services/securityAnalyzer.service';

export const scan = async (req: Request, res: Response) => {
  try {
    const { projectId, code, language } = req.body;
    if (!code) {
      return res.status(400).json({ error: 'code is required' });
    }
    const result = runSecurityScan(projectId || 'default', code, language || 'Unknown');
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Security scan failed' });
  }
};
