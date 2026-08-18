import React from 'react';
import { Kanban, Sparkles } from 'lucide-react';

export default function Footer({ onTriggerEasterEgg }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-10 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pb-6 border-b border-slate-100 dark:border-slate-850">
          {/* Brand Info */}
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
              <div className="w-6 h-6 rounded-lg bg-brand-600 flex items-center justify-center text-white">
                <Kanban className="w-3.5 h-3.5" />
              </div>
              <span className="tracking-tight">HireFlow</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed max-w-sm">
              A focused, visual job application command center designed for software engineers and technical builders.
            </p>
          </div>

          {/* Links: Product */}
          <div className="space-y-2">
            <div className="text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Navigation
            </div>
            <ul className="space-y-1.5">
              <li><a href="#product-demo" className="hover:text-brand-600 dark:hover:text-white transition-colors">Pipeline Demo</a></li>
              <li><a href="#benefits" className="hover:text-brand-600 dark:hover:text-white transition-colors">Key Benefits</a></li>
              <li><a href="#how-it-works" className="hover:text-brand-600 dark:hover:text-white transition-colors">How It Works</a></li>
            </ul>
          </div>

          {/* Philosophy */}
          <div className="space-y-2">
            <div className="text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Design Principles
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Tested for 390px mobile screens and 1440px desktop displays. Built with React 18, Vite, and Tailwind CSS.
            </p>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-slate-500 dark:text-slate-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} HireFlow. All rights reserved.
          </div>

          <div>
            <button
              onClick={onTriggerEasterEgg}
              className="inline-flex items-center gap-1 text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-colors font-mono"
            >
              <Sparkles className="w-3 h-3" />
              <span>Hint: Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
