import React from 'react';
import { Terminal, X, CheckCircle2, Code2 } from 'lucide-react';

export default function EasterEggModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-fade-in">
      <div className="relative w-full max-w-lg p-6 bg-slate-900 border border-brand-500/30 rounded-2xl shadow-2xl text-slate-100 overflow-hidden">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div className="flex items-center gap-2 text-brand-400">
            <Terminal className="w-4 h-4" />
            <span className="text-xs font-mono uppercase tracking-widest font-semibold">Bonus Round Easter Egg</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="mt-4 space-y-4">
          <div>
            <h3 className="font-bold text-base text-white">Curious Engineer Mode</h3>
            <p className="text-xs text-slate-300 mt-1">
              You found the hidden developer Easter egg via the Konami Code: <code className="text-brand-300 font-mono">↑ ↑ ↓ ↓ ← → ← → B A</code>.
            </p>
          </div>

          <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800 font-mono text-xs text-slate-400 space-y-1.5">
            <div className="flex items-center gap-2 text-emerald-400 font-semibold">
              <Code2 className="w-3.5 h-3.5" />
              <span>FULL STACK ARCHITECTURE</span>
            </div>
            <p className="text-slate-300">
              React 18 + Vite (Frontend) & Node.js + Express REST API (Backend).
            </p>
            <p className="text-slate-400 pt-1 border-t border-slate-800">
              REST endpoints for stage transitions &bull; Responsive at 390px & 1440px &bull; Zero fake social proof.
            </p>
          </div>

          <div className="space-y-1 text-xs text-slate-400">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Interactive stage progression with live backend synchronization</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <span>Complete Dark & Light mode theme system</span>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-5 pt-3 border-t border-slate-800 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold rounded-xl bg-brand-600 hover:bg-brand-500 text-white transition-all"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
