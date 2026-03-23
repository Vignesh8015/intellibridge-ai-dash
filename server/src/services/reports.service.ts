import { ReportData } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const generateReport = (projectId: string, type: string, data: any): ReportData => {
  const reportTypes: Record<string, string> = {
    code_analysis: 'Code Analysis Report',
    migration: 'Migration Report',
    security_audit: 'Security Audit Report',
    technical_debt: 'Technical Debt Report',
    comprehensive: 'Comprehensive Report',
  };

  return {
    id: uuidv4(),
    projectId,
    type,
    title: reportTypes[type] || 'General Report',
    data: {
      ...data,
      generatedAt: new Date().toISOString(),
      format: 'JSON',
    },
    createdAt: new Date(),
  };
};
