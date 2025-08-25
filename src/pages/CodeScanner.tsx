import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import {
  FileText,
  Upload,
  Scan,
  GitBranch,
  AlertCircle,
  CheckCircle,
  Clock,
} from "lucide-react";

// Mock data
const mockScanResults = {
  totalFiles: 247,
  scannedFiles: 247,
  languages: ["COBOL", "Java", "Python", "JavaScript"],
  complexity: {
    high: 34,
    medium: 156,
    low: 57,
  },
  dependencies: [
    { name: "legacy-db-connector", version: "2.1.0", risk: "High" },
    { name: "cobol-parser", version: "1.5.3", risk: "Medium" },
    { name: "java-spring-core", version: "4.2.1", risk: "Low" },
    { name: "python-requests", version: "2.25.1", risk: "Low" },
  ],
  summary: {
    maintainability: 67,
    testability: 43,
    performance: 78,
    security: 52,
  },
};

const CodeScanner = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [scanComplete, setScanComplete] = useState(false);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(event.target.files || []);
    setUploadedFiles(files);
  };

  const handleScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanComplete(true);
    }, 3000);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Code Scanner AI</h1>
        <p className="text-muted-foreground">
          Analyze legacy codebases and get AI-powered insights and modernization recommendations.
        </p>
      </div>

      {/* Upload Section */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Upload className="mr-2 h-5 w-5" />
            Upload Legacy Code
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-2 border-dashed border-muted-foreground/25 rounded-lg p-8 text-center">
            <Input
              type="file"
              multiple
              accept=".cobol,.java,.py,.js,.ts"
              onChange={handleFileUpload}
              className="hidden"
              id="file-upload"
            />
            <label htmlFor="file-upload" className="cursor-pointer">
              <FileText className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-lg font-medium mb-2">Drop files here or click to upload</p>
              <p className="text-muted-foreground">
                Supports COBOL, Java, Python, JavaScript, and TypeScript files
              </p>
            </label>
          </div>

          {uploadedFiles.length > 0 && (
            <div className="space-y-2">
              <h4 className="font-medium">Uploaded Files ({uploadedFiles.length})</h4>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                {uploadedFiles.map((file, index) => (
                  <div key={index} className="flex items-center space-x-2 p-2 bg-secondary rounded">
                    <FileText className="h-4 w-4" />
                    <span className="text-sm truncate">{file.name}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <Button
            onClick={handleScan}
            disabled={uploadedFiles.length === 0 || isScanning}
            className="w-full"
          >
            {isScanning ? (
              <>
                <Clock className="mr-2 h-4 w-4 animate-spin" />
                Scanning in Progress...
              </>
            ) : (
              <>
                <Scan className="mr-2 h-4 w-4" />
                Start AI Analysis
              </>
            )}
          </Button>
        </CardContent>
      </Card>

      {/* Scanning Progress */}
      {isScanning && (
        <Card className="card-enterprise">
          <CardContent className="pt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Analyzing codebase...</span>
                <span className="text-sm text-muted-foreground">67%</span>
              </div>
              <Progress value={67} className="w-full" />
              <div className="text-sm text-muted-foreground">
                Processing dependencies and complexity analysis
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Results Section */}
      {scanComplete && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Scan Summary */}
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="flex items-center">
                <CheckCircle className="mr-2 h-5 w-5 text-success" />
                Scan Summary
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Files</p>
                  <p className="text-2xl font-bold">{mockScanResults.totalFiles}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Languages</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {mockScanResults.languages.map((lang) => (
                      <Badge key={lang} variant="secondary">
                        {lang}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-2">Code Complexity</p>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">High</span>
                    <Badge variant="destructive">{mockScanResults.complexity.high}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Medium</span>
                    <Badge variant="secondary">{mockScanResults.complexity.medium}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Low</span>
                    <Badge variant="outline">{mockScanResults.complexity.low}</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Quality Metrics */}
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle>Quality Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {Object.entries(mockScanResults.summary).map(([key, value]) => (
                <div key={key} className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-sm font-medium capitalize">{key}</span>
                    <span className="text-sm">{value}%</span>
                  </div>
                  <Progress value={value} />
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Dependencies */}
          <Card className="card-enterprise lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center">
                <GitBranch className="mr-2 h-5 w-5" />
                Dependencies Analysis
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-2">Dependency</th>
                      <th className="text-left py-2">Version</th>
                      <th className="text-left py-2">Risk Level</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockScanResults.dependencies.map((dep, index) => (
                      <tr key={index} className="border-b">
                        <td className="py-2 font-medium">{dep.name}</td>
                        <td className="py-2 text-muted-foreground">{dep.version}</td>
                        <td className="py-2">
                          <Badge
                            variant={
                              dep.risk === "High"
                                ? "destructive"
                                : dep.risk === "Medium"
                                ? "secondary"
                                : "outline"
                            }
                          >
                            {dep.risk}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* AI Recommendations */}
          <Card className="card-enterprise lg:col-span-2">
            <CardHeader>
              <CardTitle>AI Modernization Recommendations</CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value="Based on the analysis, your COBOL codebase shows good modularization but would benefit from modern API integration. Key recommendations:

1. Migrate core business logic modules to Java Spring Boot
2. Implement REST APIs for external integrations  
3. Modernize the database layer with JPA/Hibernate
4. Add comprehensive unit testing (current coverage: 12%)
5. Implement proper logging and monitoring
6. Consider containerization for deployment flexibility

Priority: Start with the customer management module as it has the highest business value and lowest complexity."
                readOnly
                className="min-h-[200px] resize-none"
              />
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default CodeScanner;