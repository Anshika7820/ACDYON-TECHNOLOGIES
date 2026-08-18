import React from 'react';
import { X, Calendar, MapPin, DollarSign, Briefcase, UserCheck, Clock, CheckCircle2, ChevronRight, FileText, ArrowRight } from 'lucide-react';
import { STAGES } from '../data/mockJobs';

export default function JobDetailModal({ job, isOpen, onClose, onUpdateStage }) {
  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-start gap-4">
            <div 
              className="w-12 h-12 rounded-xl flex items-center justify-center text-lg font-bold text-white shadow-md shrink-0"
              style={{ backgroundColor: job.color }}
            >
              {job.initials}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-slate-900 dark:text-white">{job.role}</h2>
              </div>
              <p className="text-sm font-medium text-brand-600 dark:text-brand-400 mt-0.5">{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {/* Status Changer Bar */}
          <div className="p-3.5 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Current Stage:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {STAGES.map((s) => {
                const isActive = job.stage === s.id;
                return (
                  <button
                    key={s.id}
                    onClick={() => onUpdateStage(job.id, s.id)}
                    className={`px-3 py-1 text-xs font-medium rounded-lg transition-all border ${
                      isActive
                        ? 'bg-brand-600 text-white border-brand-600 shadow-sm'
                        : 'bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-brand-400'
                    }`}
                  >
                    {s.label.split(' ')[0]}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <DollarSign className="w-3.5 h-3.5 text-emerald-500" />
                <span>Comp Range</span>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {job.salary}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-blue-500" />
                <span>Location</span>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1 truncate">
                {job.location}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                <span>Applied</span>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {job.appliedDate}
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3.5 h-3.5 text-purple-500" />
                <span>Last Updated</span>
              </div>
              <div className="text-sm font-semibold text-slate-900 dark:text-white mt-1">
                {job.lastActivity}
              </div>
            </div>
          </div>

          {/* Current Round & Referral Context */}
          <div className="space-y-3">
            <div className="p-4 rounded-xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/20">
              <div className="flex items-center gap-2 text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Current Stage Context</span>
              </div>
              <p className="text-sm font-medium text-slate-800 dark:text-slate-200 mt-1">
                {job.round}
              </p>
              {job.referral && (
                <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400 mt-2">
                  <UserCheck className="w-3.5 h-3.5 text-brand-500" />
                  <span>Channel: {job.referral}</span>
                </div>
              )}
            </div>

            {/* Preparation Notes */}
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                <FileText className="w-4 h-4" />
                <span>Candidate Notes & Takeaways</span>
              </div>
              <p className="text-sm text-slate-700 dark:text-slate-300 mt-2 leading-relaxed">
                {job.notes}
              </p>
            </div>
          </div>

          {/* Activity Timeline */}
          {job.timeline && job.timeline.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                Milestone Timeline
              </h4>
              <div className="space-y-3 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
                {job.timeline.map((step, idx) => (
                  <div key={idx} className="relative pl-4">
                    <div className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-brand-500 ring-4 ring-white dark:ring-slate-900" />
                    <div className="text-xs font-mono text-brand-600 dark:text-brand-400 font-semibold">{step.date}</div>
                    <div className="text-sm text-slate-700 dark:text-slate-300">{step.event}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tags */}
          <div>
            <div className="flex flex-wrap gap-1.5">
              {job.tags.map((tag, i) => (
                <span key={i} className="px-2.5 py-1 text-xs font-medium rounded-md bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
                  #{tag}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <span>ID: <code className="font-mono">{job.id}</code></span>
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            Done Reviewing
          </button>
        </div>
      </div>
    </div>
  );
}
