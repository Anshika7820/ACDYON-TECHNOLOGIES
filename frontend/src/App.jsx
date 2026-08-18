import React, { useState, useEffect, useCallback } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import DashboardMockup from './components/DashboardMockup';
import KeyBenefits from './components/KeyBenefits';
import HowItWorks from './components/HowItWorks';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import JobDetailModal from './components/JobDetailModal';
import CommandPalette from './components/CommandPalette';
import EasterEggModal from './components/EasterEggModal';
import { initialApplications } from './data/mockJobs';
import { getApplications, updateApplicationStage, createApplication, deleteApplication } from './api/applications';

export default function App() {
  const [applications, setApplications] = useState(initialApplications);
  const [selectedJob, setSelectedJob] = useState(null);
  const [isCommandOpen, setIsCommandOpen] = useState(false);
  const [isEasterEggOpen, setIsEasterEggOpen] = useState(false);
  const [konamiSequence, setKonamiSequence] = useState([]);

  // Fetch initial applications from backend REST API
  useEffect(() => {
    let isMounted = true;
    getApplications().then((data) => {
      if (isMounted && data && data.length > 0) {
        setApplications(data);
      }
    });
    return () => { isMounted = false; };
  }, []);

  // Developer easter egg
  const triggerEasterEgg = useCallback(() => {
    setIsEasterEggOpen(true);
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

  // Stage Advancement Cycle: wishlist -> applied -> interview -> offer
  const handleAdvanceStage = async (jobId) => {
    const stageOrder = ['wishlist', 'applied', 'interview', 'offer'];
    const currentJob = applications.find(j => j.id === jobId);
    if (!currentJob) return;

    const currentIndex = stageOrder.indexOf(currentJob.stage);
    const nextStage = stageOrder[(currentIndex + 1) % stageOrder.length];

    // Optimistic UI update
    setApplications(prev => prev.map(job => {
      if (job.id === jobId) {
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

    // Send PATCH to backend REST API
    await updateApplicationStage(jobId, nextStage);
  };

  // Update stage directly from inspector modal
  const handleUpdateStage = async (jobId, newStage) => {
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

    // Send PATCH to backend REST API
    await updateApplicationStage(jobId, newStage);
  };

  // Add custom application
  const handleAddJob = async (newJob) => {
    setApplications(prev => [newJob, ...prev]);
    // Send POST to backend REST API
    await createApplication(newJob);
  };

  // Delete application
  const handleDeleteJob = async (jobId) => {
    setApplications(prev => prev.filter(j => j.id !== jobId));
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob(null);
    }
    // Send DELETE to backend REST API
    await deleteApplication(jobId);
  };

  return (
    <ThemeProvider>
      <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
        
        {/* Navigation */}
        <Navbar 
          onOpenCommand={() => setIsCommandOpen(true)}
        />

        {/* Main Content Flow */}
        <main className="flex-1">
          <Hero onOpenCommand={() => setIsCommandOpen(true)} />
          
          <DashboardMockup
            applications={applications}
            onSelectJob={(job) => setSelectedJob(job)}
            onAdvanceStage={handleAdvanceStage}
            onAddJob={handleAddJob}
          />

          <KeyBenefits />

          <HowItWorks />

          <FinalCTA onOpenCommand={() => setIsCommandOpen(true)} />
        </main>

        {/* Footer */}
        <Footer onTriggerEasterEgg={triggerEasterEgg} />

        {/* Modals */}
        <JobDetailModal
          job={selectedJob}
          isOpen={Boolean(selectedJob)}
          onClose={() => setSelectedJob(null)}
          onUpdateStage={handleUpdateStage}
          onDeleteJob={handleDeleteJob}
        />

        <CommandPalette
          isOpen={isCommandOpen}
          onClose={() => setIsCommandOpen(false)}
          onSelectJob={(job) => setSelectedJob(job)}
          applications={applications}
        />

        <EasterEggModal
          isOpen={isEasterEggOpen}
          onClose={() => setIsEasterEggOpen(false)}
        />

      </div>
    </ThemeProvider>
  );
}
