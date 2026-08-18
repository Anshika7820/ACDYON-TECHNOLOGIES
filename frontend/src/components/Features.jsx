import React from 'react';
import { 
  Kanban, 
  FileCode, 
  DollarSign, 
  DownloadCloud, 
  ShieldCheck, 
  Zap, 
  Sparkles,
  Layers,
  FileCheck2,
  Clock
} from 'lucide-react';

export default function Features() {
  const featureList = [
    {
      icon: Kanban,
      badge: 'Visual Architecture',
      title: 'Unified Kanban & Dense Table Views',
      description: 'Switch between a macro visual pipeline and an Excel-fast dense table. Filter instantly by stage, compensation band, or technology stack.',
      highlight: 'Sub-millisecond filtering with zero layout shift'
    },
    {
      icon: FileCheck2,
      badge: 'Interview Context',
      title: 'Per-Round Notes & System Prep',
      description: 'Never mix up recruiter notes or system architecture take-homes. Store round debriefs, interviewer names, and code sandbox URLs right inside the card.',
      highlight: 'Complete chronological interview history'
    },
    {
      icon: DollarSign,
      badge: 'Offer Modeling',
      title: 'Transparent Compensation Tracking',
      description: 'Track base salaries, equity vesting schedules, and sign-on numbers side-by-side to understand your total expected leverage before signing.',
      highlight: 'Clear apples-to-apples offer comparison'
    },
    {
      icon: DownloadCloud,
      badge: 'Zero Lock-in',
      title: 'Local-First Data Ownership',
      description: 'Your career records belong solely to you. Data is stored directly on your machine with immediate export to standardized JSON or CSV whenever you want.',
      highlight: 'No third-party trackers or telemetry'
    }
  ];

  return (
    <section id="features" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-4">
            <Layers className="w-3.5 h-3.5" />
            <span>Engineered for Maximum Clarity</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Everything you need. Nothing you don't.
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            No convoluted corporate workflows. No recruitment spam. Just high-clarity software built for your individual search.
          </p>
        </div>

        {/* 2x2 Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
          {featureList.map((f, index) => {
            const Icon = f.icon;
            return (
              <div
                key={index}
                className="group p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-xl hover:border-brand-400 dark:hover:border-brand-500/50 transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="p-3 rounded-2xl bg-brand-50 dark:bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-200 dark:border-brand-500/20">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                      {f.badge}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white group-hover:text-brand-600 dark:group-hover:text-brand-400 transition-colors">
                    {f.title}
                  </h3>

                  <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {f.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-slate-100 dark:border-slate-800 flex items-center gap-2 text-xs font-medium text-slate-500 dark:text-slate-400">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <span>{f.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
