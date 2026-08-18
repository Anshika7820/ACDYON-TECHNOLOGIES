import React from 'react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Add Opportunity',
      description: 'Capture the company, target role, salary range, and referral source in seconds.'
    },
    {
      number: '02',
      title: 'Track Pipeline Stages',
      description: 'Move cards as you clear phone screens, coding loops, and system design interviews.'
    },
    {
      number: '03',
      title: 'Decide with Clarity',
      description: 'Compare offers side-by-side with comp breakdowns and choose your next career step.'
    }
  ];

  return (
    <section id="how-it-works" className="py-12 md:py-20 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How it works
          </h2>
          <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">
            A simple, structured three-step workflow that keeps your search organized.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm"
            >
              <div className="text-3xl font-black font-mono text-brand-600 dark:text-brand-400 mb-3">
                {step.number}
              </div>

              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>

              <p className="mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
