import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
} from "recharts";
import {
  Calculator,
  DollarSign,
  Clock,
  AlertTriangle,
  TrendingUp,
  Download,
} from "lucide-react";

// Mock migration data
const migrationEstimate = {
  totalCost: 485000,
  totalEffort: 18,
  estimatedDowntime: 72,
  overallRisk: "Medium",
  confidence: 87,
};

const componentEstimates = [
  {
    component: "User Management",
    effort: 3,
    cost: 75000,
    downtime: 8,
    risk: "Low",
    complexity: "Simple",
  },
  {
    component: "Payment Processing",
    effort: 6,
    cost: 150000,
    downtime: 24,
    risk: "High",
    complexity: "Complex",
  },
  {
    component: "Reporting System",
    effort: 4,
    cost: 100000,
    downtime: 12,
    risk: "Medium",
    complexity: "Moderate",
  },
  {
    component: "COBOL Batch Jobs",
    effort: 5,
    cost: 160000,
    downtime: 28,
    risk: "High",
    complexity: "Complex",
  },
];

const effortData = componentEstimates.map((item) => ({
  name: item.component,
  effort: item.effort,
  cost: item.cost / 1000, // Convert to thousands
}));

const riskDistribution = [
  { name: "Low Risk", value: 1, color: "#22c55e" },
  { name: "Medium Risk", value: 1, color: "#f59e0b" },
  { name: "High Risk", value: 2, color: "#ef4444" },
];

const timelineData = [
  { month: "Month 1", progress: 15, cost: 50 },
  { month: "Month 2", progress: 30, cost: 120 },
  { month: "Month 3", progress: 50, cost: 200 },
  { month: "Month 4", progress: 70, cost: 320 },
  { month: "Month 5", progress: 85, cost: 410 },
  { month: "Month 6", progress: 100, cost: 485 },
];

const MigrationEstimator = () => {
  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200";
      case "high":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200";
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Migration Estimator</h1>
        <p className="text-muted-foreground">
          AI-powered cost, effort, and risk analysis for your legacy system modernization project.
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Cost</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${migrationEstimate.totalCost.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">±15%</span> confidence interval
            </p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Effort (Months)</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationEstimate.totalEffort}</div>
            <p className="text-xs text-muted-foreground">
              Estimated project duration
            </p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Downtime (Hours)</CardTitle>
            <AlertTriangle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationEstimate.estimatedDowntime}</div>
            <p className="text-xs text-muted-foreground">
              Planned maintenance windows
            </p>
          </CardContent>
        </Card>

        <Card className="card-enterprise">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Risk Level</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{migrationEstimate.overallRisk}</div>
            <div className="flex items-center space-x-2 mt-1">
              <Progress value={migrationEstimate.confidence} className="flex-1" />
              <span className="text-xs text-muted-foreground">
                {migrationEstimate.confidence}%
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Component Breakdown */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Calculator className="mr-2 h-5 w-5" />
            Component-wise Breakdown
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-3 font-medium">Component</th>
                  <th className="text-left py-3 font-medium">Effort (Months)</th>
                  <th className="text-left py-3 font-medium">Cost ($)</th>
                  <th className="text-left py-3 font-medium">Downtime (Hours)</th>
                  <th className="text-left py-3 font-medium">Risk Level</th>
                  <th className="text-left py-3 font-medium">Complexity</th>
                </tr>
              </thead>
              <tbody>
                {componentEstimates.map((component, index) => (
                  <tr key={index} className="border-b">
                    <td className="py-3 font-medium">{component.component}</td>
                    <td className="py-3">{component.effort}</td>
                    <td className="py-3">${component.cost.toLocaleString()}</td>
                    <td className="py-3">{component.downtime}</td>
                    <td className="py-3">
                      <Badge className={getRiskColor(component.risk)}>
                        {component.risk}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <Badge variant="outline">{component.complexity}</Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Effort vs Cost Chart */}
        <Card className="card-enterprise">
          <CardHeader>
            <CardTitle>Effort vs Cost Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={effortData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="name"
                  tick={{ fontSize: 12 }}
                  angle={-45}
                  textAnchor="end"
                  height={80}
                />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => [
                    name === "effort" ? `${value} months` : `$${value}k`,
                    name === "effort" ? "Effort" : "Cost",
                  ]}
                />
                <Bar
                  yAxisId="left"
                  dataKey="effort"
                  fill="hsl(var(--primary))"
                  name="effort"
                />
                <Bar
                  yAxisId="right"
                  dataKey="cost"
                  fill="hsl(var(--accent))"
                  name="cost"
                />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Risk Distribution */}
        <Card className="card-enterprise">
          <CardHeader>
            <CardTitle>Risk Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={riskDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {riskDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Project Timeline */}
        <Card className="card-enterprise lg:col-span-2">
          <CardHeader>
            <CardTitle>Project Timeline & Cost Progression</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={timelineData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip
                  formatter={(value, name) => [
                    name === "progress" ? `${value}%` : `$${value}k`,
                    name === "progress" ? "Progress" : "Cumulative Cost",
                  ]}
                />
                <Line
                  yAxisId="left"
                  type="monotone"
                  dataKey="progress"
                  stroke="hsl(var(--primary))"
                  strokeWidth={3}
                  name="progress"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="cost"
                  stroke="hsl(var(--accent))"
                  strokeWidth={3}
                  name="cost"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Export Options */}
        <Card className="card-enterprise lg:col-span-2">
          <CardHeader>
            <CardTitle>Export & Share</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Download PDF Report
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Export to Excel
              </Button>
              <Button variant="outline" className="flex items-center">
                <Download className="mr-2 h-4 w-4" />
                Generate Presentation
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mt-4">
              Export detailed analysis reports to share with stakeholders and project teams.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default MigrationEstimator;