import React from 'react';
import { PlusCircle, MoveRight, Award, Sparkles, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  const steps = [
    {
      number: '01',
      title: 'Log Opportunity & Bounds',
      description: 'Capture the target role, initial salary band, referral source, and resume variation in under 15 seconds.',
      tag: 'Capture Stage'
    },
    {
      number: '02',
      title: 'Track Pipeline & Notes',
      description: 'Drag cards as you clear recruiter screens, coding rounds, and system design loops. Keep every prep note in context.',
      tag: 'Execution Stage'
    },
    {
      number: '03',
      title: 'Compare & Negotiate',
      description: 'View offers side-by-side with total compensation breakdowns. Close the right opportunity with complete leverage.',
      tag: 'Closing Stage'
    }
  ];

  return (
    <section id="how-it-works" className="py-16 md:py-24 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 md:mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold bg-brand-500/10 text-brand-600 dark:text-brand-400 border border-brand-500/20 mb-4">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Structured Process</span>
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            How HireFlow powers your job search
          </h2>
          <p className="mt-3 text-sm sm:text-base text-slate-600 dark:text-slate-400">
            A simple, high-velocity three-step framework that turns job hunting into a systematic process.
          </p>
        </div>

        {/* 3 Steps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative">
          {steps.map((step, idx) => (
            <div
              key={idx}
              className="relative p-6 sm:p-8 rounded-2xl sm:rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm hover:shadow-lg transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl sm:text-4xl font-black font-mono text-brand-600 dark:text-brand-400">
                  {step.number}
                </span>
                <span className="text-[11px] font-mono px-2.5 py-1 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 font-medium">
                  {step.tag}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                {step.title}
              </h3>

              <p className="mt-2.5 text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                {step.description}
              </p>

              {idx < 2 && (
                <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                  <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center text-slate-500">
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
