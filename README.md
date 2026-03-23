# IntelliBridge AI Dashboard

## Project Overview

This is a **full-stack React application** for AI-powered legacy system modernization. The application provides a dashboard interface for analyzing code, containerizing applications, generating APIs, estimating migration costs, and performing security analysis.

---

## Tech Stack

### Frontend
| Category | Technology | Version |
|----------|------------|---------|
| Build Tool | Vite | 7.3.0 |
| Framework | React | 18.3.1 |
| Language | TypeScript | 5.8.3 |
| UI Components | shadcn/ui + Radix UI | Latest |
| Styling | Tailwind CSS | 3.4.17 |
| State Management | TanStack React Query | 5.83.0 |
| Form Validation | React Hook Form + Zod | 7.61.1 / 3.25.76 |
| Routing | React Router | 6.30.1 |
| Charts | Recharts | 2.15.4 |
| Icons | Lucide React | 0.462.0 |
| Theme | next-themes | 0.4.6 |

### Backend
| Category | Technology | Version |
|----------|------------|---------|
| Runtime | Node.js + TypeScript | Latest |
| Framework | Express.js | 4.21.0 |
| ORM | Prisma | 5.22.0 |
| Database | PostgreSQL (Optional) | Latest |
| Authentication | JWT | 9.0.2 |
| Validation | Zod | 3.23.8 |
| File Upload | Multer | 1.4.5 |

---

## Project Structure

```
intellibridge-ai-dash-main/
├── src/                          # Frontend React application
│   ├── components/
│   │   ├── ui/                   # shadcn/ui components
│   │   ├── layout/
│   │   │   └── dashboard-layout.tsx
│   │   ├── ChatAssistant.tsx
│   │   ├── theme-provider.tsx
│   │   └── theme-toggle.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── CodeScanner.tsx
│   │   ├── Containerizer.tsx
│   │   ├── ApiGenerator.tsx
│   │   ├── MigrationEstimator.tsx
│   │   ├── SecurityAnalyzer.tsx
│   │   ├── Reports.tsx
│   │   └── Login.tsx
│   ├── lib/
│   │   ├── utils.ts
│   │   └── api.ts               # API client
│   ├── hooks/
│   │   └── use-toast.ts
│   ├── App.tsx
│   ├── main.tsx
│   └── index.css
├── server/                       # Backend Express server
│   ├── prisma/
│   │   └── schema.prisma
│   ├── src/
│   │   ├── config/
│   │   │   ├── database.ts
│   │   │   ├── mockDatabase.ts
│   │   │   └── index.ts
│   │   ├── controllers/
│   │   │   ├── auth.controller.ts
│   │   │   ├── project.controller.ts
│   │   │   ├── codeScanner.controller.ts
│   │   │   ├── containerizer.controller.ts
│   │   │   ├── apiGenerator.controller.ts
│   │   │   ├── migrationEstimator.controller.ts
│   │   │   ├── securityAnalyzer.controller.ts
│   │   │   └── reports.controller.ts
│   │   ├── services/
│   │   │   ├── codeScanner.service.ts
│   │   │   ├── containerizer.service.ts
│   │   │   ├── apiGenerator.service.ts
│   │   │   ├── migrationEstimator.service.ts
│   │   │   ├── securityAnalyzer.service.ts
│   │   │   └── reports.service.ts
│   │   ├── routes/
│   │   │   ├── auth.routes.ts
│   │   │   ├── project.routes.ts
│   │   │   ├── codeScanner.routes.ts
│   │   │   ├── containerizer.routes.ts
│   │   │   ├── apiGenerator.routes.ts
│   │   │   ├── migrationEstimator.routes.ts
│   │   │   ├── securityAnalyzer.routes.ts
│   │   │   └── reports.routes.ts
│   │   ├── middleware/
│   │   │   ├── auth.middleware.ts
│   │   │   └── error.middleware.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts
│   ├── package.json
│   ├── tsconfig.json
│   └── .env
├── public/
├── package.json
├── vite.config.ts
├── tailwind.config.ts
├── .env
└── README.md
```

