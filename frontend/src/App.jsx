import React, { useState, useEffect, useCallback } from 'react';
import confetti from 'canvas-confetti';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardMockup from './components/DashboardMockup';
import MetricsSection from './components/MetricsSection';
import Features from './components/Features';
import Comparison from './components/Comparison';
import HowItWorks from './components/HowItWorks';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import JobDetailModal from './components/JobDetailModal';
import CommandPalette from './components/CommandPalette';
import EasterEggModal from './components/EasterEggModal';
import { initialApplications } from './data/mockJobs';

export default function App() {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState([]);

  // Celebratory confetti when easter egg is unlocked
  const triggerEasterEgg = useCallback(() => {
    setIsEasterEggOpen(true);
    try {
      confetti({
        particleCount: 120,
        spread: 80,
        origin: { y: 0.6 }
      });
    } catch (e) {
      console.log('Confetti error', e);
    }
  }, []);

  // Konami Code listener: ↑ ↑ ↓ ↓ ← → ← → B A
  useEffect(() => {
    const konamiCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight',
      'b', 'a'
    ];

    const handleKeyDown = (e) => {
      const key = e.key.length === 1 ? e.key.toLowerCase() : e.key;
      setKonamiSequence((prev) => {
        const next = [...prev, key].slice(-10);
        const matches = next.every((k, idx) => k === konamiCode[idx]);
        if (matches && next.length === 10) {
          triggerEasterEgg();
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerEasterEgg]);

  // Advance Stage Cycle: wishlist -> applied -> interview -> offer
  const handleAdvanceStage = (jobId) => {
    const stageOrder = ['wishlist', 'applied', 'interview', 'offer'];
    setApplications(prev => prev.map(job => {
      if (job.id === jobId) {
        const currentIndex = stageOrder.indexOf(job.stage);
        const nextStage = stageOrder[(currentIndex + 1) % stageOrder.length];
        return { 
          ...job, 
          stage: nextStage,
          lastActivity: 'Just now',
          timeline: [
            { date: 'Today', event: `Advanced stage to ${nextStage.toUpperCase()}` },
            ...(job.timeline || [])
          ]
        };
      }
      return job;
    }));
  };

  // Update stage from inspector drawer
  const handleUpdateStage = (jobId, newStage) => {
    setApplications(prev => prev.map(job => {
      if (job.id === jobId) {
        return {
          ...job,
          stage: newStage,
          lastActivity: 'Just now',
          timeline: [
            { date: 'Today', event: `Changed stage to ${newStage.toUpperCase()}` },
            ...(job.timeline || [])
          ]
        };
      }
      return job;
    }));

    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob(prev => ({
        ...prev,
        stage: newStage,
        lastActivity: 'Just now'
      }));
    }
  };

  // Add custom application
  const handleAddJob = (newJob) => {
    setApplications(prev => [newJob, ...prev]);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        
        {/* Navigation Bar */}
        <Navbar 
          onOpenCommand={() => setIsCommandOpen(true)}
          onTriggerEasterEgg={triggerEasterEgg}
        />

        {/* Main Content Flow */}
        <main className="flex-1">
          <Hero onOpenCommand={() => setIsCommandOpen(true)} />
          
          <MetricsSection />

          <DashboardMockup
            applications={applications}
            onSelectJob={(job) => setSelectedJob(job)}
            onAdvanceStage={handleAdvanceStage}
            onAddJob={handleAddJob}
          />

          <Features />

          <Comparison />

          <HowItWorks />

          <FinalCTA onOpenCommand={() => setIsCommandOpen(true)} />
        </main>

        {/* Footer */}
        <Footer onTriggerEasterEgg={triggerEasterEgg} />

        {/* Modals & Overlays */}
        <JobDetailModal
          job={selectedJob}
          isOpen={Boolean(selectedJob)}
          onClose={() => setSelectedJob(null)}
          onUpdateStage={handleUpdateStage}
        />

        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onSelectJob={(job) => setSelectedJob(job)}
          applications={applications}
          onTriggerEasterEgg={triggerEasterEgg}
        />

        <EasterEggModal
          isOpen={isEasterEggOpen}
          onClose={() => setIsEasterEggOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}
