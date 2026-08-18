import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicationsRouter from './routes/applications.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// CORS setup to allow frontend (localhost or live deployed Vercel domain)
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Request logger
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.json({
    status: 'healthy',
    service: 'HireFlow API',
    uptime: process.uptime(),
    timestamp: new Date().toISOString()
  });
});

// Applications routes
app.use('/api/applications', applicationsRouter);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    service: 'HireFlow REST API',
    version: '1.0.0',
    documentation: {
      health: 'GET /api/health',
      listApplications: 'GET /api/applications',
      singleApplication: 'GET /api/applications/:id',
      createApplication: 'POST /api/applications',
      updateStage: 'PATCH /api/applications/:id/stage',
      deleteApplication: 'DELETE /api/applications/:id'
    }
  });
});

app.listen(PORT, () => {
  console.log(`🚀 HireFlow REST API running on http://localhost:${PORT}`);
});
