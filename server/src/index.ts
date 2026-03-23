import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth.routes';
import projectRoutes from './routes/project.routes';
import codeScannerRoutes from './routes/codeScanner.routes';
import containerizerRoutes from './routes/containerizer.routes';
import apiGeneratorRoutes from './routes/apiGenerator.routes';
import migrationEstimatorRoutes from './routes/migrationEstimator.routes';
import securityAnalyzerRoutes from './routes/securityAnalyzer.routes';
import reportsRoutes from './routes/reports.routes';
import { errorMiddleware } from './middleware/error.middleware';

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors({ origin: ['http://localhost:5173', 'http://localhost:8080'], credentials: true }));
app.use(express.json({ limit: '10mb' }));

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'healthy', timestamp: new Date().toISOString(), service: 'IntelliBridge API' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/code-scanner', codeScannerRoutes);
app.use('/api/containerizer', containerizerRoutes);
app.use('/api/api-generator', apiGeneratorRoutes);
app.use('/api/migration-estimator', migrationEstimatorRoutes);
app.use('/api/security-analyzer', securityAnalyzerRoutes);
app.use('/api/reports', reportsRoutes);

// Error handling
app.use(errorMiddleware);

app.listen(PORT, () => {
  console.log(`🚀 IntelliBridge API server running on http://localhost:${PORT}`);
  console.log(`📋 Health check: http://localhost:${PORT}/health`);
  console.log(`🗄️  Using mock database (in-memory)`);
});

export default app;
