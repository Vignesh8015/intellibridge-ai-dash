import { CodeScanResult, Issue } from '../types';
import { v4 as uuidv4 } from 'uuid';

const detectLanguage = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  const langMap: Record<string, string> = {
    cob: 'COBOL', cbl: 'COBOL', java: 'Java', py: 'Python',
    js: 'JavaScript', ts: 'TypeScript', cs: 'C#', cpp: 'C++',
    rb: 'Ruby', go: 'Go', rs: 'Rust', php: 'PHP',
  };
  return langMap[ext || ''] || 'Unknown';
};

const generateIssues = (language: string): Issue[] => {
  const issueTemplates: Record<string, Issue[]> = {
    COBOL: [
      { type: 'legacy_pattern', severity: 'high', message: 'GOTO statements detected - consider structured programming', suggestion: 'Replace with PERFORM statements' },
      { type: 'deprecated', severity: 'medium', message: 'DISPLAY statements used for logging', suggestion: 'Implement proper logging framework' },
      { type: 'complexity', severity: 'high', message: 'Deeply nested PERFORM loops', suggestion: 'Refactor into separate paragraphs' },
    ],
    Java: [
      { type: 'deprecated', severity: 'medium', message: 'Deprecated API usage detected (java.util.Date)', suggestion: 'Migrate to java.time API' },
      { type: 'security', severity: 'high', message: 'SQL string concatenation detected', suggestion: 'Use PreparedStatement for SQL queries' },
      { type: 'performance', severity: 'low', message: 'Synchronization on non-final field', suggestion: 'Use concurrent collections or AtomicReference' },
    ],
    Python: [
      { type: 'style', severity: 'low', message: 'PEP 8 violations detected', suggestion: 'Run black or autopep8 formatter' },
      { type: 'security', severity: 'high', message: 'eval() usage detected', suggestion: 'Use ast.literal_eval() or safer alternatives' },
      { type: 'deprecated', severity: 'medium', message: 'Python 2 syntax detected', suggestion: 'Migrate to Python 3 syntax' },
    ],
  };
  return issueTemplates[language] || [
    { type: 'info', severity: 'low', message: 'No specific issues detected for this language', suggestion: 'Manual review recommended' },
  ];
};

export const scanCode = (fileName: string, content: string): CodeScanResult => {
  const language = detectLanguage(fileName);
  const lines = content.split('\n');
  const linesOfCode = lines.filter(l => l.trim() && !l.trim().startsWith('//')).length;
  const complexity = Math.floor(Math.random() * 40) + 10;

  const importPatterns = [/import\s+(.+)/g, /require\s*\((.+)\)/g, /from\s+['"](.+)['"]/g, /COPY\s+(\S+)/g];
  const dependencies: string[] = [];
  for (const pattern of importPatterns) {
    let match;
    while ((match = pattern.exec(content)) !== null) {
      dependencies.push(match[1].replace(/['";\s]/g, ''));
    }
  }

  return {
    id: uuidv4(),
    projectId: '',
    fileName,
    language,
    linesOfCode,
    complexity,
    issues: generateIssues(language),
    dependencies: dependencies.length > 0 ? dependencies : ['No dependencies detected'],
    summary: `Analyzed ${fileName}: ${linesOfCode} lines of ${language} code with complexity score ${complexity}. Found ${generateIssues(language).length} potential issues.`,
  };
};
