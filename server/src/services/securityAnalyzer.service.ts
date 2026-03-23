import { SecurityScanResult, SecurityVulnerability, ComplianceCheck } from '../types';
import { v4 as uuidv4 } from 'uuid';

export const runSecurityScan = (projectId: string, code: string, language: string): SecurityScanResult => {
  const vulnerabilities: SecurityVulnerability[] = [];

  // SQL Injection check
  if (/(\+\s*['"]|concat\s*\(|string\.format)/i.test(code)) {
    vulnerabilities.push({
      id: uuidv4(), type: 'SQL Injection', severity: 'critical',
      description: 'Potential SQL injection via string concatenation',
      location: 'Query construction', recommendation: 'Use parameterized queries or ORM',
      owaspCategory: 'A03:2021 - Injection',
    });
  }

  // XSS check
  if (/(innerHTML|document\.write|eval\s*\()/i.test(code)) {
    vulnerabilities.push({
      id: uuidv4(), type: 'Cross-Site Scripting (XSS)', severity: 'high',
      description: 'Potential XSS via unsafe DOM manipulation',
      location: 'DOM manipulation', recommendation: 'Use textContent or sanitize input',
      owaspCategory: 'A03:2021 - Injection',
    });
  }

  // Hardcoded secrets
  if (/(password\s*=\s*['"]|api_key\s*=\s*['"]|secret\s*=\s*['"]).{3,}/i.test(code)) {
    vulnerabilities.push({
      id: uuidv4(), type: 'Hardcoded Credentials', severity: 'critical',
      description: 'Hardcoded credentials or API keys found',
      location: 'Source code', recommendation: 'Use environment variables or secret manager',
      owaspCategory: 'A07:2021 - Identification and Authentication Failures',
    });
  }

  // Insecure deserialization
  if (/(pickle\.loads|yaml\.load\(|ObjectInputStream)/i.test(code)) {
    vulnerabilities.push({
      id: uuidv4(), type: 'Insecure Deserialization', severity: 'high',
      description: 'Unsafe deserialization detected',
      location: 'Data processing', recommendation: 'Use safe deserialization methods with type validation',
      owaspCategory: 'A08:2021 - Software and Data Integrity Failures',
    });
  }

  // Missing auth
  if (language === 'COBOL' || !/auth|authentication|authorize/i.test(code)) {
    vulnerabilities.push({
      id: uuidv4(), type: 'Missing Authentication', severity: 'medium',
      description: 'No authentication mechanism detected',
      location: 'Application layer', recommendation: 'Implement JWT or OAuth2 authentication',
      owaspCategory: 'A07:2021 - Identification and Authentication Failures',
    });
  }

  // Score calculation (100 minus penalty per vuln)
  const penalties = { critical: 25, high: 15, medium: 8, low: 3 };
  const totalPenalty = vulnerabilities.reduce((sum, v) => sum + (penalties[v.severity] || 0), 0);
  const score = Math.max(0, 100 - totalPenalty);

  const compliance: ComplianceCheck[] = [
    { standard: 'PCI-DSS', status: score >= 80 ? 'pass' : score >= 50 ? 'partial' : 'fail', details: `Score: ${score}/100` },
    { standard: 'SOC2', status: score >= 70 ? 'pass' : score >= 40 ? 'partial' : 'fail', details: `${vulnerabilities.filter(v => v.severity === 'critical').length} critical issues` },
    { standard: 'HIPAA', status: score >= 85 ? 'pass' : score >= 60 ? 'partial' : 'fail', details: 'Requires additional review' },
  ];

  return {
    id: uuidv4(),
    projectId,
    score,
    vulnerabilities,
    compliance,
    scannedAt: new Date(),
  };
};
