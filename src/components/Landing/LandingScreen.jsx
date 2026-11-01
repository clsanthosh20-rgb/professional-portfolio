import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';

export function LandingScreen({ onEnter, isTransitioning, profile }) {
  const [clicked, setClicked] = useState(false);

  const handleEnterClick = () => {
    if (clicked || isTransitioning) return; // Prevent double trigger
    setClicked(true);
    onEnter();
  };

  return (
    <motion.div
      className="landing-screen"
      initial={{ opacity: 0 }}
      animate={{
        opacity: isTransitioning ? 0 : 1,
        scale: isTransitioning ? 1.45 : 1,
        filter: isTransitioning ? 'blur(10px)' : 'blur(0px)',
      }}
      transition={{
        duration: 1.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 50,
        pointerEvents: isTransitioning ? 'none' : 'auto',
        overflow: 'hidden',
        textAlign: 'center',
        padding: '24px',
      }}
    >
      {/* Subtle radial ambient red aura */}
      <div
        style={{
          position: 'absolute',
          width: '500px',
          height: '500px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(255, 43, 67, 0.14) 0%, rgba(8, 8, 12, 0) 70%)',
          filter: 'blur(60px)',
          pointerEvents: 'none',
          animation: 'ambientGlowPulse 6s ease-in-out infinite',
        }}
      />

      {/* Floating glass brand emblem */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.1 }}
        style={{
          marginBottom: '28px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '8px 18px',
          borderRadius: '999px',
          background: 'rgba(255, 255, 255, 0.03)',
          border: '1px solid rgba(255, 43, 67, 0.25)',
          boxShadow: '0 0 20px rgba(255, 43, 67, 0.1)',
        }}
      >
        <span
          style={{
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: 'var(--accent-red)',
            boxShadow: '0 0 8px var(--accent-red)',
          }}
        />
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.8rem',
            letterSpacing: '0',
            textTransform: 'uppercase',
            color: 'var(--text-secondary)',
          }}
        >
          Portfolio
        </span>
      </motion.div>

      {/* Main Title: SANTHOSH */}
      <motion.h1
        initial={{ opacity: 0, y: 25, letterSpacing: '0.1em' }}
        animate={{ opacity: 1, y: 0, letterSpacing: '0.04em' }}
        transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(3.2rem, 9vw, 7.5rem)',
          fontWeight: 800,
          color: '#ffffff',
          lineHeight: 1,
          margin: 0,
          textShadow: '0 0 40px rgba(255, 43, 67, 0.25), 0 20px 40px rgba(0, 0, 0, 0.8)',
          userSelect: 'none',
        }}
      >
        {profile?.name || 'SANTHOSH'}
      </motion.h1>

      {/* Tagline: Developer • Builder • AI Explorer */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.35 }}
        style={{
          fontFamily: 'var(--font-body)',
          fontSize: 'clamp(1rem, 2.2vw, 1.5rem)',
          fontWeight: 400,
          letterSpacing: '0.08em',
          color: 'var(--text-secondary)',
          marginTop: '16px',
          marginBottom: '44px',
          maxWidth: '600px',
        }}
      >
        {profile?.tagline || 'Developer • Builder • AI Explorer'}
      </motion.p>

      {/* Prominent CTA: ENTER MY WORLD */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
      >
        <button
          type="button"
          onClick={handleEnterClick}
          disabled={clicked || isTransitioning}
          style={{
            position: 'relative',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '14px',
            padding: '18px 46px',
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(0.95rem, 1.5vw, 1.15rem)',
            fontWeight: 700,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: '#ffffff',
            background: 'linear-gradient(135deg, rgba(255, 43, 67, 0.32) 0%, rgba(20, 20, 30, 0.9) 100%)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            border: '1px solid rgba(255, 43, 67, 0.6)',
            borderRadius: '999px',
            boxShadow: '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 43, 67, 0.35)',
            cursor: clicked ? 'default' : 'pointer',
            transition: 'all 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            overflow: 'hidden',
          }}
          onMouseEnter={(e) => {
            if (!clicked) {
              e.currentTarget.style.transform = 'translateY(-3px) scale(1.02)';
              e.currentTarget.style.boxShadow =
                '0 15px 50px rgba(0, 0, 0, 0.7), 0 0 50px rgba(255, 43, 67, 0.6)';
              e.currentTarget.style.borderColor = 'var(--accent-red)';
            }
          }}
          onMouseLeave={(e) => {
            if (!clicked) {
              e.currentTarget.style.transform = 'translateY(0) scale(1)';
              e.currentTarget.style.boxShadow =
                '0 10px 40px rgba(0, 0, 0, 0.6), 0 0 35px rgba(255, 43, 67, 0.35)';
              e.currentTarget.style.borderColor = 'rgba(255, 43, 67, 0.6)';
            }
          }}
          onMouseDown={(e) => {
            if (!clicked) {
              e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
            }
          }}
        >
          {/* Subtle moving sheen line */}
          <span
            style={{
              position: 'absolute',
              top: 0,
              left: '-100%',
              width: '100%',
              height: '100%',
              background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
              animation: 'redScanline 3s infinite',
            }}
          />

          <span>ENTER MY WORLD</span>
          <ArrowRight
            size={18}
            style={{
              transition: 'transform 0.3s ease',
              transform: clicked ? 'translateX(6px)' : 'none',
            }}
          />
        </button>
      </motion.div>

      {/* Minimal Footer note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.6 }}
        transition={{ delay: 0.8, duration: 1 }}
        style={{
          position: 'absolute',
          bottom: '28px',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.75rem',
          letterSpacing: '0.08em',
          color: 'var(--text-muted)',
        }}
      >
        Press Enter or Click to Begin
      </motion.div>
    </motion.div>
  );
}
