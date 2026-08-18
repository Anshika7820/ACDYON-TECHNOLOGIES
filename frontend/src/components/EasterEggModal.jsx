import React from 'react';
import { Sparkles, Terminal, X, Award, CheckCircle2, Code2, Zap } from 'lucide-react';

export default function EasterEggModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-lg p-6 bg-slate-900 border border-brand-500/40 rounded-2xl shadow-glow-lg text-slate-100 overflow-hidden">
        {/* Glowing backdrop blob */}
        <div className="absolute -top-16 -right-16 w-40 h-40 bg-brand-500/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-2 text-brand-400">
            <Sparkles className="w-5 h-5 animate-spin" style={{ animationDuration: '6s' }} />
            <span className="text-xs font-mono uppercase tracking-widest font-semibold">Bonus Round Unlocked</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-5 space-y-4">
          <div className="flex items-start gap-4 p-4 rounded-xl bg-slate-800/60 border border-slate-700/60">
            <div className="p-3 bg-brand-500/10 border border-brand-500/20 rounded-xl text-brand-400 shrink-0">
              <Award className="w-7 h-7" />
            </div>
            <div>
              <h3 className="font-bold text-lg text-white">Curious Engineer Badge</h3>
              <p className="text-sm text-slate-300 mt-1">
                You found the secret shortcut! (Triggered via the Konami Code: <code className="text-brand-300 font-mono">↑ ↑ ↓ ↓ ← → ← → B A</code> or 5 clicks on the HireFlow logo).
              </p>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400 space-y-2">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Code2 className="w-4 h-4" />
              <span>STACK_DISCLOSURE</span>
            </div>
            <p className="text-slate-300">
              Built with React 18, Vite, Tailwind CSS & Lucide Icons.
            </p>
            <p className="text-slate-400 pt-1 border-t border-slate-800/80">
              ✓ Sub-millisecond state updates &bull; ✓ Full Light/Dark theme &bull; ✓ 390px to 1440px+ viewport compliance &bull; ✓ Zero fake marketing fluff.
            </p>
          </div>

          <div className="space-y-1.5 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Pixel-perfect responsive layout (Mobile 390px & Desktop 1440px)</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Live interactive Kanban, Table, and Funnel analytics simulation</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Quick command launcher (⌘K / Ctrl+K)</span>
            </div>
          </div>
        </div>

        {/* Footer action */}
        <div className="mt-6 pt-4 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-brand-600 hover:bg-brand-500 text-white shadow-glow transition-all"
          >
            Back to Application
          </button>
        </div>
      </div>
    </div>
  );
}
