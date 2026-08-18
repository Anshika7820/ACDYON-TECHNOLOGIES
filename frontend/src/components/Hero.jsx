import React from 'react';
import { ArrowRight, ShieldCheck, Zap, Layers, Sparkles, CheckCircle2, ChevronRight, Terminal } from 'lucide-react';

export default function Hero({ onOpenCommand }) {
  return (
    <section className="relative pt-8 pb-12 md:pt-16 md:pb-20 overflow-hidden">
      
      {/* Background glow gradient */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-brand-500/15 dark:bg-brand-500/20 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto space-y-6">
          
          {/* Top Pill Tag */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 shadow-sm animate-fade-in">
            <span className="flex h-2 w-2 rounded-full bg-brand-500 animate-ping" />
            <span className="font-mono">Built for Engineers & Product Builders</span>
            <span className="text-slate-400">&bull;</span>
            <span className="text-brand-600 dark:text-brand-400 font-medium">100% Private</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-[1.12]">
            Turn your scattered job search into a{' '}
            <span className="bg-gradient-to-r from-brand-600 via-indigo-500 to-purple-500 bg-clip-text text-transparent">
              high-clarity pipeline.
            </span>
          </h1>

          {/* Subtitle & Value Proposition */}
          <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Spreadsheets get cluttered. Generic applicant trackers sell your telemetry. 
            HireFlow gives you a clean, keyboard-friendly command center to manage active rounds, interview notes, and compensation targets.
          </p>

          {/* Primary Call-to-Action Buttons */}
          <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3.5">
            <a
              href="#product-demo"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 text-sm sm:text-base font-bold rounded-2xl bg-brand-600 hover:bg-brand-500 text-white shadow-glow hover:shadow-glow-lg transition-all transform hover:-translate-y-0.5"
            >
              <span>Test Interactive Pipeline</span>
              <ArrowRight className="w-4 h-4" />
            </a>

            <button
              onClick={onOpenCommand}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-750 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-slate-700 transition-all"
            >
              <Terminal className="w-4 h-4 text-brand-500" />
              <span>Quick Command Bar</span>
              <kbd className="text-[10px] font-mono px-1.5 py-0.5 bg-white dark:bg-slate-900 rounded border border-slate-200 dark:border-slate-700 text-slate-400">
                ⌘K
              </kbd>
            </button>
          </div>

          {/* Honest Micro-Guarantees */}
          <div className="pt-6 flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-slate-500 dark:text-slate-400">
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Zero Account Wall for Demo</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>Local-First Data Storage</span>
            </div>
            <div className="flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
              <span>One-Click JSON/CSV Export</span>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
