import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, X, ArrowRight, Kanban } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CommandPalette({ isOpen, onClose, onSelectJob, applications }) {
  const [query, setQuery] = useState('');
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        if (isOpen) onClose();
        else onClose(false);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredJobs = applications.filter(job => 
    job.company.toLowerCase().includes(query.toLowerCase()) ||
    job.role.toLowerCase().includes(query.toLowerCase()) ||
    job.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );

  const handleAction = (callback) => {
    callback();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4 bg-slate-950/70 backdrop-blur-sm animate-fade-in">
      <div 
        className="w-full max-w-lg bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden text-slate-900 dark:text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center px-4 py-3 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-4 h-4 text-slate-400 mr-2.5 shrink-0" />
          <input
            type="text"
            placeholder="Search applications, jump to sections, toggle theme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-xs sm:text-sm focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
          />
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-72 overflow-y-auto p-2 space-y-1 text-xs sm:text-sm">
          <div className="px-3 py-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Quick Actions
          </div>

          <button
            onClick={() => handleAction(() => {
              const el = document.getElementById('product-demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              <Kanban className="w-4 h-4 text-brand-500" />
              <span>Jump to Interactive Pipeline</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => handleAction(toggleTheme)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              <span>Toggle Theme ({theme === 'dark' ? 'Dark' : 'Light'})</span>
            </div>
            <span className="text-[11px] font-mono text-slate-400">Theme</span>
          </button>

          {/* Job Applications */}
          {filteredJobs.length > 0 && (
            <>
              <div className="px-3 pt-2.5 pb-1 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-t border-slate-100 dark:border-slate-800">
                Tracked Applications ({filteredJobs.length})
              </div>
              {filteredJobs.map(job => (
                <button
                  key={job.id}
                  onClick={() => handleAction(() => onSelectJob(job))}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div 
                      className="w-5 h-5 rounded-md flex items-center justify-center text-[10px] font-bold text-white shrink-0"
                      style={{ backgroundColor: job.color }}
                    >
                      {job.initials}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{job.company}</div>
                      <div className="text-[11px] text-slate-500 dark:text-slate-400">{job.role}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                    {job.stage}
                  </span>
                </button>
              ))}
            </>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <span><kbd className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</kbd> to close</span>
          <span className="font-mono text-[10px]">HireFlow</span>
        </div>
      </div>
    </div>
  );
}
