import express from 'express';
import { seedApplications } from '../data/initialJobs.js';

const router = express.Router();
let applications = [...seedApplications];

// GET /api/applications - List applications with optional filtering
router.get('/', (req, res) => {
  const { stage, search } = req.query;
  let results = [...applications];

  if (stage && stage !== 'all') {
    results = results.filter(app => app.stage === stage);
  }

  if (search) {
    const q = search.toLowerCase();
    results = results.filter(app => 
      app.company.toLowerCase().includes(q) ||
      app.role.toLowerCase().includes(q) ||
      app.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  res.json({
    success: true,
    count: results.length,
    data: results
  });
});

// GET /api/applications/stats/summary - Aggregate pipeline funnel statistics
router.get('/stats/summary', (req, res) => {
  const counts = {
    wishlist: applications.filter(a => a.stage === 'wishlist').length,
    applied: applications.filter(a => a.stage === 'applied').length,
    interview: applications.filter(a => a.stage === 'interview').length,
    offer: applications.filter(a => a.stage === 'offer').length,
    total: applications.length
  };

  const conversionRate = counts.total > 0 
    ? Math.round((counts.interview / counts.total) * 100) 
    : 0;

  res.json({
    success: true,
    data: {
      counts,
      conversionRate: `${conversionRate}%`,
      activeOffers: counts.offer,
      privacyMode: 'local-first'
    }
  });
});

// GET /api/applications/:id - Retrieve single application details
router.get('/:id', (req, res) => {
  const app = applications.find(a => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }
  res.json({ success: true, data: app });
});

// POST /api/applications - Create a new opportunity
router.post('/', (req, res) => {
  const { company, role, stage = 'applied', salary = '$180k - $210k', location = 'Remote' } = req.body;
  if (!company || !role) {
    return res.status(400).json({ success: false, message: 'Company and Role are required' });
  }

  const colors = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
  const newApp = {
    id: `app-${Date.now()}`,
    company,
    role,
    stage,
    salary,
    location,
    appliedDate: new Date().toISOString().split('T')[0],
    lastActivity: 'Just now',
    type: 'Full-time',
    referral: 'API Entry',
    round: 'Initial Stage',
    notes: 'Added via HireFlow API endpoint.',
    tags: ['Active', 'Custom'],
    color: colors[Math.floor(Math.random() * colors.length)],
    initials: company.slice(0, 2).toUpperCase(),
    timeline: [
      { date: 'Today', event: 'Application registered via API' }
    ]
  };

  applications.unshift(newApp);
  res.status(201).json({ success: true, data: newApp });
});

// PATCH /api/applications/:id/stage - Update stage of an application
router.patch('/:id/stage', (req, res) => {
  const { stage } = req.body;
  const app = applications.find(a => a.id === req.params.id);
  
  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  app.stage = stage;
  app.lastActivity = 'Just now';
  app.timeline = [
    { date: 'Today', event: `Stage updated to ${stage.toUpperCase()}` },
    ...(app.timeline || [])
  ];

  res.json({ success: true, data: app });
});

export default router;
