import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Lock,
  Unlock,
  Search,
} from "lucide-react";

// Mock vulnerability data
const securityOverview = {
  totalVulnerabilities: 23,
  critical: 3,
  high: 7,
  medium: 9,
  low: 4,
  securityScore: 62,
  lastScan: "2024-01-15T10:30:00Z",
};

const vulnerabilities = [
  {
    id: "CVE-2023-4567",
    title: "SQL Injection in User Authentication",
    severity: "Critical",
    cvssScore: 9.1,
    category: "Injection",
    component: "UserController.java",
    description: "Potential SQL injection vulnerability in login function allowing unauthorized access to user data.",
    remediation: "Use parameterized queries and input validation",
    status: "Open",
  },
  {
    id: "CVE-2023-4568",
    title: "Cross-Site Scripting (XSS) in Comments",
    severity: "High",
    cvssScore: 7.5,
    category: "XSS",
    component: "CommentService.js",
    description: "Reflected XSS vulnerability allowing execution of malicious scripts in user browsers.",
    remediation: "Implement proper input sanitization and output encoding",
    status: "Open",
  },
  {
    id: "SEC-2024-001",
    title: "Weak Password Policy",
    severity: "High",
    cvssScore: 6.8,
    category: "Authentication",
    component: "PasswordValidator.java",
    description: "Password policy allows weak passwords that can be easily compromised.",
    remediation: "Implement stronger password requirements and complexity rules",
    status: "In Review",
  },
  {
    id: "SEC-2024-002",
    title: "Insecure Direct Object Reference",
    severity: "Medium",
    cvssScore: 5.4,
    category: "Authorization",
    component: "DocumentController.java",
    description: "Users can access documents by manipulating URL parameters without proper authorization.",
    remediation: "Implement proper access control and user authorization checks",
    status: "Fixed",
  },
  {
    id: "SEC-2024-003",
    title: "Information Disclosure in Error Messages",
    severity: "Medium",
    cvssScore: 4.3,
    category: "Information Disclosure",
    component: "ErrorHandler.java",
    description: "Detailed error messages expose sensitive system information to potential attackers.",
    remediation: "Implement generic error messages and proper error logging",
    status: "Open",
  },
];

const complianceChecks = [
  { name: "OWASP Top 10", status: "Partial", score: 70 },
  { name: "NIST Cybersecurity Framework", status: "Compliant", score: 85 },
  { name: "ISO 27001", status: "Non-Compliant", score: 45 },
  { name: "PCI DSS", status: "Partial", score: 60 },
  { name: "GDPR", status: "Compliant", score: 90 },
];

const securityRecommendations = [
  {
    priority: "Critical",
    title: "Implement Input Validation",
    description: "Add comprehensive input validation across all user-facing endpoints to prevent injection attacks.",
    effort: "High",
  },
  {
    priority: "High",
    title: "Enable Multi-Factor Authentication",
    description: "Implement MFA for all user accounts, especially administrative users.",
    effort: "Medium",
  },
  {
    priority: "High",
    title: "Update Dependencies",
    description: "Update all third-party libraries to their latest secure versions.",
    effort: "Low",
  },
  {
    priority: "Medium",
    title: "Implement Rate Limiting",
    description: "Add rate limiting to prevent brute force attacks and API abuse.",
    effort: "Medium",
  },
];

