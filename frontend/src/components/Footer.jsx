import React from 'react';
import { Kanban, Sparkles, Terminal, Shield, ArrowUpRight } from 'lucide-react';

export default function Footer({ onTriggerEasterEgg }) {
  return (
    <footer className="border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-950 py-12 text-slate-600 dark:text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-100 dark:border-slate-850">
          {/* Brand Info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-slate-900 dark:text-white font-bold text-base">
              <div className="w-7 h-7 rounded-xl bg-brand-600 flex items-center justify-center text-white shadow-sm">
                <Kanban className="w-4 h-4" />
              </div>
              <span className="tracking-tight">HireFlow</span>
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              The high-clarity job search command center built for software engineers, product designers, and technical leaders.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-600 dark:text-emerald-400 font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>100% Client-Side Private Storage</span>
            </div>
          </div>

          {/* Links Column 1: Product */}
          <div className="space-y-2.5">
            <div className="text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Product
            </div>
            <ul className="space-y-2">
              <li><a href="#product-demo" className="hover:text-brand-600 dark:hover:text-white transition-colors">Pipeline Kanban</a></li>
              <li><a href="#product-demo" className="hover:text-brand-600 dark:hover:text-white transition-colors">Dense Data Table</a></li>
              <li><a href="#features" className="hover:text-brand-600 dark:hover:text-white transition-colors">Round Notes & Debriefs</a></li>
              <li><a href="#comparison" className="hover:text-brand-600 dark:hover:text-white transition-colors">Spreadsheet Comparison</a></li>
            </ul>
          </div>

          {/* Links Column 2: Capabilities */}
          <div className="space-y-2.5">
            <div className="text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Capabilities
            </div>
            <ul className="space-y-2">
              <li><span className="text-slate-500 dark:text-slate-400">Offer & Comp Modeling</span></li>
              <li><span className="text-slate-500 dark:text-slate-400">JSON & CSV Backup Export</span></li>
              <li><span className="text-slate-500 dark:text-slate-400">Command Palette (⌘K)</span></li>
              <li><span className="text-slate-500 dark:text-slate-400">Zero Telemetry Policy</span></li>
            </ul>
          </div>

          {/* Links Column 3: Philosophy */}
          <div className="space-y-2.5">
            <div className="text-slate-900 dark:text-slate-200 font-semibold uppercase tracking-wider text-[11px]">
              Engineering
            </div>
            <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">
              Designed with responsive craft for 390px mobile screens and 1440px desktop displays. Zero bloated dependencies, zero tracking pixels.
            </p>
          </div>
        </div>

        {/* Bottom bar & Easter egg trigger */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 dark:text-slate-400 text-[11px]">
          <div>
            &copy; {new Date().getFullYear()} HireFlow. Crafted with precision & taste for high-output builders.
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onTriggerEasterEgg}
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-850 hover:bg-slate-200 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-brand-500 dark:hover:text-brand-400 transition-all font-mono text-[11px]"
            >
              <Sparkles className="w-3 h-3 text-brand-500" />
              <span>Secret: Konami Code (↑ ↑ ↓ ↓ ← → ← → B A)</span>
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
}
