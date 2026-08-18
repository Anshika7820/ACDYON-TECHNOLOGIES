import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import applicationsRouter from './routes/applications.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Middleware
app.use(cors());
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

// Applications API
app.use('/api/applications', applicationsRouter);

// Root greeting
app.get('/', (req, res) => {
  res.json({
    name: 'HireFlow Backend Service',
    version: '1.0.0',
    documentation: '/api/health or /api/applications'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 HireFlow backend running on port ${PORT}`);
});
