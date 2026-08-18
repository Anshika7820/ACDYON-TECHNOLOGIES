import express from 'express';
import { seedApplications } from '../data/initialJobs.js';

const router = express.Router();
let applications = [...seedApplications];

// GET /api/applications - List all applications with optional search and stage filter
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

// GET /api/applications/:id - Retrieve single application details
router.get('/:id', (req, res) => {
  const app = applications.find(a => a.id === req.params.id);
  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }
  res.json({ success: true, data: app });
});

const ALLOWED_STAGES = ['wishlist', 'applied', 'interview', 'offer'];

// POST /api/applications - Create a new application opportunity
router.post('/', (req, res) => {
  const { 
    company, 
    role, 
    stage = 'applied', 
    salary = '$180k - $210k', 
    location = 'Remote', 
    notes = '',
    nextAction = 'Follow up with recruiter regarding next steps'
  } = req.body;

  if (!company || !role) {
    return res.status(400).json({ success: false, message: 'Company name and role are required' });
  }

  if (stage && !ALLOWED_STAGES.includes(stage)) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid application stage. Allowed stages: ${ALLOWED_STAGES.join(', ')}` 
    });
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
    nextAction,
    type: 'Full-time',
    referral: 'Direct application',
    round: 'Initial Stage',
    notes: notes || 'Added directly through HireFlow application workspace.',
    tags: ['Active', 'Custom'],
    color: colors[Math.floor(Math.random() * colors.length)],
    initials: company.slice(0, 2).toUpperCase(),
    timeline: [
      { date: 'Today', event: 'Added to HireFlow tracker' }
    ]
  };

  applications.unshift(newApp);
  res.status(201).json({ success: true, data: newApp });
});

// PATCH /api/applications/:id/stage - Advance or update the stage of an application
router.patch('/:id/stage', (req, res) => {
  const { stage } = req.body;
  const app = applications.find(a => a.id === req.params.id);

  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  if (!stage || !ALLOWED_STAGES.includes(stage)) {
    return res.status(400).json({ 
      success: false, 
      message: `Stage is required and must be one of: ${ALLOWED_STAGES.join(', ')}` 
    });
  }

  app.stage = stage;
  app.lastActivity = 'Just now';
  app.timeline = [
    { date: 'Today', event: `Stage advanced to ${stage.toUpperCase()}` },
    ...(app.timeline || [])
  ];

  res.json({ success: true, data: app });
});

// PATCH /api/applications/:id - Update general fields or stage of an application
router.patch('/:id', (req, res) => {
  const app = applications.find(a => a.id === req.params.id);

  if (!app) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  if (req.body.stage && !ALLOWED_STAGES.includes(req.body.stage)) {
    return res.status(400).json({ 
      success: false, 
      message: `Invalid stage. Allowed stages: ${ALLOWED_STAGES.join(', ')}` 
    });
  }

  const allowedFields = ['stage', 'notes', 'salary', 'location', 'nextAction', 'role', 'company'];
  let hasChanges = false;

  for (const field of allowedFields) {
    if (req.body[field] !== undefined) {
      if (field === 'stage' && req.body.stage !== app.stage) {
        app.timeline = [
          { date: 'Today', event: `Stage updated to ${req.body.stage.toUpperCase()}` },
          ...(app.timeline || [])
        ];
      }
      app[field] = req.body[field];
      hasChanges = true;
    }
  }

  if (hasChanges) {
    app.lastActivity = 'Just now';
  }

  res.json({ success: true, data: app });
});

// DELETE /api/applications/:id - Remove an application
router.delete('/:id', (req, res) => {
  const initialLen = applications.length;
  applications = applications.filter(a => a.id !== req.params.id);
  
  if (applications.length === initialLen) {
    return res.status(404).json({ success: false, message: 'Application not found' });
  }

  res.json({ success: true, message: 'Application removed successfully' });
});

export default router;
