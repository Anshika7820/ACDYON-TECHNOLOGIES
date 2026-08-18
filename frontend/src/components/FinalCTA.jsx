import React from 'react';
import { ArrowRight, Terminal } from 'lucide-react';

export default function FinalCTA({ onOpenCommand }) {
  return (
    <section className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="rounded-2xl sm:rounded-3xl bg-slate-900 text-white p-8 sm:p-12 md:p-14 border border-slate-800 text-center relative overflow-hidden">
          
          {/* Subtle glow */}
          <div className="absolute -top-20 -left-20 w-60 h-60 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -right-20 w-60 h-60 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 max-w-2xl mx-auto space-y-5">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold tracking-tight">
              Ready to take control of your search?
            </h2>

            <p className="text-sm sm:text-base text-slate-300">
              Test the interactive demo above or open the command bar to explore keyboard shortcuts.
            </p>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center gap-3">
              <a
                href="#product-demo"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold rounded-xl bg-white text-slate-900 hover:bg-slate-100 shadow-sm transition-all"
              >
                <span>Explore the demo</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <button
                onClick={onOpenCommand}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-medium rounded-xl bg-slate-800 hover:bg-slate-750 text-white border border-slate-700 transition-all"
              >
                <Terminal className="w-4 h-4 text-brand-400" />
                <span>Command Menu (⌘K)</span>
              </button>
            </div>

            <p className="text-xs text-slate-400 pt-2 font-mono">
              Fictional sample data &bull; No registration required
            </p>
          </div>

        </div>

      </div>
    </section>
  );
}
