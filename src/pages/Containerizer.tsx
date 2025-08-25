import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import {
  Package,
  Layers,
  Settings,
  CheckCircle,
  Download,
  Copy,
  Play,
} from "lucide-react";

// Mock detected modules
const detectedModules = [
  {
    name: "user-management",
    type: "Spring Boot Service",
    dependencies: ["PostgreSQL", "Redis"],
    complexity: "Medium",
    status: "Ready",
  },
  {
    name: "payment-processor",
    type: "Microservice",
    dependencies: ["MySQL", "RabbitMQ"],
    complexity: "High",
    status: "Ready",
  },
  {
    name: "notification-service",
    type: "Node.js API",
    dependencies: ["MongoDB", "Email Service"],
    complexity: "Low",
    status: "Ready",
  },
  {
    name: "legacy-reports",
    type: "COBOL Batch",
    dependencies: ["DB2", "File System"],
    complexity: "High",
    status: "Requires Migration",
  },
];

const dockerfileContent = `# Multi-stage Docker build for user-management service
FROM maven:3.8-openjdk-11-slim AS builder

WORKDIR /app
COPY pom.xml .
COPY src ./src

RUN mvn clean package -DskipTests

FROM openjdk:11-jre-slim

RUN groupadd -r appuser && useradd -r -g appuser appuser

WORKDIR /app

COPY --from=builder /app/target/*.jar app.jar
COPY --chown=appuser:appuser docker-entrypoint.sh /app/

RUN chmod +x /app/docker-entrypoint.sh

USER appuser

EXPOSE 8080

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \\
  CMD curl -f http://localhost:8080/actuator/health || exit 1

ENTRYPOINT ["/app/docker-entrypoint.sh"]
CMD ["java", "-Djava.security.egd=file:/dev/./urandom", "-jar", "/app/app.jar"]`;

const dockerComposeContent = `version: '3.8'

services:
  user-management:
    build: 
      context: ./user-management
      dockerfile: Dockerfile
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=docker
      - DB_HOST=postgres
      - REDIS_HOST=redis
    depends_on:
      - postgres
      - redis
    networks:
      - app-network
    healthcheck:
      test: ["CMD", "curl", "-f", "http://localhost:8080/actuator/health"]
      interval: 30s
      timeout: 10s
      retries: 3

  postgres:
    image: postgres:13
    environment:
      POSTGRES_DB: userdb
      POSTGRES_USER: appuser
      POSTGRES_PASSWORD: apppass
    ports:
      - "5432:5432"
    volumes:
      - postgres_data:/var/lib/postgresql/data
    networks:
      - app-network

  redis:
    image: redis:6-alpine
    ports:
      - "6379:6379"
    networks:
      - app-network

volumes:
  postgres_data:

networks:
  app-network:
    driver: bridge`;

const Containerizer = () => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [generatedFiles, setGeneratedFiles] = useState<boolean>(false);

  const handleGenerateContainers = () => {
    setGeneratedFiles(true);
  };

  const copyToClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Auto Containerizer</h1>
        <p className="text-muted-foreground">
          Automatically detect application modules and generate Docker configurations
          for containerized deployment.
        </p>
      </div>

      {/* Detected Modules */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Layers className="mr-2 h-5 w-5" />
            Detected Application Modules
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4">
            {detectedModules.map((module, index) => (
              <div
                key={index}
                className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                  selectedModule === module.name
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
                onClick={() => setSelectedModule(module.name)}
              >
                <div className="flex items-center justify-between">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-primary" />
                      <h3 className="font-semibold">{module.name}</h3>
                      <Badge variant="outline">{module.type}</Badge>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Dependencies: {module.dependencies.join(", ")}</span>
                      <span>Complexity: {module.complexity}</span>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={
                        module.status === "Ready"
                          ? "default"
                          : module.status === "Requires Migration"
                          ? "destructive"
                          : "secondary"
                      }
                    >
                      {module.status}
                    </Badge>
                    {selectedModule === module.name && (
                      <CheckCircle className="h-5 w-5 text-primary" />
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Generation Controls */}
      <Card className="card-enterprise">
        <CardHeader>
          <CardTitle className="flex items-center">
            <Settings className="mr-2 h-5 w-5" />
            Container Generation
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Selected Modules</p>
              <p className="text-sm text-muted-foreground">
                {selectedModule ? `${selectedModule} selected` : "No modules selected"}
              </p>
            </div>
            <Button
              onClick={handleGenerateContainers}
              disabled={!selectedModule}
              className="flex items-center"
            >
              <Play className="mr-2 h-4 w-4" />
              Generate Docker Files
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Generated Files */}
      {generatedFiles && (
        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <CheckCircle className="h-5 w-5 text-success" />
            <h2 className="text-xl font-semibold">Generated Container Configuration</h2>
          </div>

          {/* Dockerfile */}
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>Dockerfile</span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(dockerfileContent)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={dockerfileContent}
                readOnly
                className="font-mono text-sm min-h-[300px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Docker Compose */}
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>docker-compose.yml</span>
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => copyToClipboard(dockerComposeContent)}
                  >
                    <Copy className="mr-2 h-4 w-4" />
                    Copy
                  </Button>
                  <Button variant="outline" size="sm">
                    <Download className="mr-2 h-4 w-4" />
                    Download
                  </Button>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Textarea
                value={dockerComposeContent}
                readOnly
                className="font-mono text-sm min-h-[400px] resize-none"
              />
            </CardContent>
          </Card>

          {/* Next Steps */}
          <Card className="card-enterprise">
            <CardHeader>
              <CardTitle>Next Steps</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <p>Download the generated Docker configuration files</p>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <p>Review and customize the configurations for your environment</p>
                </div>
                <Separator />
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <p>Run <code className="bg-secondary px-1 rounded text-sm">docker-compose up</code> to deploy your containerized application</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Containerizer;