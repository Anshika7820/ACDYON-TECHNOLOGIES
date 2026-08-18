import React, { useState, useEffect } from 'react';
import { Search, Moon, Sun, LayoutDashboard, Sparkles, X, ArrowRight, Kanban, ListFilter } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function CommandPalette({ isOpen, onClose, onSelectJob, applications, onTriggerEasterEgg }) {
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
        className="w-full max-w-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl shadow-2xl overflow-hidden animate-slide-up text-slate-900 dark:text-slate-100"
        onClick={e => e.stopPropagation()}
      >
        {/* Input */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-200 dark:border-slate-800">
          <Search className="w-5 h-5 text-slate-400 mr-3 shrink-0" />
          <input
            type="text"
            placeholder="Search applications, jump to sections, toggle theme..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
            className="w-full bg-transparent text-sm focus:outline-none text-slate-900 dark:text-slate-100 placeholder-slate-400"
          />
          <button 
            onClick={onClose}
            className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-md"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results / Commands */}
        <div className="max-h-80 overflow-y-auto p-2 space-y-1 text-sm">
          {/* Quick Actions */}
          <div className="px-3 py-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
            Actions & Navigation
          </div>

          <button
            onClick={() => handleAction(() => {
              const el = document.getElementById('product-demo');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            })}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Kanban className="w-4 h-4 text-brand-500" />
              <span>Jump to Interactive Product Demo</span>
            </div>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </button>

          <button
            onClick={() => handleAction(toggleTheme)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-500" />}
              <span>Toggle Color Theme (Current: {theme === 'dark' ? 'Dark' : 'Light'})</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Light / Dark</span>
          </button>

          <button
            onClick={() => handleAction(onTriggerEasterEgg)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-4 h-4 text-purple-400" />
              <span>Unlock Bonus Round Easter Egg</span>
            </div>
            <span className="text-xs font-mono text-slate-400">Bonus</span>
          </button>

          {/* Job Applications */}
          {filteredJobs.length > 0 && (
            <>
              <div className="px-3 pt-3 pb-1.5 text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider border-t border-slate-100 dark:border-slate-800/80">
                Tracked Applications ({filteredJobs.length})
              </div>
              {filteredJobs.map(job => (
                <button
                  key={job.id}
                  onClick={() => handleAction(() => onSelectJob(job))}
                  className="w-full flex items-center justify-between px-3 py-2 rounded-xl text-left hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div 
                      className="w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold text-white shrink-0"
                      style={{ backgroundColor: job.color }}
                    >
                      {job.initials}
                    </div>
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">{job.company}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400">{job.role}</div>
                    </div>
                  </div>
                  <span className="text-xs font-mono px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 capitalize">
                    {job.stage}
                  </span>
                </button>
              ))}
            </>
          )}

          {filteredJobs.length === 0 && query && (
            <div className="p-4 text-center text-sm text-slate-500">
              No matching applications or actions found.
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="px-4 py-2 bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="px-1.5 py-0.5 rounded bg-slate-200 dark:bg-slate-800 font-mono text-[10px]">ESC</span> to close
          </div>
          <span className="font-mono text-[10px]">HireFlow Quick Launcher</span>
        </div>
      </div>
    </div>
  );
}
