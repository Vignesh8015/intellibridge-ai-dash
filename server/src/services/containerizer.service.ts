import { ContainerConfig } from '../types';

export const generateContainerConfig = (language: string, appName: string): ContainerConfig => {
  const configs: Record<string, () => ContainerConfig> = {
    Java: () => ({
      dockerfile: `# Multi-stage build for Java application
FROM maven:3.9-eclipse-temurin-21 AS build
WORKDIR /app
COPY pom.xml .
RUN mvn dependency:go-offline
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=build /app/target/*.jar app.jar
USER appuser
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s CMD wget -qO- http://localhost:8080/actuator/health || exit 1
ENTRYPOINT ["java", "-jar", "app.jar"]`,
      dockerCompose: `version: '3.8'
services:
  ${appName}:
    build: .
    ports:
      - "8080:8080"
    environment:
      - SPRING_PROFILES_ACTIVE=production
      - DATABASE_URL=jdbc:postgresql://db:5432/${appName}
    depends_on:
      db:
        condition: service_healthy
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${appName}
      POSTGRES_USER: app
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
    healthcheck:
      test: ["CMD-SHELL", "pg_isready -U app"]
      interval: 10s
      timeout: 5s
      retries: 5
volumes:
  pgdata:`,
      kubernetesManifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appName}
spec:
  replicas: 3
  selector:
    matchLabels:
      app: ${appName}
  template:
    metadata:
      labels:
        app: ${appName}
    spec:
      containers:
      - name: ${appName}
        image: ${appName}:latest
        ports:
        - containerPort: 8080
        resources:
          requests:
            memory: "256Mi"
            cpu: "250m"
          limits:
            memory: "512Mi"
            cpu: "500m"
---
apiVersion: v1
kind: Service
metadata:
  name: ${appName}
spec:
  selector:
    app: ${appName}
  ports:
  - port: 80
    targetPort: 8080
  type: ClusterIP`,
      bestPractices: [
        'Multi-stage build reduces final image size',
        'Non-root user for security',
        'Health check endpoint configured',
        'Resource limits set in K8s manifest',
        'Database dependency with health check',
      ],
    }),
    Python: () => ({
      dockerfile: `FROM python:3.12-slim AS builder
WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

FROM python:3.12-slim
WORKDIR /app
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser
COPY --from=builder /root/.local /root/.local
COPY . .
ENV PATH=/root/.local/bin:$PATH
USER appuser
EXPOSE 8000
HEALTHCHECK --interval=30s --timeout=3s CMD curl -f http://localhost:8000/health || exit 1
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]`,
      dockerCompose: `version: '3.8'
services:
  ${appName}:
    build: .
    ports:
      - "8000:8000"
    environment:
      - DATABASE_URL=postgresql://app:\${DB_PASSWORD}@db:5432/${appName}
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    environment:
      POSTGRES_DB: ${appName}
      POSTGRES_USER: app
      POSTGRES_PASSWORD: \${DB_PASSWORD}
    volumes:
      - pgdata:/var/lib/postgresql/data
volumes:
  pgdata:`,
      kubernetesManifest: `apiVersion: apps/v1
kind: Deployment
metadata:
  name: ${appName}
spec:
  replicas: 2
  selector:
    matchLabels:
      app: ${appName}
  template:
    metadata:
      labels:
        app: ${appName}
    spec:
      containers:
      - name: ${appName}
        image: ${appName}:latest
        ports:
        - containerPort: 8000
---
apiVersion: v1
kind: Service
metadata:
  name: ${appName}
spec:
  selector:
    app: ${appName}
  ports:
  - port: 80
    targetPort: 8000`,
      bestPractices: [
        'Slim base image for smaller footprint',
        'Multi-stage build for dependency isolation',
        'Non-root user configured',
        'Health check included',
      ],
    }),
  };

  const generator = configs[language] || configs['Python'];
  return generator();
};
