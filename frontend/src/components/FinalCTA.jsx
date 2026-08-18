import React from 'react';
import { ArrowRight, Sparkles, Terminal, CheckCircle2 } from 'lucide-react';

export default function FinalCTA({ onOpenCommand }) {
  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="relative rounded-3xl bg-gradient-to-br from-brand-900 via-slate-900 to-slate-950 p-8 sm:p-12 md:p-16 border border-brand-500/30 shadow-glow-lg text-center overflow-hidden">
          
          {/* Subtle Background Glows */}
          <div className="absolute -top-24 -left-24 w-72 h-72 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-3xl mx-auto space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold bg-brand-500/20 text-brand-300 border border-brand-500/40">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Ready for Your Next Role?</span>
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Take complete control of your application pipeline today.
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto">
              Test the live interactive board above or open the command menu to explore keyboard shortcuts.
            </p>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <a
                href="#product-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-bold rounded-2xl bg-white text-slate-900 hover:bg-slate-100 shadow-lg hover:scale-105 transition-all"
              >
                <span>Launch Interactive Demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCommand}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 text-base font-medium rounded-2xl bg-slate-800/80 hover:bg-slate-800 text-white border border-slate-700 transition-all"
              >
                <Terminal className="w-4 h-4 text-brand-400" />
                <span>Command Menu (⌘K)</span>
              </button>
            </div>

            <div className="pt-4 flex flex-wrap items-center justify-center gap-6 text-xs text-slate-400">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Zero Tracking Cookies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>Instant In-Browser Storage</span>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
