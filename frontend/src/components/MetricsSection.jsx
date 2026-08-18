import React from 'react';
import { Clock, ShieldCheck, Zap, Layers } from 'lucide-react';

export default function MetricsSection() {
  const metrics = [
    {
      stat: '0s',
      label: 'Broken Formulas',
      desc: 'No spreadsheet cell errors, circular dependencies, or misaligned columns.'
    },
    {
      stat: '100%',
      label: 'Client-Side Privacy',
      desc: 'Everything runs locally in your browser with optional JSON backup exports.'
    },
    {
      stat: '< 15ms',
      label: 'State Interaction Latency',
      desc: 'Instant view toggling and search filtering with zero network lag.'
    },
    {
      stat: '4',
      label: 'Dedicated Stages',
      desc: 'Custom-tailored flow for Wishlist, Applied, Interviewing, and Offers.'
    }
  ];

  return (
    <section className="py-12 md:py-16 bg-slate-900 text-white relative overflow-hidden">
      {/* Glow background */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-center sm:text-left">
          {metrics.map((m, i) => (
            <div key={i} className="p-4 sm:p-6 rounded-2xl bg-slate-800/40 border border-slate-700/50">
              <div className="text-3xl sm:text-4xl font-extrabold font-mono text-brand-400">
                {m.stat}
              </div>
              <div className="text-sm font-bold text-white mt-1">
                {m.label}
              </div>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {m.desc}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
