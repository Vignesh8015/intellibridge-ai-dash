import { Request, Response } from 'express';
import { generateContainerConfig } from '../services/containerizer.service';

export const generate = async (req: Request, res: Response) => {
  try {
    const { language, appName } = req.body;
    if (!language || !appName) {
      return res.status(400).json({ error: 'language and appName are required' });
    }
    const config = generateContainerConfig(language, appName);
    res.json(config);
  } catch (error) {
    res.status(500).json({ error: 'Container generation failed' });
  }
};
