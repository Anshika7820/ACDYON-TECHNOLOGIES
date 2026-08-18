import React, { useEffect } from 'react';
import { X, Calendar, MapPin, DollarSign, Clock, FileText, Trash2 } from 'lucide-react';
import { STAGES } from '../data/mockJobs';

export default function JobDetailModal({ job, isOpen, onClose, onUpdateStage, onDeleteJob }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen || !job) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-sm animate-fade-in">
      <div 
        className="relative w-full max-w-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100 max-h-[90vh] flex flex-col"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-5 sm:p-6 border-b border-slate-200 dark:border-slate-800 flex items-start justify-between bg-slate-50/50 dark:bg-slate-950/40">
          <div className="flex items-start gap-3.5">
            <div 
              className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold text-white shadow-sm shrink-0"
              style={{ backgroundColor: job.color }}
            >
              {job.initials}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">{job.role}</h2>
              <p className="text-xs font-semibold text-brand-600 dark:text-brand-400 mt-0.5">{job.company}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close modal"
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Content */}
        <div className="p-5 sm:p-6 overflow-y-auto space-y-5 flex-1">
          {/* Status Selector */}
          <div className="p-3 bg-slate-100 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/60 flex flex-wrap items-center justify-between gap-2.5">
            <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              Stage:
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
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quick Metrics */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <DollarSign className="w-3 h-3 text-emerald-500" />
                <span>Comp</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 truncate">
                {job.salary}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <MapPin className="w-3 h-3 text-blue-500" />
                <span>Location</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5 truncate">
                {job.location}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Calendar className="w-3 h-3 text-amber-500" />
                <span>Applied</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                {job.appliedDate}
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
                <Clock className="w-3 h-3 text-purple-500" />
                <span>Activity</span>
              </div>
              <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">
                {job.lastActivity}
              </div>
            </div>
          </div>

          {/* Next Action Context */}
          {job.nextAction && (
            <div className="p-3.5 rounded-xl bg-brand-500/5 dark:bg-brand-500/10 border border-brand-500/20">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-600 dark:text-brand-400 uppercase tracking-wider">
                <Clock className="w-3.5 h-3.5" />
                <span>Upcoming Next Step</span>
              </div>
              <p className="text-xs font-medium text-slate-800 dark:text-slate-200 mt-1">
                {job.nextAction}
              </p>
            </div>
          )}

          {/* Preparation Notes */}
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-800">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
              <FileText className="w-3.5 h-3.5" />
              <span>Notes & Interview Debrief</span>
            </div>
            <p className="text-xs text-slate-700 dark:text-slate-300 mt-1.5 leading-relaxed">
              {job.notes}
            </p>
          </div>

          {/* Timeline */}
          {job.timeline && job.timeline.length > 0 && (
            <div>
              <h4 className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2.5">
                Stage Timeline
              </h4>
              <div className="space-y-2.5 pl-2 border-l-2 border-slate-200 dark:border-slate-800">
                {job.timeline.map((step, idx) => (
                  <div key={idx} className="relative pl-3.5">
                    <div className="absolute -left-[19px] top-1 w-2 h-2 rounded-full bg-brand-500 ring-4 ring-white dark:ring-slate-900" />
                    <div className="text-[11px] font-mono text-brand-600 dark:text-brand-400 font-semibold">{step.date}</div>
                    <div className="text-xs text-slate-700 dark:text-slate-300">{step.event}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-3.5 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40 flex items-center justify-between text-xs text-slate-400">
          <button
            onClick={() => {
              if (onDeleteJob) {
                onDeleteJob(job.id);
                onClose();
              }
            }}
            className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition-colors"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Delete Card</span>
          </button>
          <button
            onClick={onClose}
            className="px-4 py-1.5 text-xs font-semibold rounded-xl bg-slate-900 dark:bg-white text-white dark:text-slate-900 hover:opacity-90 transition-opacity"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  );
}
