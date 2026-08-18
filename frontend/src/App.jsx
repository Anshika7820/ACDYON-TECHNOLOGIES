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
  const [toastMessage, setToastMessage] = useState(null);
  const [apiStatus, setApiStatus] = useState('checking'); // 'connected' | 'demo_fallback' | 'error'
  const [isLoading, setIsLoading] = useState(true);

  const showToast = (msg, isError = false) => {
    setToastMessage({ text: msg, isError });
    setTimeout(() => {
      setToastMessage(prev => (prev?.text === msg ? null : prev));
    }, 3500);
  };

  const loadData = useCallback(async () => {
    setIsLoading(true);
    setApiStatus('checking');
    try {
      const data = await getApplications();
      setApplications(data || []);
      setApiStatus('connected');
    } catch (err) {
      setApiStatus('error');
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch initial applications from backend REST API
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Developer easter egg
  const triggerEasterEgg = useCallback(() => {
    setIsEasterEggOpen(true);
  }, []);

  // Global Command Palette shortcut (Ctrl+K or Cmd+K)
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setIsCommandOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
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

  // Stage Advancement Cycle with Optimistic Rollback
  const handleAdvanceStage = async (jobId) => {
    const stageOrder = ['wishlist', 'applied', 'interview', 'offer'];
    const currentJob = applications.find(j => j.id === jobId);
    if (!currentJob) return;

    const previousApplications = applications;
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

    showToast(`Advanced ${currentJob.company} stage to ${nextStage.toUpperCase()}`);

    try {
      await updateApplicationStage(jobId, nextStage);
    } catch (err) {
      setApplications(previousApplications);
      showToast(`Could not update ${currentJob.company} stage on API — state rolled back`, true);
    }
  };

  // Update stage directly from inspector modal with Optimistic Rollback
  const handleUpdateStage = async (jobId, newStage) => {
    const currentJob = applications.find(j => j.id === jobId);
    const previousApplications = applications;

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

    if (currentJob) {
      showToast(`Updated ${currentJob.company} stage to ${newStage.toUpperCase()}`);
    }

    try {
      await updateApplicationStage(jobId, newStage);
    } catch (err) {
      setApplications(previousApplications);
      showToast(`Could not save stage on API — state rolled back`, true);
    }
  };

  // Add custom application with API response handling
  const handleAddJob = async (newJob) => {
    const previousApplications = applications;
    try {
      const created = await createApplication(newJob);
      const finalJob = created || newJob;
      setApplications(prev => [finalJob, ...prev.filter(j => j.id !== finalJob.id)]);
      showToast(`Added ${finalJob.company} opportunity`);
    } catch (err) {
      setApplications(previousApplications);
      showToast(`Could not create opportunity on API — state rolled back`, true);
    }
  };

  // Delete application with Optimistic Rollback
  const handleDeleteJob = async (jobId) => {
    const currentJob = applications.find(j => j.id === jobId);
    const previousApplications = applications;

    setApplications(prev => prev.filter(j => j.id !== jobId));
    if (selectedJob && selectedJob.id === jobId) {
      setSelectedJob(null);
    }

    if (currentJob) {
      showToast(`Removed ${currentJob.company} application`);
    }

    try {
      await deleteApplication(jobId);
    } catch (err) {
      setApplications(previousApplications);
      showToast(`Could not delete application on API — state rolled back`, true);
    }
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
            apiStatus={apiStatus}
            isLoading={isLoading}
            onRetryLoad={loadData}
          />

          <KeyBenefits />

          <HowItWorks />

          <FinalCTA onOpenCommand={() => setIsCommandOpen(true)} />
        </main>

        {/* Toast Feedback */}
        {toastMessage && (
          <div className={`fixed bottom-6 right-6 z-50 px-4 py-2.5 rounded-xl text-xs font-semibold shadow-2xl border animate-fade-in flex items-center gap-2 ${
            toastMessage.isError
              ? 'bg-red-950 text-red-100 border-red-800'
              : 'bg-slate-900 dark:bg-white text-white dark:text-slate-900 border-slate-800 dark:border-slate-200'
          }`}>
            <span className={`w-2 h-2 rounded-full ${toastMessage.isError ? 'bg-red-500' : 'bg-emerald-500'}`} />
            <span>{toastMessage.text}</span>
          </div>
        )}

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
