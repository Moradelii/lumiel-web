import React, { useState, useEffect } from 'react';
import { Language, ServiceDivisionId, ClientRecord, CrmUser } from './types/index.ts';
import { INITIAL_CLIENTS } from './data/mockClients.ts';
import { INITIAL_CRM_USERS } from './data/mockUsers.ts';
import { Navbar } from './components/Navbar.tsx';
import { Hero } from './components/Hero.tsx';
import { AboutUsSection } from './components/AboutUsSection.tsx';
import { SmartServiceSelector } from './components/SmartServiceSelector.tsx';
import { ServiceCatalog } from './components/ServiceCatalog.tsx';
import { HowItWorksSection } from './components/HowItWorksSection.tsx';
import { DocumentGuide } from './components/DocumentGuide.tsx';
import { ReviewsAndFAQ } from './components/ReviewsAndFAQ.tsx';
import { ContactMapSection } from './components/ContactMapSection.tsx';
import { Footer } from './components/Footer.tsx';
import { MobileActionFooter } from './components/MobileActionFooter.tsx';
import { UniversalIntakeModal } from './components/UniversalIntakeModal.tsx';
import { CrmDashboard } from './components/crm/CrmDashboard.tsx';
import { LegalModal, LegalDocType } from './components/LegalModal.tsx';
import { CrmAuthModal } from './components/CrmAuthModal.tsx';

const CRM_CLIENTS_KEY = 'lumiel_crm_clients_v1';
const CRM_USERS_KEY = 'lumiel_crm_users_v1';