const SecurityAnalyzer = () => {
  const [selectedVulnerability, setSelectedVulnerability] = useState<string | null>(null);

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "critical":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      case "high":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "low":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "fixed":
        return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "in review":
        return <Eye className="h-4 w-4 text-yellow-600" />;
      case "open":
        return <XCircle className="h-4 w-4 text-red-600" />;
      default:
        return <AlertTriangle className="h-4 w-4 text-gray-600" />;
    }
  };

  const getComplianceStatus = (status: string, score: number) => {
    if (status === "Compliant") return "text-green-600";
    if (status === "Partial") return "text-yellow-600";
    return "text-red-600";
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Security Analyzer</h1>
        <p className="text-muted-foreground">
          Comprehensive security analysis with vulnerability detection, compliance checking,
          and remediation recommendations.
        </p>
      </div>

      {/* Security Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{securityOverview.securityScore}/100</div>
            <Progress value={securityOverview.securityScore} className="mt-2" />
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical</CardTitle>
            <AlertTriangle className="h-4 w-4 text-red-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">{securityOverview.critical}</div>
            <p className="text-xs text-muted-foreground">Immediate action required</p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">High</CardTitle>
            <AlertTriangle className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">{securityOverview.high}</div>
            <p className="text-xs text-muted-foreground">Priority fixes needed</p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Medium</CardTitle>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{securityOverview.medium}</div>
            <p className="text-xs text-muted-foreground">Schedule for fixing</p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Low</CardTitle>
            <AlertTriangle className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{securityOverview.low}</div>
            <p className="text-xs text-muted-foreground">Monitor and track</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="vulnerabilities" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="vulnerabilities">Vulnerabilities</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
        </TabsList>

        <TabsContent value="vulnerabilities" className="space-y-4">
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Search className="mr-2 h-5 w-5" />
                Detected Vulnerabilities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {vulnerabilities.map((vuln) => (
                  <div
                    key={vuln.id}
                    className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                      selectedVulnerability === vuln.id
                        ? "border-primary bg-primary/5"
                        : "border-border hover:border-primary/50"
                    }`}
                    onClick={() => setSelectedVulnerability(vuln.id)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-2 flex-1">
                        <div className="flex items-center space-x-3">
                          {getStatusIcon(vuln.status)}
                          <h3 className="font-semibold">{vuln.title}</h3>
                          <Badge className={getSeverityColor(vuln.severity)}>
                            {vuln.severity}
                          </Badge>
                          <Badge variant="outline">CVSS: {vuln.cvssScore}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{vuln.description}</p>
                        <div className="flex items-center space-x-4 text-sm">
                          <span className="text-muted-foreground">
                            Component: <code className="bg-secondary px-1 rounded">{vuln.component}</code>
                          </span>
                          <span className="text-muted-foreground">Category: {vuln.category}</span>
                          <Badge
                            variant={vuln.status === "Fixed" ? "default" : "secondary"}
                          >
                            {vuln.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    {selectedVulnerability === vuln.id && (
                      <div className="mt-4 p-4 bg-secondary/50 rounded">
                        <h4 className="font-medium mb-2">Remediation</h4>
                        <p className="text-sm text-muted-foreground">{vuln.remediation}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Lock className="mr-2 h-5 w-5" />
                Compliance Status
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {complianceChecks.map((check, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className={`p-2 rounded-full ${
                        check.status === "Compliant" ? "bg-green-100 dark:bg-green-900" :
                        check.status === "Partial" ? "bg-yellow-100 dark:bg-yellow-900" :
                        "bg-red-100 dark:bg-red-900"
                      }`}>
                        {check.status === "Compliant" ? (
                          <Lock className="h-4 w-4 text-green-600" />
                        ) : (
                          <Unlock className="h-4 w-4 text-red-600" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-medium">{check.name}</h3>
                        <p className={`text-sm ${getComplianceStatus(check.status, check.score)}`}>
                          {check.status} - {check.score}% coverage
                        </p>
                      </div>
                    </div>
                    <div className="w-24">
                      <Progress value={check.score} />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="recommendations" className="space-y-4">
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5" />
                Security Recommendations
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {securityRecommendations.map((rec, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-start justify-between">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-3">
                          <Badge className={getSeverityColor(rec.priority)}>
                            {rec.priority} Priority
                          </Badge>
                          <h3 className="font-semibold">{rec.title}</h3>
                        </div>
                        <p className="text-sm text-muted-foreground">{rec.description}</p>
                        <div className="flex items-center space-x-2">
                          <span className="text-xs text-muted-foreground">Implementation Effort:</span>
                          <Badge variant="outline">{rec.effort}</Badge>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        View Details
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SecurityAnalyzer;