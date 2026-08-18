import React, { useState } from 'react';
import { 
  Kanban, 
  Table as TableIcon, 
  BarChart3, 
  Plus, 
  Search, 
  ChevronRight, 
  Clock, 
  Info
} from 'lucide-react';
import { STAGES } from '../data/mockJobs';

export default function DashboardMockup({ 
  applications, 
  onSelectJob, 
  onAdvanceStage, 
  onAddJob,
  apiStatus = 'connected',
  isLoading = false,
  onRetryLoad
}) {
  const [activeView, setActiveView] = useState('kanban');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStageFilter, setSelectedStageFilter] = useState('all');
  const [mobileActiveStage, setMobileActiveStage] = useState('interview');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newRole, setNewRole] = useState('');
  const [newSalary, setNewSalary] = useState('$180k - $210k');
  const [newStage, setNewStage] = useState('applied');

  // Filtered jobs
  const filteredJobs = applications.filter(job => {
    const matchesSearch = 
      job.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.role.toLowerCase().includes(searchQuery.toLowerCase()) ||
      job.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStage = selectedStageFilter === 'all' || job.stage === selectedStageFilter;
    return matchesSearch && matchesStage;
  });

  // Dynamic stage counts
  const stageCounts = {
    wishlist: applications.filter(j => j.stage === 'wishlist').length,
    applied: applications.filter(j => j.stage === 'applied').length,
    interview: applications.filter(j => j.stage === 'interview').length,
    offer: applications.filter(j => j.stage === 'offer').length,
    total: applications.length
  };

  // Next Action insight
  const urgentJob = applications.find(j => j.stage === 'interview' && j.nextAction) || applications.find(j => j.nextAction);

  const [formError, setFormError] = useState(null);

  const handleCreateJob = (e) => {
    e.preventDefault();
    setFormError(null);
    if (!newCompany.trim()) {
      setFormError('Company name is required');
      return;
    }
    if (!newRole.trim()) {
      setFormError('Role title is required');
      return;
    }
    
    const colors = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newJobObj = {
      company: newCompany.trim(),
      role: newRole.trim(),
      stage: newStage,
      salary: newSalary,
      location: 'Remote',
      appliedDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      nextAction: 'Follow up with recruiter regarding next steps',
      type: 'Full-time',
      referral: 'Direct application',
      round: 'Initial Stage',
      notes: 'Added directly during interactive demo walkthrough.',
      tags: ['Custom', 'Active'],
      color: randomColor,
      initials: newCompany.trim().slice(0, 2).toUpperCase(),
      timeline: [
        { date: 'Today', event: 'Added to HireFlow tracker' }
      ]
    };

    onAddJob(newJobObj);
    setNewCompany('');
    setNewRole('');
    setIsAddModalOpen(false);
  };

  // Dynamic analytics calculations
  const offerJobs = applications.filter(j => j.stage === 'offer');
  const topOfferText = offerJobs.length > 0 
    ? `${offerJobs[0].company} (${offerJobs[0].role})`
    : 'No active offers currently';

  const parsedSalaries = applications.map(app => {
    if (!app.salary) return null;
    const numbers = app.salary.match(/\d+/g);
    if (!numbers || numbers.length === 0) return null;
    const vals = numbers.map(n => parseInt(n, 10) * (n.length <= 3 ? 1000 : 1));
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }).filter(Boolean);

  const avgSalaryVal = parsedSalaries.length > 0
    ? Math.round(parsedSalaries.reduce((a, b) => a + b, 0) / parsedSalaries.length)
    : 0;

  const avgSalaryFormatted = avgSalaryVal > 0 
    ? `$${avgSalaryVal.toLocaleString()} / yr`
    : 'N/A';

  const isMac = typeof window !== 'undefined' && /Mac|iPod|iPhone|iPad/.test(navigator.platform);
  const shortcutLabel = isMac ? '⌘K' : 'Ctrl+K';

  return (
    <section id="product-demo" className="py-8 md:py-16 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6 md:mb-10">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Interactive Product Pipeline
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            Click any card to inspect interview notes, or click <strong>Advance</strong> to move an opportunity across stages.
          </p>
        </div>

        {/* Outer Dashboard Container */}
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          
          {/* Top Demo Disclaimer Banner */}
          <div className="px-4 py-2 bg-slate-100/90 dark:bg-slate-850/90 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <Info className="w-3.5 h-3.5 text-brand-500 shrink-0" />
              <span><strong>Demo Workspace</strong> &bull; All company names and application records are fictional sample data.</span>
            </div>
            
            {apiStatus === 'connected' && (
              <span className="font-mono text-[11px] hidden sm:inline-flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" /> REST API Connected
              </span>
            )}
            {apiStatus === 'demo_fallback' && (
              <span className="font-mono text-[11px] hidden sm:inline-flex items-center gap-1.5 text-amber-600 dark:text-amber-400 font-medium">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Demo Mode (Local Fallback)
              </span>
            )}
            {apiStatus === 'error' && (
              <div className="flex items-center gap-2">
                <span className="font-mono text-[11px] inline-flex items-center gap-1.5 text-red-500 font-medium">
                  <span className="w-2 h-2 rounded-full bg-red-500" /> API Unavailable
                </span>
                {onRetryLoad && (
                  <button onClick={onRetryLoad} className="px-2 py-0.5 rounded bg-red-100 dark:bg-red-950 text-red-600 dark:text-red-300 text-[10px] font-semibold hover:bg-red-200 transition-colors">
                    Retry
                  </button>
                )}
              </div>
            )}
          </div>

          {/* Subheader: Window Controls, View Switcher & Action */}
          <div className="px-4 py-3 sm:px-6 bg-slate-50 dark:bg-slate-925 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* View Switcher */}
            <div className="flex items-center bg-slate-200/80 dark:bg-slate-800 p-1 rounded-xl">
              <button
                onClick={() => setActiveView('kanban')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'kanban'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <Kanban className="w-3.5 h-3.5" />
                <span>Kanban</span>
              </button>
              <button
                onClick={() => setActiveView('table')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'table'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <TableIcon className="w-3.5 h-3.5" />
                <span>Table</span>
              </button>
              <button
                onClick={() => setActiveView('analytics')}
                className={`flex items-center gap-1.5 px-3 py-1 text-xs font-semibold rounded-lg transition-all ${
                  activeView === 'analytics'
                    ? 'bg-white dark:bg-slate-900 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                <BarChart3 className="w-3.5 h-3.5" />
                <span>Funnel</span>
              </button>
            </div>

            {/* Quick Action Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Opportunity</span>
            </button>
          </div>

          {/* Stage Filter Chips & Search */}
          <div className="p-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Stage Filter Badges */}
            <div className="flex flex-wrap items-center gap-2 text-xs">
              <button
                onClick={() => setSelectedStageFilter('all')}
                className={`px-3 py-1.5 rounded-lg font-medium transition-all ${
                  selectedStageFilter === 'all'
                    ? 'bg-slate-900 dark:bg-white text-white dark:text-slate-900'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                }`}
              >
                All ({stageCounts.total})
              </button>
              <button
                onClick={() => setSelectedStageFilter('interview')}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  selectedStageFilter === 'interview'
                    ? 'bg-amber-500 text-slate-950 font-bold'
                    : 'bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-amber-400" />
                <span>Interviews ({stageCounts.interview})</span>
              </button>
              <button
                onClick={() => setSelectedStageFilter('offer')}
                className={`px-3 py-1.5 rounded-lg font-medium flex items-center gap-1.5 transition-all ${
                  selectedStageFilter === 'offer'
                    ? 'bg-emerald-500 text-slate-950 font-bold'
                    : 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hover:bg-emerald-500/20'
                }`}
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>Offers ({stageCounts.offer})</span>
              </button>
            </div>

            {/* Search Filter */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by company, role, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* WORKSPACE LOADING / ERROR / CONTENT AREA */}
          {isLoading ? (
            <div className="p-12 text-center flex flex-col items-center justify-center min-h-[420px] space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
              <div className="w-10 h-10 border-4 border-brand-500 border-t-transparent rounded-full animate-spin" />
              <div className="text-sm font-semibold text-slate-700 dark:text-slate-300">Loading your pipeline workspace...</div>
              <div className="text-xs text-slate-400 font-mono">Connecting to Express REST API</div>
            </div>
          ) : apiStatus === 'error' && applications.length === 0 ? (
            <div className="p-12 text-center flex flex-col items-center justify-center min-h-[420px] space-y-4 bg-slate-50/50 dark:bg-slate-950/50">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center font-bold text-xl">!</div>
              <div className="text-base font-bold text-slate-900 dark:text-white">Unable to connect to HireFlow API</div>
              <div className="text-xs text-slate-500 max-w-sm leading-relaxed">
                The demo workspace could not reach its backend REST API. Ensure the backend server is running locally.
              </div>
              {onRetryLoad && (
                <button 
                  onClick={onRetryLoad} 
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-all"
                >
                  Retry Connection
                </button>
              )}
            </div>
          ) : (
            <>
              {/* VIEW 1: KANBAN BOARD */}
              {activeView === 'kanban' && (
                <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/50 min-h-[460px]">
                  
                  {/* Mobile Stage Selector */}
                  <div className="md:hidden flex overflow-x-auto pb-3 mb-4 gap-2 border-b border-slate-200 dark:border-slate-800">
                    {STAGES.map((s) => (
                      <button
                        key={s.id}
                        onClick={() => setMobileActiveStage(s.id)}
                        className={`px-3 py-1.5 text-xs font-semibold rounded-xl whitespace-nowrap transition-all ${
                          mobileActiveStage === s.id
                            ? 'bg-brand-600 text-white shadow-sm'
                            : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-400'
                        }`}
                      >
                    {s.label} ({applications.filter(j => j.stage === s.id).length})
                  </button>
                ))}
              </div>

              {/* Grid Layout */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {STAGES.map((stage) => {
                  const stageJobs = filteredJobs.filter(j => j.stage === stage.id);
                  const isMobileVisible = mobileActiveStage === stage.id;

                  return (
                    <div 
                      key={stage.id}
                      className={`flex flex-col bg-slate-100/70 dark:bg-slate-900/80 rounded-2xl p-3 border border-slate-200 dark:border-slate-800/80 min-h-[380px] ${
                        !isMobileVisible ? 'hidden md:flex' : 'flex'
                      }`}
                    >
                      {/* Column Header */}
                      <div className="flex items-center justify-between px-2 py-1.5 mb-2">
                        <div className="flex items-center gap-2">
                          <span className={`w-2.5 h-2.5 rounded-full ${stage.dotColor}`} />
                          <h3 className="text-xs font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
                            {stage.label}
                          </h3>
                        </div>
                        <span className="text-xs font-mono px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-semibold">
                          {stageJobs.length}
                        </span>
                      </div>

                      {/* Cards Container */}
                      <div className="space-y-3 flex-1 overflow-y-auto max-h-[500px] pr-1">
                        {stageJobs.map((job) => (
                          <div
                            key={job.id}
                            onClick={() => onSelectJob(job)}
                            className="group p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-500 cursor-pointer transition-all duration-150 transform hover:-translate-y-0.5"
                          >
                            {/* Card Top: Company & Role */}
                            <div className="flex items-start gap-2.5">
                              <div 
                                className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0"
                                style={{ backgroundColor: job.color }}
                              >
                                {job.initials}
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors truncate">
                                  {job.company}
                                </h4>
                                <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium truncate">
                                  {job.role}
                                </p>
                              </div>
                            </div>

                            {/* Next Action Context */}
                            {job.nextAction && (
                              <div className="mt-2.5 px-2 py-1 rounded bg-slate-50 dark:bg-slate-900/60 border border-slate-100 dark:border-slate-800 text-[10px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                                <Clock className="w-3 h-3 text-brand-500 shrink-0 mt-0.5" />
                                <span className="line-clamp-2 leading-tight">{job.nextAction}</span>
                              </div>
                            )}

                            {/* Middle: Salary & Location */}
                            <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                              <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                                {job.salary}
                              </span>
                              <span className="truncate max-w-[90px] text-right">
                                {job.location.split(' ')[0]}
                              </span>
                            </div>

                            {/* Bottom: Micro-Action (Advance Stage) */}
                            <div className="mt-2 flex items-center justify-between text-[10px]">
                              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium">
                                #{job.tags[0] || 'Tech'}
                              </span>
                              
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAdvanceStage(job.id);
                                }}
                                title="Advance to next stage"
                                className="px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950 font-medium flex items-center gap-0.5 transition-all"
                              >
                                <span>Advance</span>
                                <ChevronRight className="w-3 h-3" />
                              </button>
                            </div>
                          </div>
                        ))}

                        {stageJobs.length === 0 && (
                          <div className="p-6 text-center rounded-xl border border-dashed border-slate-200 dark:border-slate-800 text-xs text-slate-400">
                            No applications in this stage
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* VIEW 2: DENSE DATA TABLE */}
          {activeView === 'table' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
                <thead className="bg-slate-50 dark:bg-slate-925 text-[11px] font-semibold text-slate-400 uppercase tracking-wider border-b border-slate-200 dark:border-slate-800">
                  <tr>
                    <th className="py-3 px-4">Company</th>
                    <th className="py-3 px-4">Role</th>
                    <th className="py-3 px-4">Stage</th>
                    <th className="py-3 px-4">Compensation</th>
                    <th className="py-3 px-4">Next Action / Context</th>
                    <th className="py-3 px-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800/60 bg-white dark:bg-slate-900">
                  {filteredJobs.map((job) => (
                    <tr 
                      key={job.id} 
                      onClick={() => onSelectJob(job)}
                      className="hover:bg-slate-50 dark:hover:bg-slate-800/50 cursor-pointer transition-colors"
                    >
                      <td className="py-3.5 px-4 font-bold text-slate-900 dark:text-white flex items-center gap-2.5">
                        <div 
                          className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0"
                          style={{ backgroundColor: job.color }}
                        >
                          {job.initials}
                        </div>
                        <span>{job.company}</span>
                      </td>
                      <td className="py-3.5 px-4 font-medium">{job.role}</td>
                      <td className="py-3.5 px-4">
                        <span className={`px-2.5 py-1 rounded-md text-[11px] font-semibold capitalize ${
                          job.stage === 'offer' ? 'bg-emerald-500/10 text-emerald-500' :
                          job.stage === 'interview' ? 'bg-amber-500/10 text-amber-500' :
                          job.stage === 'applied' ? 'bg-blue-500/10 text-blue-500' :
                          'bg-slate-500/10 text-slate-400'
                        }`}>
                          {job.stage}
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono font-medium">{job.salary}</td>
                      <td className="py-3.5 px-4 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                        {job.nextAction || job.round}
                      </td>
                      <td className="py-3.5 px-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            onAdvanceStage(job.id);
                          }}
                          className="px-2.5 py-1 text-xs font-semibold rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-brand-500 hover:text-white transition-all"
                        >
                          Advance →
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* VIEW 3: FUNNEL ANALYTICS */}
          {activeView === 'analytics' && (
            <div className="p-6 bg-slate-50/50 dark:bg-slate-950/50 space-y-6">
              {/* Next Action Insight Banner */}
              {urgentJob && (
                <div className="p-4 rounded-2xl bg-brand-500/10 border border-brand-500/20 flex flex-wrap items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-brand-600 text-white shrink-0">
                      <Clock className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold uppercase tracking-wider text-brand-600 dark:text-brand-400">
                        Next Action Focus &bull; {urgentJob.company}
                      </div>
                      <div className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-0.5">
                        {urgentJob.nextAction}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => onSelectJob(urgentJob)}
                    className="px-3 py-1.5 rounded-xl bg-brand-600 hover:bg-brand-500 text-white text-xs font-semibold shadow-sm transition-colors"
                  >
                    Inspect Round Debrief →
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Interview Conversion</span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {Math.round((stageCounts.interview / Math.max(stageCounts.total, 1)) * 100)}%
                  </div>
                  <p className="text-xs text-emerald-500 mt-1">{stageCounts.interview} active technical loops</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Offers on the Table</span>
                  <div className="text-2xl font-extrabold text-emerald-500 mt-1">
                    {stageCounts.offer} Active Offer
                  </div>
                  <p className="text-xs text-slate-400 mt-1 truncate">{topOfferText}</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Average Compensation Target</span>
                  <div className="text-2xl font-extrabold text-brand-500 mt-1 font-mono">
                    {avgSalaryFormatted}
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Across {stageCounts.total} tracked roles</p>
                </div>
              </div>

              {/* Distribution bars */}
              <div className="p-6 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-4">Pipeline Volume Distribution</h4>
                <div className="space-y-3">
                  {STAGES.map((s) => {
                    const count = applications.filter(j => j.stage === s.id).length;
                    const percent = Math.round((count / Math.max(applications.length, 1)) * 100);
                    return (
                      <div key={s.id}>
                        <div className="flex justify-between text-xs font-semibold mb-1">
                          <span className="text-slate-700 dark:text-slate-300">{s.label}</span>
                          <span className="text-slate-500 font-mono">{count} roles ({percent}%)</span>
                        </div>
                        <div className="h-2.5 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-300 rounded-full ${
                              s.id === 'offer' ? 'bg-emerald-500' :
                              s.id === 'interview' ? 'bg-amber-500' :
                              s.id === 'applied' ? 'bg-blue-500' : 'bg-slate-500'
                            }`}
                            style={{ width: `${Math.max(percent, 8)}%` }}
                          />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
          </>
          )}

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-925 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>State updates automatically on click</span>
            <span className="font-mono text-[11px] hidden sm:inline">Press {shortcutLabel} for command palette</span>
          </div>

        </div>

      </div>

      {/* Add Opportunity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add Opportunity</h3>
            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-500 text-xs font-semibold">
                {formError}
              </div>
            )}
            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Northstar Labs, Orbit Systems"
                  maxLength={80}
                  value={newCompany}
                  onChange={e => { setNewCompany(e.target.value); setFormError(null); }}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Role Title</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  maxLength={80}
                  value={newRole}
                  onChange={e => { setNewRole(e.target.value); setFormError(null); }}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Expected Salary</label>
                <input
                  type="text"
                  value={newSalary}
                  onChange={e => setNewSalary(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Initial Stage</label>
                <select
                  value={newStage}
                  onChange={e => setNewStage(e.target.value)}
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                >
                  <option value="wishlist">Wishlist</option>
                  <option value="applied">Applied</option>
                  <option value="interview">Interviewing</option>
                  <option value="offer">Offer Received</option>
                </select>
              </div>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl bg-brand-600 hover:bg-brand-500 text-white font-medium shadow-sm"
                >
                  Add Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