---

## Features

### 1. Code Scanner
Upload and analyze legacy code files for:
- **Technology identification** - Automatically detect programming languages
- **Complexity analysis** - Calculate cyclomatic complexity scores
- **Dependency mapping** - Extract imports and dependencies
- **Issue detection** - Find legacy patterns and anti-patterns
- **Migration recommendations** - Suggest modernization strategies

### 2. Containerizer
Containerize applications with:
- **Dockerfile generation** - Multi-stage builds for various languages
- **Docker Compose configuration** - Multi-service orchestration
- **Kubernetes manifests** - K8s deployment configurations
- **Best practices** - Security hardening and optimization

### 3. API Generator
Generate modern APIs from legacy systems:
- **REST API** - Full Express.js server with routes
- **OpenAPI/Swagger** - API documentation
- **GraphQL** - Schema and resolvers

### 4. Migration Estimator
Estimate migration efforts and costs:
- **Complexity scoring** - Based on code analysis
- **Time estimation** - Hours/days/months breakdown
- **Cost calculation** - All costs in INR (₹)
- **Risk assessment** - Identified migration risks

### 5. Security Analyzer
Perform security analysis on code:
- **Vulnerability detection** - OWASP Top 10 patterns
- **Security scoring** - 0-100 score based on findings
- **Compliance checking** - PCI-DSS, SOC2, HIPAA

### 6. Reports
Generate comprehensive reports:
- **Code Analysis Report**
- **Migration Report**
- **Security Audit Report**
- **Technical Debt Report**
- **Comprehensive Report**

---

## Getting Started

### Prerequisites
- Node.js 18+ installed
- npm or bun package manager

### Step 1: Start the Backend Server

```bash
cd server
npm install
npm run dev
```

The backend server will start on **http://localhost:3001**

### Step 2: Start the Frontend (in a new terminal)

```bash
npm install
npm run dev
```

The frontend will start on **http://localhost:5173**

### Step 3: Access the Application

1. Open **http://localhost:5173**
2. Login with demo credentials or register a new account

### Demo Credentials
- **Email:** demo@intellibridge.ai
- **Password:** demo123

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | /api/auth/register | Register new user |
| POST | /api/auth/login | Login user |
| GET | /api/auth/profile | Get user profile |
| GET | /api/projects | List all projects |
| POST | /api/projects | Create new project |
| GET | /api/projects/:id | Get project details |
| PUT | /api/projects/:id | Update project |
| DELETE | /api/projects/:id | Delete project |
| POST | /api/code-scanner/upload | Upload and analyze code |
| GET | /api/code-scanner/:id | Get analysis results |
| POST | /api/containerizer/generate | Generate Docker configs |
| POST | /api/api-generator/generate | Generate REST/GraphQL API |
| POST | /api/migration-estimator/estimate | Get migration estimate |
| GET | /api/migration-estimator/project/:projectId | Get estimate for project |
| POST | /api/security-analyzer/scan | Run security scan |
| POST | /api/reports/generate | Generate reports |
| GET | /api/reports/project/:projectId | Get reports for project |

---

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=http://localhost:3001
```

### Backend (server/.env)
```
PORT=3001
DATABASE_URL=postgresql://user:password@localhost:5432/intellibridge
JWT_SECRET=your-secret-key
JWT_EXPIRES_IN=7d
USE_MOCK_DB=true
```

---

## Current Status

| Component | Status |
|-----------|--------|
| Frontend UI | ✅ Complete |
| Backend Server | ✅ Complete |
| Code Scanner | ✅ Complete |
| Containerizer | ✅ Complete |
| API Generator | ✅ Complete |
| Migration Estimator | ✅ Complete |
| Security Analyzer | ✅ Complete |
| Reports | ✅ Complete |
| Login Page | ✅ Complete |
| Frontend-Backend Integration | ✅ Complete |
| Currency (INR) | ✅ Complete |
| AI Chat Assistant | ✅ Complete |
| Dark/Light Mode | ✅ Complete |
