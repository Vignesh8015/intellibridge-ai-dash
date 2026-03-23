export interface User {
  id: string;
  email: string;
  password: string;
  name: string;
  role: string;
  createdAt: Date;
}

export interface Project {
  id: string;
  name: string;
  description?: string;
  language: string;
  status: string;
  userId: string;
  createdAt: Date;
}

export interface CodeScanResult {
  id: string;
  projectId: string;
  fileName: string;
  language: string;
  linesOfCode: number;
  complexity: number;
  issues: Issue[];
  dependencies: string[];
  summary: string;
}

export interface Issue {
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  message: string;
  line?: number;
  suggestion?: string;
}

export interface ContainerConfig {
  dockerfile: string;
  dockerCompose: string;
  kubernetesManifest: string;
  bestPractices: string[];
}

export interface ApiEndpoint {
  method: string;
  path: string;
  description: string;
  requestBody?: object;
  responseBody?: object;
}

export interface MigrationEstimate {
  id: string;
  projectId: string;
  complexity: string;
  estimatedHours: number;
  estimatedCostINR: number;
  estimatedDowntimeHours: number;
  riskLevel: string;
  risks: string[];
  phases: MigrationPhase[];
}

export interface MigrationPhase {
  name: string;
  duration: string;
  cost: number;
  tasks: string[];
}

export interface SecurityVulnerability {
  id: string;
  type: string;
  severity: 'low' | 'medium' | 'high' | 'critical';
  description: string;
  location: string;
  recommendation: string;
  owaspCategory?: string;
}

export interface SecurityScanResult {
  id: string;
  projectId: string;
  score: number;
  vulnerabilities: SecurityVulnerability[];
  compliance: ComplianceCheck[];
  scannedAt: Date;
}

export interface ComplianceCheck {
  standard: string;
  status: 'pass' | 'fail' | 'partial';
  details: string;
}

export interface ReportData {
  id: string;
  projectId: string;
  type: string;
  title: string;
  data: any;
  createdAt: Date;
}