export default function App() {
  const [language, setLanguage] = useState<Language>('es');
  const [activeView, setActiveView] = useState<'portal' | 'crm'>('portal');

  // Persistent storage in browser localStorage with initial fallback
  const [clients, setClients] = useState<ClientRecord[]>(() => {
    try {
      const saved = localStorage.getItem(CRM_CLIENTS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading clients from localStorage:', err);
    }
    return INITIAL_CLIENTS;
  });

  const [users, setUsers] = useState<CrmUser[]>(() => {
    try {
      const saved = localStorage.getItem(CRM_USERS_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (err) {
      console.warn('Error reading users from localStorage:', err);
    }
    return INITIAL_CRM_USERS;
  });

  // Automatically synchronize changes to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CRM_CLIENTS_KEY, JSON.stringify(clients));
    } catch (err) {
      console.warn('Error saving clients to localStorage:', err);
    }
  }, [clients]);

  useEffect(() => {
    try {
      localStorage.setItem(CRM_USERS_KEY, JSON.stringify(users));
    } catch (err) {
      console.warn('Error saving users to localStorage:', err);
    }
  }, [users]);
  const [isIntakeModalOpen, setIsIntakeModalOpen] = useState(false);
  const [selectedDivision, setSelectedDivision] = useState<ServiceDivisionId>('apostille');

  // Modals for Legal and Staff Authentication
  const [activeLegalDoc, setActiveLegalDoc] = useState<LegalDocType | null>(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  // Open intake modal with optional division preselection
  const handleOpenIntake = (divisionId?: ServiceDivisionId) => {
    if (divisionId) {
      setSelectedDivision(divisionId);
    }
    setIsIntakeModalOpen(true);
  };

  // When a user submits an intake form from the public portal
  const handleClientSubmitted = (newClient: ClientRecord) => {
    setClients((prev) => [newClient, ...prev]);
  };

  // Staff updates an existing client record
  const handleUpdateClient = (updated: ClientRecord) => {
    setClients((prev) => prev.map((c) => (c.id === updated.id ? updated : c)));
  };

  // Staff manually creates a client record in CRM
  const handleCreateClient = (newClient: ClientRecord) => {
    setClients((prev) => [newClient, ...prev]);
  };

  // Staff updates users list
  const handleUpdateUsers = (updatedUsers: CrmUser[]) => {
    setUsers(updatedUsers);
  };

  const handleAuthSuccess = () => {
    setIsAuthModalOpen(false);
    setActiveView('crm');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToAbout = () => {
    setActiveView('portal');
    setTimeout(() => {
      const el = document.getElementById('sobre-nosotros');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#F8F6F1] font-sans text-[#2E2E2E]">
      {/* Navigation Bar (CRM button removed, discreet staff access in Footer as requested) */}
      <div className="print:hidden">
        <Navbar
          language={language}
          onLanguageChange={setLanguage}
          onOpenIntake={handleOpenIntake}
          onSelectDivision={(divId) => {
            setSelectedDivision(divId);
            setActiveView('portal');
            setTimeout(() => {
              const catalogEl = document.getElementById('servicios');
              if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
            }, 50);
          }}
          onNavigateAbout={scrollToAbout}
          onNavigatePortal={() => setActiveView('portal')}
        />
      </div>

      {/* Main View Router: Public Portal vs CRM Client Operations */}
      <main className="flex-1">
        {activeView === 'portal' ? (
          <div className="space-y-0">
            {/* Cinematic Fullscreen Hero with Background Video & High-Res Background Image */}
            <Hero
              language={language}
              onOpenIntake={handleOpenIntake}
              onExploreServices={() => {
                const catalogEl = document.getElementById('servicios');
                if (catalogEl) {
                  catalogEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            />

            {/* Sobre Nosotros / About Us with 2 Images & Comprehensive Story (Request 7) */}
            <AboutUsSection
              language={language}
              onOpenIntake={() => handleOpenIntake()}
            />

            {/* Smart Service Selector (Blueprint Section 14) */}
            <SmartServiceSelector
              language={language}
              onSelectCategory={(divId) => {
                setSelectedDivision(divId);
                const catalogEl = document.getElementById('servicios');
                if (catalogEl) {
                  catalogEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              onStartWorkflow={(divId) => handleOpenIntake(divId)}
            />

            {/* Complete Service Catalog & Prerequisites (Blueprint Section 04 & 54) */}
            <ServiceCatalog
              language={language}
              selectedDivisionId={selectedDivision}
              onOpenIntake={handleOpenIntake}
            />

            {/* How It Works & Document Workflow (Blueprint Section 31) */}
            <HowItWorksSection
              language={language}
              onOpenIntake={() => handleOpenIntake()}
            />

            {/* Lumiel Document Guide - Content Authority (Blueprint Section 38) */}
            <DocumentGuide language={language} />

            {/* Authentic Reviews & Global FAQs (Blueprint Section 27 & 39) */}
            <ReviewsAndFAQ language={language} />

            {/* Houston Office Map & Direct Contact (Blueprint Section 26) */}
            <ContactMapSection
              language={language}
              onOpenIntake={() => handleOpenIntake()}
            />
          </div>
        ) : (
          /* CRM Client Management Interface with Users & Passwords Management */
          <div className="bg-[#F8F6F1] min-h-[calc(100vh-120px)]">
            <CrmDashboard
              language={language}
              clients={clients}
              onUpdateClient={handleUpdateClient}
              onCreateClient={handleCreateClient}
              users={users}
              onUpdateUsers={handleUpdateUsers}
              onExitToPortal={() => {
                setActiveView('portal');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
            />
          </div>
        )}
      </main>

      {/* Footer with Mora-Grafic's Studio credit, Legal modals, and Staff CRM login (Request 3, 4, 5) */}
      <div className="print:hidden">
        <Footer
          language={language}
          onLanguageChange={setLanguage}
          onSelectDivision={(divId) => {
            setSelectedDivision(divId);
            setActiveView('portal');
            const catalogEl = document.getElementById('servicios');
            if (catalogEl) catalogEl.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenLegal={(docType) => setActiveLegalDoc(docType)}
          onOpenCrmAuth={() => setIsAuthModalOpen(true)}
          onNavigateAbout={scrollToAbout}
        />
      </div>

      {/* Persistent Mobile Bottom Action CTA */}
      <div className="print:hidden">
        <MobileActionFooter
          language={language}
          onOpenIntake={() => handleOpenIntake()}
        />
      </div>

      {/* Universal Request & Dynamic Intake Modal */}
      <UniversalIntakeModal
        isOpen={isIntakeModalOpen}
        onClose={() => setIsIntakeModalOpen(false)}
        language={language}
        initialDivisionId={selectedDivision}
        onSubmitSuccess={handleClientSubmitted}
      />

      {/* Legal Documents Modal (Privacidad, Términos, Descargo, Accesibilidad) */}
      <LegalModal
        isOpen={activeLegalDoc !== null}
        onClose={() => setActiveLegalDoc(null)}
        documentType={activeLegalDoc || 'privacy'}
        language={language}
      />

      {/* Staff Password Authentication Modal (Password hidden: Antunez0105) */}
      <CrmAuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
        language={language}
        users={users}
      />
    </div>
  );
}
