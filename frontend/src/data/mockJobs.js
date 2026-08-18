export const initialApplications = [
  {
    id: 'app-1',
    company: 'Stripe',
    role: 'Staff Frontend Engineer',
    stage: 'interview', // wishlist, applied, interview, offer
    salary: '$190k - $230k',
    location: 'Remote (US/EU)',
    appliedDate: '2026-07-28',
    lastActivity: '2 days ago',
    type: 'Full-time',
    referral: 'Ex-colleague (Engineering Lead)',
    round: 'System Architecture (Round 3 of 4)',
    notes: 'Covered distributed state & optimistic UI patterns in round 2. Next: Take-home review with Staff Architect.',
    tags: ['React', 'TypeScript', 'High Priority'],
    color: '#6366f1',
    initials: 'ST',
    timeline: [
      { date: 'Jul 28', event: 'Application submitted via referral' },
      { date: 'Aug 02', event: 'Recruiter screen completed (30m)' },
      { date: 'Aug 09', event: 'Technical deep-dive with Principal Eng' },
      { date: 'Aug 17', event: 'System Architecture round scheduled' },
    ]
  },
  {
    id: 'app-2',
    company: 'Linear',
    role: 'Senior Product Engineer',
    stage: 'offer',
    salary: '$180k - $210k + 0.15% equity',
    location: 'Remote (Global)',
    appliedDate: '2026-07-15',
    lastActivity: 'Yesterday',
    type: 'Full-time',
    referral: 'Direct application',
    round: 'Offer Stage — Negotiation Phase',
    notes: 'Written offer received. Reviewing equity vesting schedule and compensation package before Friday.',
    tags: ['Next.js', 'WebGL', 'Top Choice'],
    color: '#5e6ad2',
    initials: 'LN',
    timeline: [
      { date: 'Jul 15', event: 'Application submitted' },
      { date: 'Jul 20', event: 'First round portfolio walkthrough' },
      { date: 'Jul 29', event: 'Pair programming session' },
      { date: 'Aug 12', event: 'Founder chat & values alignment' },
      { date: 'Aug 16', event: 'Formal Offer letter received' },
    ]
  },
  {
    id: 'app-3',
    company: 'Vercel',
    role: 'Design Engineer (Core UI)',
    stage: 'interview',
    salary: '$175k - $205k',
    location: 'San Francisco, CA / Hybrid',
    appliedDate: '2026-08-01',
    lastActivity: '3 days ago',
    type: 'Full-time',
    referral: 'Conference contact',
    round: 'UI Craft & Component Design (Round 2 of 3)',
    notes: 'Showcase design tokens, micro-interactions, and accessibility optimizations.',
    tags: ['Design Systems', 'Tailwind', 'Next.js'],
    color: '#000000',
    initials: 'VC',
    timeline: [
      { date: 'Aug 01', event: 'Application submitted' },
      { date: 'Aug 06', event: 'Screen with Design Systems Lead' },
      { date: 'Aug 14', event: 'Component architecture interview' },
    ]
  },
  {
    id: 'app-4',
    company: 'Figma',
    role: 'Full Stack Engineer (Workspaces)',
    stage: 'applied',
    salary: '$185k - $220k',
    location: 'San Francisco, CA / Remote',
    appliedDate: '2026-08-10',
    lastActivity: '5 days ago',
    type: 'Full-time',
    referral: 'None',
    round: 'Application In Review',
    notes: 'Submitted customized resume highlighting real-time multiplayer document sync.',
    tags: ['WebSockets', 'Rust', 'CRDTs'],
    color: '#f24e1e',
    initials: 'FG',
    timeline: [
      { date: 'Aug 10', event: 'Application received & verified' },
      { date: 'Aug 12', event: 'Passed initial resume parsing check' },
    ]
  },
  {
    id: 'app-5',
    company: 'Datadog',
    role: 'Senior Frontend Infrastructure Engineer',
    stage: 'applied',
    salary: '$170k - $200k',
    location: 'New York, NY / Remote',
    appliedDate: '2026-08-12',
    lastActivity: '4 days ago',
    type: 'Full-time',
    referral: 'Alumni network',
    round: 'Recruiter Screening Scheduled',
    notes: 'Recruiter call booked for Thursday 2:00 PM EST.',
    tags: ['Performance', 'Webpack', 'Observability'],
    color: '#632ca6',
    initials: 'DD',
    timeline: [
      { date: 'Aug 12', event: 'Application submitted' },
      { date: 'Aug 15', event: 'Recruiter invite sent' },
    ]
  },
  {
    id: 'app-6',
    company: 'Supabase',
    role: 'Developer Advocate & UI Engineer',
    stage: 'wishlist',
    salary: '$160k - $190k',
    location: 'Remote (Worldwide)',
    appliedDate: 'Not submitted',
    lastActivity: 'Just added',
    type: 'Full-time',
    referral: 'Preparing portfolio piece',
    round: 'Drafting Application',
    notes: 'Polishing open-source Postgres visualizer tool before submitting direct pitch to Head of DX.',
    tags: ['PostgreSQL', 'Content', 'OSS'],
    color: '#3ecf8e',
    initials: 'SB',
    timeline: [
      { date: 'Aug 16', event: 'Target role identified' },
      { date: 'Aug 18', event: 'Drafted tailored introduction memo' },
    ]
  },
  {
    id: 'app-7',
    company: 'Anthropic',
    role: 'Frontend Systems Engineer',
    stage: 'interview',
    salary: '$200k - $240k',
    location: 'San Francisco, CA',
    appliedDate: '2026-07-22',
    lastActivity: '1 day ago',
    type: 'Full-time',
    referral: 'Engineering referral',
    round: 'Final Onsite Virtual (4 rounds)',
    notes: 'Onsite completed yesterday. Topics: streaming token renderers, responsive canvas, concurrency.',
    tags: ['AI UI', 'Streaming', 'High Priority'],
    color: '#d97706',
    initials: 'AN',
    timeline: [
      { date: 'Jul 22', event: 'Application submitted' },
      { date: 'Jul 27', event: 'Technical Phone Screen' },
      { date: 'Aug 05', event: 'Coding & Architecture exercise' },
      { date: 'Aug 18', event: 'Full-loop Onsite virtual panels' },
    ]
  },
  {
    id: 'app-8',
    company: 'Postman',
    role: 'Lead UI Platform Engineer',
    stage: 'wishlist',
    salary: '$175k - $205k',
    location: 'Remote (US/India)',
    appliedDate: 'Not submitted',
    lastActivity: '3 days ago',
    type: 'Full-time',
    referral: 'None',
    round: 'Researching Team Structure',
    notes: 'Reaching out to engineering manager on LinkedIn for team scope clarification.',
    tags: ['APIs', 'Electron', 'Micro-frontends'],
    color: '#ff6c37',
    initials: 'PM',
    timeline: [
      { date: 'Aug 15', event: 'Bookmark added to pipeline' }
    ]
  }
];

