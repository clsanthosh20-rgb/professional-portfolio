import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { usePortfolio } from './context/PortfolioContext';
import { useAuth } from './context/AuthContext';
import { CinematicCanvas } from './components/Background/CinematicCanvas';
import { LandingScreen } from './components/Landing/LandingScreen';
import { CinematicNavbar } from './components/Navigation/CinematicNavbar';
import { SpatialDashboard } from './components/Dashboard/SpatialDashboard';
import { AboutSection } from './components/About/AboutSection';
import { SkillsSection } from './components/Skills/SkillsSection';
import { ProjectsSection } from './components/Projects/ProjectsSection';
import { AILabSection } from './components/AILab/AILabSection';
import { TeamSection } from './components/Team/TeamSection';
import { ContactSection } from './components/Contact/ContactSection';
import { OwnerLoginModal } from './components/Owner/OwnerLoginModal';
import { EditPortfolioModal } from './components/Owner/EditPortfolioModal';
import { EditSkillsModal } from './components/Owner/EditSkillsModal';
import { ArrowLeft, Lock } from 'lucide-react';

export function App() {
  const {
    portfolio,
    projects,
    skills,
    team,
    aiLab,
    updateProfile,
    updateAbout,
    updateContact,
    addProject,
    updateProject,
    deleteProject,
    addTeamMember,
    updateTeamMember,
    deleteTeamMember,
    reorderTeam,
    updateSkillCategory,
    addAILabItem,
    updateAILabItem,
    deleteAILabItem,
    resetToDefaults,
  } = usePortfolio();

  const { isOwner } = useAuth();

  // Landing & Section States
  const [hasEntered, setHasEntered] = useState(() => {
    return sessionStorage.getItem('santhosh_has_entered') === 'true';
  });
  const [isEntering, setIsEntering] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  // Modal States
  const [isOwnerLoginOpen, setIsOwnerLoginOpen] = useState(false);
  const [isEditPortfolioOpen, setIsEditPortfolioOpen] = useState(false);
  const [editingSkillCategory, setEditingSkillCategory] = useState(null);

  // Keyboard shortcut listener: Alt + L for discreet Owner Login
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.altKey && (e.key === 'l' || e.key === 'L')) {
        e.preventDefault();
        setIsOwnerLoginOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Enter My World camera transition handler
  const handleEnterWorld = () => {
    setIsEntering(true);
    setTimeout(() => {
      setHasEntered(true);
      setIsEntering(false);
      sessionStorage.setItem('santhosh_has_entered', 'true');
    }, 1100);
  };

  const handleSelectSection = (sectionId) => {
    setActiveSection(sectionId);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div
      style={{
        position: 'relative',
        minHeight: '100vh',
        backgroundColor: '#08080c',
        color: '#ededed',
        overflowX: 'hidden',
      }}
    >
      {/* Universal Cinematic Background Canvas */}
      <CinematicCanvas activeSection={activeSection} isEntering={isEntering} />

      {/* Landing Experience */}
      {!hasEntered && (
        <LandingScreen
          onEnter={handleEnterWorld}
          isTransitioning={isEntering}
          profile={portfolio.profile}
        />
      )}

      {/* Main Experience (Visible after entering) */}
      <AnimatePresence mode="wait">
        {hasEntered && (
          <motion.div
            key="main-experience"
            initial={{ opacity: 0, scale: 0.96, filter: 'blur(8px)' }}
            animate={{ opacity: 1, scale: 1, filter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              minHeight: '100vh',
              display: 'flex',
              flexDirection: 'column',
              position: 'relative',
              zIndex: 10,
            }}
          >
            {/* Cinematic Floating Navigation */}
            <CinematicNavbar
              activeSection={activeSection}
              onSelectSection={handleSelectSection}
              onOpenOwnerLogin={() => setIsOwnerLoginOpen(true)}
              onOpenEditPortfolio={() => setIsEditPortfolioOpen(true)}
              brandName={portfolio.profile?.name || 'SANTHOSH'}
            />

            {/* Back to Spatial Hub Trigger (When inside a specific section) */}
            {activeSection !== 'home' && (
              <div
                style={{
                  maxWidth: '1240px',
                  margin: '0 auto',
                  width: 'calc(100% - 40px)',
                  paddingTop: '86px',
                }}
              >
                <button
                  type="button"
                  onClick={() => handleSelectSection('home')}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    padding: '8px 16px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-secondary)',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.8rem',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#fff';
                    e.currentTarget.style.borderColor = 'rgba(255, 43, 67, 0.4)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = 'var(--text-secondary)';
                    e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.08)';
                  }}
                >
                  <ArrowLeft size={14} color="var(--accent-red)" />
                  <span>RETURN TO DASHBOARD</span>
                </button>
              </div>
            )}

            {/* Main Content Area with Spatial Switch */}
            <main style={{ flex: 1 }}>
              <AnimatePresence mode="wait">
                {activeSection === 'home' && (
                  <motion.div
                    key="section-home"
                    initial={{ opacity: 0, y: 15 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.97 }}
                    transition={{ duration: 0.4 }}
                  >
                    <SpatialDashboard
                      profile={portfolio.profile}
                      projectsCount={projects.length}
                      teamCount={team.length}
                      onSelectSection={handleSelectSection}
                    />
                  </motion.div>
                )}

                {activeSection === 'about' && (
                  <motion.div
                    key="section-about"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <AboutSection
                      about={portfolio.about}
                      profile={portfolio.profile}
                      onEdit={() => setIsEditPortfolioOpen(true)}
                    />
                  </motion.div>
                )}

                {activeSection === 'skills' && (
                  <motion.div
                    key="section-skills"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <SkillsSection
                      skills={skills}
                      onEditCategory={setEditingSkillCategory}
                    />
                  </motion.div>
                )}

                {activeSection === 'projects' && (
                  <motion.div
                    key="section-projects"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ProjectsSection
                      projects={projects}
                      onAddProject={addProject}
                      onUpdateProject={updateProject}
                      onDeleteProject={deleteProject}
                    />
                  </motion.div>
                )}

                {activeSection === 'ailab' && (
                  <motion.div
                    key="section-ailab"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <AILabSection
                      aiLab={aiLab}
                      onAddItem={addAILabItem}
                      onUpdateItem={updateAILabItem}
                      onDeleteItem={deleteAILabItem}
                    />
                  </motion.div>
                )}

                {activeSection === 'team' && (
                  <motion.div
                    key="section-team"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <TeamSection
                      team={team}
                      onAddMember={addTeamMember}
                      onUpdateMember={updateTeamMember}
                      onDeleteMember={deleteTeamMember}
                      onReorderTeam={reorderTeam}
                    />
                  </motion.div>
                )}

                {activeSection === 'contact' && (
                  <motion.div
                    key="section-contact"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ContactSection
                      contact={portfolio.contact}
                      onEditContact={() => setIsEditPortfolioOpen(true)}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </main>

            {/* Footer */}
            <footer
              style={{
                borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                background: 'rgba(8, 8, 12, 0.8)',
                padding: '40px 20px',
                marginTop: 'auto',
                position: 'relative',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  maxWidth: '1240px',
                  margin: '0 auto',
                  display: 'flex',
                  flexWrap: 'wrap',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '20px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span
                      style={{
                        width: '6px',
                        height: '6px',
                        borderRadius: '50%',
                        backgroundColor: 'var(--accent-red)',
                      }}
                    />
                    <span
                      style={{
                        fontFamily: 'var(--font-display)',
                        fontSize: '1rem',
                        fontWeight: 800,
                        letterSpacing: '0.08em',
                        color: '#ffffff',
                      }}
                    >
                      {portfolio.profile?.name || 'SANTHOSH'}
                    </span>
                  </div>
                  <p
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                      margin: 0,
                    }}
                  >
                    {portfolio.profile?.tagline || 'Developer • Builder • AI Explorer'}
                  </p>
                </div>

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '20px',
                    fontSize: '0.82rem',
                    color: 'var(--text-muted)',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  <span>© 2026 SANTHOSH. ALL RIGHTS RESERVED.</span>
                  {!isOwner && (
                    <button
                      type="button"
                      onClick={() => setIsOwnerLoginOpen(true)}
                      style={{
                        background: 'transparent',
                        border: 'none',
                        color: 'var(--text-dim)',
                        cursor: 'pointer',
                        padding: '4px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '4px',
                      }}
                      title="Owner Access"
                    >
                      <Lock size={12} />
                      <span>Owner</span>
                    </button>
                  )}
                </div>
              </div>
            </footer>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Global Modals */}
      <OwnerLoginModal
        isOpen={isOwnerLoginOpen}
        onClose={() => setIsOwnerLoginOpen(false)}
      />

      <EditPortfolioModal
        isOpen={isEditPortfolioOpen}
        onClose={() => setIsEditPortfolioOpen(false)}
        portfolio={portfolio}
        onUpdateProfile={updateProfile}
        onUpdateAbout={updateAbout}
        onUpdateContact={updateContact}
        onResetDefaults={resetToDefaults}
      />

      <EditSkillsModal
        isOpen={Boolean(editingSkillCategory)}
        onClose={() => setEditingSkillCategory(null)}
        category={editingSkillCategory}
        onSave={updateSkillCategory}
      />
    </div>
  );
}
