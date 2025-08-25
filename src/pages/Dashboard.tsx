import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import {
  Activity,
  TrendingUp,
  Users,
  Zap,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
} from "lucide-react";

const stats = [
  {
    title: "Projects Analyzed",
    value: "24",
    change: "+12%",
    trend: "up",
    icon: Activity,
  },
  {
    title: "Code Files Scanned",
    value: "1,247",
    change: "+8%",
    trend: "up",
    icon: TrendingUp,
  },
  {
    title: "APIs Generated",
    value: "89",
    change: "+23%",
    trend: "up",
    icon: Zap,
  },
  {
    title: "Migration Success",
    value: "94%",
    change: "+2%",
    trend: "up",
    icon: CheckCircle,
  },
];

const recentProjects = [
  {
    name: "Legacy Banking System",
    status: "Complete",
    progress: 100,
    type: "COBOL to Java",
  },
  {
    name: "Insurance Platform",
    status: "In Progress",
    progress: 67,
    type: "Mainframe to Cloud",
  },
  {
    name: "Retail Management",
    status: "Analyzing",
    progress: 34,
    type: "Legacy Java to Spring",
  },
];

const Dashboard = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="gradient-hero rounded-lg p-8 text-white">
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold mb-4">
            Welcome to IntelliBridge AI
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Transform your legacy systems with AI-powered modernization. Analyze,
            containerize, and migrate with confidence.
          </p>
          <div className="flex gap-4">
            <Button className="bg-white/10 text-white border border-white/20 hover:bg-white/20">
              Start New Analysis
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <Button variant="outline" className="bg-white/10 text-white border-white/30 hover:bg-white/20">
              View Reports
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat) => (
          <Card key={stat.title} className="card-enterprise">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-success">{stat.change}</span> from last month
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Projects */}
        <Card className="card-enterprise">
          <CardHeader>
            <CardTitle>Recent Projects</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentProjects.map((project) => (
                <div
                  key={project.name}
                  className="flex items-center justify-between p-4 rounded-lg bg-secondary/50"
                >
                  <div className="space-y-1">
                    <p className="font-medium">{project.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {project.type}
                    </p>
                    <Progress value={project.progress} className="w-32" />
                  </div>
                  <Badge
                    variant={
                      project.status === "Complete"
                        ? "default"
                        : project.status === "In Progress"
                        ? "secondary"
                        : "outline"
                    }
                  >
                    {project.status}
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="card-enterprise">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="ghost">
                <Activity className="mr-2 h-4 w-4" />
                Scan Legacy Codebase
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <Zap className="mr-2 h-4 w-4" />
                Generate API Endpoints
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <CheckCircle className="mr-2 h-4 w-4" />
                Run Security Analysis
              </Button>
              <Button className="w-full justify-start" variant="ghost">
                <AlertTriangle className="mr-2 h-4 w-4" />
                Estimate Migration Cost
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;