export const STAGES = [
  { id: 'wishlist', label: 'Wishlist / Drafting', color: 'bg-slate-500/10 text-slate-400 border-slate-700/50', dotColor: 'bg-slate-400' },
  { id: 'applied', label: 'Applied / In Review', color: 'bg-blue-500/10 text-blue-400 border-blue-700/50', dotColor: 'bg-blue-400' },
  { id: 'interview', label: 'Interviewing', color: 'bg-amber-500/10 text-amber-400 border-amber-700/50', dotColor: 'bg-amber-400' },
  { id: 'offer', label: 'Offer Received', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-700/50', dotColor: 'bg-emerald-400' }
];

export const VALUE_PROPS = [
  {
    icon: 'Kanban',
    title: 'Visual Pipeline Tracking',
    desc: 'Move applications effortlessly across custom stages with zero lag and zero spreadsheet formula breakage.'
  },
  {
    icon: 'FileText',
    title: 'Context & Prep Notes in Place',
    desc: 'Keep salary bounds, interview round history, interviewer feedback, and resume versions tied to each company card.'
  },
  {
    icon: 'Target',
    title: 'Active Funnel Velocity',
    desc: 'See exactly where momentum is stalling so you know when to follow up, when to negotiate, and when to close.'
  },
  {
    icon: 'ShieldCheck',
    title: '100% Local-First & Private',
    desc: 'Your career data belongs strictly to you. No tracking pixels, no selling your job search telemetry to third parties.'
  }
];
