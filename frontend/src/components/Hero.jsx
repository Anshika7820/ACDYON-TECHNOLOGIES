import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

export default function Hero({ onOpenCommand }) {
  return (
    <section className="relative pt-12 pb-12 md:pt-20 md:pb-16 overflow-hidden">
      
      {/* Subtle background gradient glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[300px] bg-brand-500/15 dark:bg-brand-500/20 blur-[100px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-3xl mx-auto space-y-6">
          
          {/* Subtle Tag */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300">
            <span className="w-2 h-2 rounded-full bg-brand-500" />
            <span>Job Application Workspace</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Your job search,{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              finally under control.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto leading-relaxed">
            Track applications, interview stages, and next steps in one focused workspace. No messy spreadsheets, no lost context.
          </p>

          {/* Call-to-Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="#product-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-sm transition-all"
            >
              <span>Explore the demo</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCommand}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <Terminal className="w-4 h-4 text-brand-500" />
              <span>Quick Command Bar</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Honest Disclosure */}
          <p className="text-xs text-slate-400 dark:text-slate-500 pt-2 font-mono">
            Interactive demo &bull; Fictional sample data &bull; No signup required
          </p>

        </div>
      </div>
    </section>
  );
}
