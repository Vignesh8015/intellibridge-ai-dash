import { Request, Response } from 'express';
import { estimateMigration } from '../services/migrationEstimator.service';

const estimates: Map<string, any> = new Map();

export const estimate = async (req: Request, res: Response) => {
  try {
    const { projectId, sourceLanguage, targetLanguage, linesOfCode, complexity } = req.body;
    const result = estimateMigration(
      projectId || 'default',
      sourceLanguage || 'COBOL',
      targetLanguage || 'Java',
      linesOfCode || 5000,
      complexity || 25
    );
    estimates.set(result.projectId, result);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: 'Estimation failed' });
  }
};

export const getEstimateByProject = async (req: Request, res: Response) => {
  const result = estimates.get(req.params.projectId);
  if (!result) return res.status(404).json({ error: 'No estimate found for this project' });
  res.json(result);
};
