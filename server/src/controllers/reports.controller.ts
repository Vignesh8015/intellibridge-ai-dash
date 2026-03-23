import { Request, Response } from 'express';
import { generateReport } from '../services/reports.service';

const reports: Map<string, any[]> = new Map();

export const generate = async (req: Request, res: Response) => {
  try {
    const { projectId, type, data } = req.body;
    const report = generateReport(projectId || 'default', type || 'comprehensive', data || {});
    const existing = reports.get(report.projectId) || [];
    existing.push(report);
    reports.set(report.projectId, existing);
    res.json(report);
  } catch (error) {
    res.status(500).json({ error: 'Report generation failed' });
  }
};

export const getByProject = async (req: Request, res: Response) => {
  const projectReports = reports.get(req.params.projectId) || [];
  res.json(projectReports);
};
