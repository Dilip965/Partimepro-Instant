/**
 * PartimePro Instant - Trusted, On-Demand Skilled Talent Marketplace
 * "Trusted Skills. Available Now."
 */

import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext.tsx';
import { RoleSwitcherBar } from './components/common/RoleSwitcherBar.tsx';
import { Navbar } from './components/common/Navbar.tsx';
import { Footer } from './components/common/Footer.tsx';
import { LandingPage } from './components/landing/LandingPage.tsx';
import { EmployerDashboard } from './components/employer/EmployerDashboard.tsx';
import { ProfessionalDashboard } from './components/professional/ProfessionalDashboard.tsx';
import { AdminDashboard } from './components/admin/AdminDashboard.tsx';
import { TalentDirectory } from './components/directory/TalentDirectory.tsx';
import { MessagingCenter } from './components/messaging/MessagingCenter.tsx';
import { SafetyCenter } from './components/safety/SafetyCenter.tsx';
import { PostTaskModal } from './components/employer/PostTaskModal.tsx';
import { AuthModal } from './components/auth/AuthModal.tsx';

const AppContent: React.FC = () => {
  const { activeView, setActiveView } = useApp();
  const [isPostTaskOpen, setIsPostTaskOpen] = useState(false);
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900 font-sans selection:bg-amber-500 selection:text-slate-950">
      {/* Test Persona Role Switcher */}
      <RoleSwitcherBar />

      {/* Primary Top Bar Navbar */}
      <Navbar
        onOpenPostTask={() => setIsPostTaskOpen(true)}
        onOpenAuth={() => setIsAuthOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {activeView === 'landing' && (
          <LandingPage onOpenPostTask={() => setIsPostTaskOpen(true)} />
        )}
        {activeView === 'employer_dashboard' && (
          <EmployerDashboard onOpenPostTask={() => setIsPostTaskOpen(true)} />
        )}
        {activeView === 'professional_dashboard' && (
          <ProfessionalDashboard />
        )}
        {activeView === 'admin_dashboard' && (
          <AdminDashboard />
        )}
        {activeView === 'talent_directory' && (
          <TalentDirectory />
        )}
        {activeView === 'messages' && (
          <MessagingCenter />
        )}
        {activeView === 'safety_center' && (
          <SafetyCenter />
        )}
      </main>

      {/* Footer */}
      <Footer />

      {/* Global Modals */}
      {isPostTaskOpen && (
        <PostTaskModal
          isOpen={isPostTaskOpen}
          onClose={() => setIsPostTaskOpen(false)}
          onTaskCreated={(taskId) => {
            setActiveView('talent_directory');
          }}
        />
      )}

      {isAuthOpen && (
        <AuthModal
          isOpen={isAuthOpen}
          onClose={() => setIsAuthOpen(false)}
        />
      )}
    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <AppContent />
    </AppProvider>
  );
}
