import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  FileText,
  Download,
  Calendar,
  TrendingUp,
  Activity,
  Shield,
  Clock,
} from "lucide-react";

// Mock report data
const projectSummary = {
  totalProjects: 12,
  completedMigrations: 8,
  inProgress: 3,
  planned: 1,
  totalCostSaved: 2400000,
  averageDowntime: 18,
};

const migrationProgress = [
  { project: "Banking Core", progress: 100, status: "Complete" },
  { project: "Payment Gateway", progress: 85, status: "In Progress" },
  { project: "Customer Portal", progress: 67, status: "In Progress" },
  { project: "Reporting System", progress: 45, status: "In Progress" },
  { project: "Admin Dashboard", progress: 0, status: "Planned" },
];

const costAnalysis = [
  { month: "Jan", legacy: 180, modernized: 120, savings: 60 },
  { month: "Feb", legacy: 175, modernized: 130, savings: 45 },
  { month: "Mar", legacy: 170, modernized: 125, savings: 45 },
  { month: "Apr", legacy: 165, modernized: 115, savings: 50 },
  { month: "May", legacy: 160, modernized: 110, savings: 50 },
  { month: "Jun", legacy: 155, modernized: 105, savings: 50 },
];

const technologyDistribution = [
  { name: "Spring Boot", value: 35, color: "#22c55e" },
  { name: "Node.js", value: 25, color: "#3b82f6" },
  { name: "React", value: 20, color: "#f59e0b" },
  { name: "Legacy Systems", value: 20, color: "#ef4444" },
];

const securityImprovements = [
  { metric: "Vulnerabilities Resolved", before: 45, after: 8 },
  { metric: "Security Score", before: 45, after: 87 },
  { metric: "Compliance Rating", before: 60, after: 95 },
  { metric: "Incident Response Time", before: 240, after: 15 },
];

const recentReports = [
  {
    title: "Q1 2024 Migration Summary",
    type: "Quarterly Report",
    date: "2024-03-31",
    status: "Published",
  },
  {
    title: "Security Assessment - Banking Core",
    type: "Security Report",
    date: "2024-03-15",
    status: "Published",
  },
  {
    title: "Cost Analysis - Payment Gateway",
    type: "Financial Report",
    date: "2024-03-10",
    status: "Draft",
  },
  {
    title: "Technical Debt Assessment",
    type: "Technical Report",
    date: "2024-03-05",
    status: "Published",
  },
];

const Reports = () => {
  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "complete":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "in progress":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200";
      case "planned":
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
      case "published":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "draft":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Reports & Analytics</h1>
          <p className="text-muted-foreground">
            Comprehensive reporting and analytics for your modernization projects
          </p>
        </div>
        <Button className="flex items-center">
          <Download className="mr-2 h-4 w-4" />
          Export All Reports
        </Button>
      </div>

      {/* Executive Summary */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Projects</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectSummary.totalProjects}</div>
            <p className="text-xs text-muted-foreground">
              {projectSummary.completedMigrations} completed
            </p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cost Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(projectSummary.totalCostSaved / 1000000).toFixed(1)}M
            </div>
            <p className="text-xs text-success">+23% from last quarter</p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Downtime</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{projectSummary.averageDowntime}h</div>
            <p className="text-xs text-success">-40% improvement</p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Security Score</CardTitle>
            <Shield className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">87%</div>
            <p className="text-xs text-success">+42% improvement</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Migration Progress */}
            <Card className="card-enterprise">
              <CardHeader>
                <CardTitle>Migration Progress</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {migrationProgress.map((project, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">{project.project}</span>
                        <Badge className={getStatusColor(project.status)}>
                          {project.status}
                        </Badge>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="flex-1 bg-secondary rounded-full h-2">
                          <div
                            className="bg-primary h-2 rounded-full transition-all"
                            style={{ width: `${project.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground min-w-[3rem]">
                          {project.progress}%
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Technology Distribution */}
            <Card className="card-enterprise">
              <CardHeader>
                <CardTitle>Technology Stack Distribution</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={technologyDistribution}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {technologyDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="financial" className="space-y-6">
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle>Cost Analysis Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={costAnalysis}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip
                    formatter={(value, name) => [
                      `$${value}k`,
                      name === "legacy" ? "Legacy Costs" :
                      name === "modernized" ? "Modernized Costs" : "Savings"
                    ]}
                  />
                  <Line
                    type="monotone"
                    dataKey="legacy"
                    stroke="#ef4444"
                    strokeWidth={3}
                    name="legacy"
                  />
                  <Line
                    type="monotone"
                    dataKey="modernized"
                    stroke="#3b82f6"
                    strokeWidth={3}
                    name="modernized"
                  />
                  <Line
                    type="monotone"
                    dataKey="savings"
                    stroke="#22c55e"
                    strokeWidth={3}
                    name="savings"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle>Security Improvements</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {securityImprovements.map((improvement, index) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{improvement.metric}</span>
                      <div className="flex items-center space-x-4">
                        <span className="text-sm text-muted-foreground">
                          Before: {improvement.before}
                          {improvement.metric.includes("Time") ? " min" : 
                           improvement.metric.includes("Score") || improvement.metric.includes("Rating") ? "%" : ""}
                        </span>
                        <span className="text-sm font-medium text-success">
                          After: {improvement.after}
                          {improvement.metric.includes("Time") ? " min" : 
                           improvement.metric.includes("Score") || improvement.metric.includes("Rating") ? "%" : ""}
                        </span>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="bg-red-100 dark:bg-red-900/30 rounded h-2">
                        <div
                          className="bg-red-500 h-2 rounded transition-all"
                          style={{
                            width: `${
                              improvement.metric.includes("Time")
                                ? (improvement.before / 300) * 100
                                : improvement.before
                            }%`,
                          }}
                        />
                      </div>
                      <div className="bg-green-100 dark:bg-green-900/30 rounded h-2">
                        <div
                          className="bg-green-500 h-2 rounded transition-all"
                          style={{
                            width: `${
                              improvement.metric.includes("Time")
                                ? (improvement.after / 300) * 100
                                : improvement.after
                            }%`,
                          }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="documents" className="space-y-6">
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="flex items-center">
                <FileText className="mr-2 h-5 w-5" />
                Recent Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="space-y-1">
                      <h3 className="font-medium">{report.title}</h3>
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <span>{report.type}</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="h-3 w-3" />
                          <span>{new Date(report.date).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Badge className={getStatusColor(report.status)}>
                        {report.status}
                      </Badge>
                      <Button variant="outline" size="sm">
                        <Download className="mr-2 h-3 w-3" />
                        Download
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

export default Reports;