import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Home,
  User,
  Briefcase,
  Sparkles,
  Cpu,
  Users,
  Mail,
  Lock,
  Unlock,
  Menu,
  X,
  LogOut,
  Edit3,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const NAV_ITEMS = [
  { id: 'home', label: 'HOME', icon: Home },
  { id: 'about', label: 'ABOUT', icon: User },
  { id: 'projects', label: 'PROJECTS', icon: Briefcase },
  { id: 'ailab', label: 'AI LAB', icon: Sparkles },
  { id: 'skills', label: 'SKILLS', icon: Cpu },
  { id: 'team', label: 'TEAM', icon: Users },
  { id: 'contact', label: 'CONTACT', icon: Mail },
];

export function CinematicNavbar({
  activeSection,
  onSelectSection,
  onOpenOwnerLogin,
  onOpenEditPortfolio,
  brandName = 'SANTHOSH',
}) {
  const { isOwner, logout } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header
        style={{
          position: 'fixed',
          top: '20px',
          left: '50%',
          transform: 'translateX(-50%)',
          zIndex: 80,
          width: 'calc(100% - 40px)',
          maxWidth: '1240px',
          pointerEvents: 'none',
        }}
      >
        <div
          className="glass-panel"
          style={{
            pointerEvents: 'auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: '10px 20px',
            borderRadius: '999px',
            background: 'rgba(12, 12, 18, 0.72)',
            backdropFilter: 'blur(20px)',
            WebkitBackdropFilter: 'blur(20px)',
            border: isOwner
              ? '1px solid rgba(255, 43, 67, 0.5)'
              : '1px solid rgba(255, 255, 255, 0.09)',
            boxShadow: isOwner
              ? '0 10px 35px rgba(0, 0, 0, 0.6), 0 0 20px rgba(255, 43, 67, 0.2)'
              : '0 10px 35px rgba(0, 0, 0, 0.5)',
          }}
        >
          {/* Brand Logo / Home Trigger */}
          <button
            type="button"
            onClick={() => onSelectSection('home')}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '6px 12px',
              borderRadius: '999px',
            }}
          >
            <span
              style={{
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                backgroundColor: 'var(--accent-red)',
                boxShadow: '0 0 10px var(--accent-red)',
              }}
            />
            <span
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.05rem',
                fontWeight: 800,
                letterSpacing: '0.08em',
                color: '#ffffff',
              }}
            >
              {brandName}
            </span>
          </button>

          {/* Desktop Nav Links */}
          <nav
            style={{
              display: 'none',
              alignItems: 'center',
              gap: '4px',
            }}
            className="desktop-nav-container"
          >
            {NAV_ITEMS.map((item) => {
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectSection(item.id)}
                  style={{
                    position: 'relative',
                    background: 'transparent',
                    border: 'none',
                    padding: '8px 14px',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.85rem',
                    fontWeight: isActive ? 600 : 500,
                    letterSpacing: '0.06em',
                    color: isActive ? '#ffffff' : 'var(--text-secondary)',
                    cursor: 'pointer',
                    borderRadius: '999px',
                    transition: 'color 0.2s ease',
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeNavPill"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        borderRadius: '999px',
                        background: 'rgba(255, 43, 67, 0.16)',
                        border: '1px solid rgba(255, 43, 67, 0.4)',
                        boxShadow: '0 0 15px rgba(255, 43, 67, 0.2)',
                      }}
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                  <span style={{ position: 'relative', zIndex: 1 }}>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Right Action: Owner Badge / Discreet Login & Mobile Trigger */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {isOwner ? (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={onOpenEditPortfolio}
                  title="Edit Portfolio Profile"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '6px',
                    padding: '6px 12px',
                    background: 'rgba(255, 43, 67, 0.18)',
                    border: '1px solid var(--accent-red)',
                    borderRadius: '999px',
                    color: '#ffffff',
                    fontFamily: 'var(--font-mono)',
                    fontSize: '0.75rem',
                    cursor: 'pointer',
                  }}
                >
                  <Edit3 size={13} color="var(--accent-red)" />
                  <span style={{ display: 'none', mdDisplay: 'inline' }} className="owner-text">
                    Owner Mode
                  </span>
                </button>
                <button
                  type="button"
                  onClick={logout}
                  title="Exit Owner Mode"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-secondary)',
                    padding: '6px',
                    borderRadius: '50%',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <LogOut size={14} />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={onOpenOwnerLogin}
                title="Owner Login"
                aria-label="Owner Access"
                style={{
                  background: 'transparent',
                  border: 'none',
                  color: 'var(--text-muted)',
                  cursor: 'pointer',
                  padding: '8px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'color 0.2s, background 0.2s',
                  opacity: 0.6,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#fff';
                  e.currentTarget.style.opacity = '1';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--text-muted)';
                  e.currentTarget.style.opacity = '0.6';
                }}
              >
                <Lock size={15} />
              </button>
            )}

            {/* Mobile Hamburger toggle */}
            <button
              type="button"
              className="mobile-menu-btn"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle navigation"
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: '#fff',
                padding: '8px',
                borderRadius: '8px',
                cursor: 'pointer',
              }}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Navigation */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.25 }}
            className="glass-panel-elevated"
            style={{
              position: 'fixed',
              top: '86px',
              left: '20px',
              right: '20px',
              zIndex: 79,
              padding: '16px',
              display: 'flex',
              flexDirection: 'column',
              gap: '6px',
              background: 'rgba(12, 12, 18, 0.95)',
            }}
          >
            {NAV_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = activeSection === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => {
                    onSelectSection(item.id);
                    setMobileOpen(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: isActive ? 'rgba(255, 43, 67, 0.18)' : 'transparent',
                    border: isActive
                      ? '1px solid rgba(255, 43, 67, 0.4)'
                      : '1px solid transparent',
                    color: isActive ? '#fff' : 'var(--text-secondary)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '0.95rem',
                    fontWeight: 600,
                    cursor: 'pointer',
                    textAlign: 'left',
                  }}
                >
                  <Icon size={18} color={isActive ? 'var(--accent-red)' : 'var(--text-muted)'} />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 860px) {
          .desktop-nav-container {
            display: flex !important;
          }
          .mobile-menu-btn {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
