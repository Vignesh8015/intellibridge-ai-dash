import { MigrationEstimate, MigrationPhase } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const estimateMigration = (
  projectId: string,
  sourceLanguage: string,
  targetLanguage: string,
  linesOfCode: number,
  complexity: number
): MigrationEstimate => {
  // Complexity multipliers
  const complexityMultiplier = complexity > 30 ? 2.5 : complexity > 20 ? 1.8 : complexity > 10 ? 1.3 : 1.0;
  
  // Base hours per 1000 LOC
  const baseHoursPer1kLoc = 40;
  const estimatedHours = Math.ceil((linesOfCode / 1000) * baseHoursPer1kLoc * complexityMultiplier);
  
  // Cost in INR (₹2500/hour average rate)
  const hourlyRateINR = 2500;
  const estimatedCostINR = estimatedHours * hourlyRateINR;
  
  // Downtime estimation
  const estimatedDowntimeHours = Math.ceil(estimatedHours * 0.05);
  
  // Risk level
  const riskLevel = complexity > 30 ? 'Critical' : complexity > 20 ? 'High' : complexity > 10 ? 'Medium' : 'Low';

  const phases: MigrationPhase[] = [
    {
      name: 'Assessment & Planning',
      duration: `${Math.ceil(estimatedHours * 0.15)} hours`,
      cost: Math.ceil(estimatedCostINR * 0.15),
      tasks: ['Code audit', 'Dependency analysis', 'Architecture design', 'Risk assessment'],
    },
    {
      name: 'Development & Refactoring',
      duration: `${Math.ceil(estimatedHours * 0.45)} hours`,
      cost: Math.ceil(estimatedCostINR * 0.45),
      tasks: ['Code migration', 'API modernization', 'Database migration', 'UI updates'],
    },
    {
      name: 'Testing & QA',
      duration: `${Math.ceil(estimatedHours * 0.25)} hours`,
      cost: Math.ceil(estimatedCostINR * 0.25),
      tasks: ['Unit testing', 'Integration testing', 'Performance testing', 'Security testing'],
    },
    {
      name: 'Deployment & Cutover',
      duration: `${Math.ceil(estimatedHours * 0.15)} hours`,
      cost: Math.ceil(estimatedCostINR * 0.15),
      tasks: ['Staging deployment', 'Data migration', 'DNS cutover', 'Monitoring setup'],
    },
  ];

  const risks = [
    `${sourceLanguage} to ${targetLanguage} migration may have incompatible patterns`,
    'Data integrity risks during migration',
    complexity > 20 ? 'High complexity increases refactoring effort' : 'Moderate complexity - manageable risk',
    'Third-party dependency compatibility needs validation',
    'Performance benchmarking required post-migration',
  ];

  return {
    id: uuidv4(),
    projectId,
    complexity: riskLevel,
    estimatedHours,
    estimatedCostINR,
    estimatedDowntimeHours,
    riskLevel,
    risks,
    phases,
  };
};
