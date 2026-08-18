import React from 'react';
import { Check, X, Minus, HelpCircle, Sparkles } from 'lucide-react';

export default function Comparison() {
  const criteria = [
    {
      feature: 'Setup & Ready in Under 30s',
      hireflow: true,
      spreadsheet: false,
      ats: false,
      note: 'Instant local sandbox without tedious formula or template configuration.'
    },
    {
      feature: 'Dedicated Interview Stage Kanban',
      hireflow: true,
      spreadsheet: false,
      ats: true,
      note: 'Visual progression that matches real engineering recruitment loops.'
    },
    {
      feature: 'Per-Round Notes & Debrief Storage',
      hireflow: true,
      spreadsheet: false,
      ats: true,
      note: 'Keeps take-home code, interviewer feedback, and dates organized in one card.'
    },
    {
      feature: '100% Client-Side Privacy (No Telemetry)',
      hireflow: true,
      spreadsheet: true,
      ats: false,
      note: 'Your data stays on your machine. We never sell candidate search data.'
    },
    {
      feature: 'Mobile-Optimized Touch Layout (390px)',
      hireflow: true,
      spreadsheet: false,
      ats: false,
      note: 'Smooth mobile review on your phone between interview calls without horizontal zooming.'
    },
    {
      feature: 'One-Click JSON/CSV Export',
      hireflow: true,
      spreadsheet: true,
      ats: false,
      note: 'Zero proprietary lock-in. Back up or migrate your records anytime.'
    }
  ];

  return (
    <section id="comparison" className="py-16 md:py-24 bg-slate-50/60 dark:bg-slate-925/40 border-y border-slate-200/80 dark:border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Honest Evaluation</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Why use HireFlow instead of a spreadsheet?
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            Spreadsheets are flexible but break down when you have 20 concurrent interviews. Generic career platforms are built for recruiters, not candidates.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-slate-100/70 dark:bg-slate-850/80 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 uppercase text-[11px] tracking-wider font-semibold">
                <tr>
                  <th className="py-4 px-4 sm:px-6 min-w-[200px]">Core Workflow Capability</th>
                  <th className="py-4 px-4 text-center min-w-[120px] bg-brand-500/10 dark:bg-brand-500/20 text-brand-600 dark:text-brand-300 font-bold">
                    HireFlow
                  </th>
                  <th className="py-4 px-4 text-center min-w-[120px]">
                    Messy Spreadsheet
                  </th>
                  <th className="py-4 px-4 text-center min-w-[120px]">
                    Corporate ATS
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800 text-slate-700 dark:text-slate-300">
                {criteria.map((item, idx) => (
                  <tr key={idx} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/30 transition-colors">
                    <td className="py-4 px-4 sm:px-6">
                      <div className="font-semibold text-slate-900 dark:text-white">{item.feature}</div>
                      <div className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{item.note}</div>
                    </td>
                    
                    {/* HireFlow Column */}
                    <td className="py-4 px-4 text-center bg-brand-500/5 dark:bg-brand-500/10 font-bold">
                      <div className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-brand-600 text-white shadow-sm">
                        <Check className="w-4 h-4" />
                      </div>
                    </td>

                    {/* Spreadsheet Column */}
                    <td className="py-4 px-4 text-center text-slate-400">
                      {item.spreadsheet ? (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </td>

                    {/* Generic ATS Column */}
                    <td className="py-4 px-4 text-center text-slate-400">
                      {item.ats ? (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                          <Check className="w-3.5 h-3.5" />
                        </div>
                      ) : (
                        <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-400">
                          <X className="w-3.5 h-3.5" />
                        </div>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>
    </section>
  );
}
