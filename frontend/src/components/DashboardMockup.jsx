import React, { useState } from 'react';
import { 
  Kanban, 
  Table as TableIcon, 
  BarChart3, 
  Plus, 
  Search, 
  SlidersHorizontal, 
  ArrowUpRight, 
  ChevronRight, 
  CheckCircle2, 
  Building2, 
  DollarSign, 
  Clock, 
  Sparkles,
  MapPin,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { STAGES } from '../data/mockJobs';

export default function DashboardMockup({ 
  applications, 
  onSelectJob, 
  onAdvanceStage, 
  onAddJob 
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

  // Dynamic counts
  const stageCounts = {
    wishlist: applications.filter(j => j.stage === 'wishlist').length,
    applied: applications.filter(j => j.stage === 'applied').length,
    interview: applications.filter(j => j.stage === 'interview').length,
    offer: applications.filter(j => j.stage === 'offer').length,
    total: applications.length
  };

  const handleCreateJob = (e) => {
    e.preventDefault();
    if (!newCompany.trim() || !newRole.trim()) return;
    
    const colors = ['#6366f1', '#3b82f6', '#10b981', '#f59e0b', '#ec4899', '#8b5cf6'];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    
    const newJobObj = {
      id: `app-${Date.now()}`,
      company: newCompany,
      role: newRole,
      stage: newStage,
      salary: newSalary,
      location: 'Remote',
      appliedDate: new Date().toISOString().split('T')[0],
      lastActivity: 'Just now',
      type: 'Full-time',
      referral: 'Manual Entry',
      round: 'Initial Stage',
      notes: 'Added directly during live product walkthrough.',
      tags: ['Custom', 'Active'],
      color: randomColor,
      initials: newCompany.slice(0, 2).toUpperCase(),
      timeline: [
        { date: 'Today', event: 'Added to HireFlow tracker' }
      ]
    };

    onAddJob(newJobObj);
    setNewCompany('');
    setNewRole('');
    setIsAddModalOpen(false);
  };

  return (
    <section id="product-demo" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-8 md:mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Interactive Live Product Simulator</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            See HireFlow in action right here.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Click any job card to inspect rounds, advance stages, or toggle views. No sign-up required to test the feel.
          </p>
        </div>

        {/* Outer Dashboard Shell */}
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden transition-all">
          
          {/* Top Window Bar */}
          <div className="px-4 py-3 sm:px-6 bg-slate-50 dark:bg-slate-925 border-b border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between gap-4">
            
            {/* Left: Window Controls & Title */}
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
              </div>
              <div className="h-4 w-px bg-slate-200 dark:bg-slate-800 mx-1 hidden sm:block" />
              <span className="text-xs font-mono font-medium text-slate-500 dark:text-slate-400">
                hireflow-workspace / <strong className="text-slate-800 dark:text-slate-200">active_pipeline</strong>
              </span>
            </div>

            {/* Center: View Switcher */}
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
                <span>Analytics</span>
              </button>
            </div>

            {/* Right: Quick Action Button */}
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add Opportunity</span>
            </button>
          </div>

          {/* Subheader: Stage Counter Chips & Search Filter */}
          <div className="p-4 sm:px-6 bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
            
            {/* Live Metric Badges */}
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

            {/* Search Input */}
            <div className="relative min-w-[220px]">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Filter by company, role, or tag..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-1.5 text-xs rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          {/* VIEW 1: KANBAN BOARD */}
          {activeView === 'kanban' && (
            <div className="p-4 sm:p-6 bg-slate-50/50 dark:bg-slate-950/50 min-h-[480px]">
              
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
                    {s.label.split(' ')[0]} ({applications.filter(j => j.stage === s.id).length})
                  </button>
                ))}
              </div>

              {/* Desktop 4-Column Grid / Mobile Single Column */}
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
                      <div className="flex items-center justify-between px-2 py-2 mb-2">
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
                      <div className="space-y-3 flex-1 overflow-y-auto max-h-[520px] pr-1">
                        {stageJobs.map((job) => (
                          <div
                            key={job.id}
                            onClick={() => onSelectJob(job)}
                            className="group p-3.5 rounded-xl bg-white dark:bg-slate-850 border border-slate-200 dark:border-slate-750 shadow-sm hover:shadow-md hover:border-brand-400 dark:hover:border-brand-500 cursor-pointer transition-all duration-150 transform hover:-translate-y-0.5"
                          >
                            {/* Card Top: Company & Badge */}
                            <div className="flex items-start justify-between gap-2">
                              <div className="flex items-center gap-2.5">
                                <div 
                                  className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold text-white shadow-sm shrink-0"
                                  style={{ backgroundColor: job.color }}
                                >
                                  {job.initials}
                                </div>
                                <div>
                                  <h4 className="text-xs font-bold text-slate-900 dark:text-white group-hover:text-brand-500 transition-colors">
                                    {job.company}
                                  </h4>
                                  <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium line-clamp-1">
                                    {job.role}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Middle: Salary & Location */}
                            <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                              <span className="font-semibold text-slate-700 dark:text-slate-300 font-mono">
                                {job.salary}
                              </span>
                              <span className="truncate max-w-[100px] text-right">
                                {job.location.split(' ')[0]}
                              </span>
                            </div>

                            {/* Bottom Context: Round / Tag */}
                            <div className="mt-2 flex items-center justify-between text-[10px]">
                              <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-medium truncate max-w-[140px]">
                                {job.tags[0] || 'Engineering'}
                              </span>
                              
                              {/* Advance Stage Micro-Action */}
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  onAdvanceStage(job.id);
                                }}
                                title="Advance to next stage"
                                className="opacity-80 group-hover:opacity-100 px-1.5 py-0.5 rounded text-brand-600 dark:text-brand-400 hover:bg-brand-50 dark:hover:bg-brand-950 font-medium flex items-center gap-0.5 transition-all"
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
                    <th className="py-3 px-4">Location</th>
                    <th className="py-3 px-4">Current Round Context</th>
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
                      <td className="py-3.5 px-4">{job.location}</td>
                      <td className="py-3.5 px-4 text-slate-500 dark:text-slate-400 max-w-xs truncate">
                        {job.round}
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
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Interview Conversion Rate</span>
                  <div className="text-2xl font-extrabold text-slate-900 dark:text-white mt-1">
                    {Math.round((stageCounts.interview / Math.max(stageCounts.total, 1)) * 100)}%
                  </div>
                  <p className="text-xs text-emerald-500 mt-1">3 active technical loops running</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Offers on the Table</span>
                  <div className="text-2xl font-extrabold text-emerald-500 mt-1">
                    {stageCounts.offer} Active Offer
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Linear ($180k - $210k + Equity)</p>
                </div>
                <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800">
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Target Compensation Average</span>
                  <div className="text-2xl font-extrabold text-brand-500 mt-1 font-mono">
                    $195,000 / yr
                  </div>
                  <p className="text-xs text-slate-400 mt-1">Calculated across 8 active roles</p>
                </div>
              </div>

              {/* Visual Funnel Bars */}
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
                        <div className="h-3 w-full bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
                          <div 
                            className={`h-full transition-all duration-500 rounded-full ${
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

          {/* Footer Bar */}
          <div className="px-6 py-3 bg-slate-50 dark:bg-slate-925 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>Real-time local state active &bull; Click any card for notes</span>
            </div>
            <span className="font-mono text-[11px] hidden sm:inline">Tip: Press Cmd+K anytime</span>
          </div>

        </div>

      </div>

      {/* Add Opportunity Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm">
          <div className="w-full max-w-md bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-6 shadow-2xl">
            <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-4">Add Test Opportunity</h3>
            <form onSubmit={handleCreateJob} className="space-y-4 text-xs">
              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Company Name</label>
                <input
                  type="text"
                  placeholder="e.g. Stripe, GitHub, Figma"
                  value={newCompany}
                  onChange={e => setNewCompany(e.target.value)}
                  required
                  className="w-full p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100"
                />
              </div>

              <div>
                <label className="block text-slate-700 dark:text-slate-300 font-semibold mb-1">Target Role</label>
                <input
                  type="text"
                  placeholder="e.g. Senior Frontend Engineer"
                  value={newRole}
                  onChange={e => setNewRole(e.target.value)}
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
                  <option value="wishlist">Wishlist / Drafting</option>
                  <option value="applied">Applied / In Review</option>
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
