import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../Common/SectionHeader';
import { GlassCard } from '../Common/GlassCard';
import { GlassButton } from '../Common/GlassButton';
import { User, Target, Compass, Edit3, MapPin, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AboutSection({ about, profile, onEdit }) {
  const { isOwner } = useAuth();
  const [avatarError, setAvatarError] = useState(false);

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '100px 20px 80px 20px',
        position: 'relative',
        zIndex: 10,
      }}
    >
      <SectionHeader
        tag="IDENTITY & VISION"
        title="Engineering With Relentless Precision"
        description="A look into my engineering philosophy, cognitive AI explorations, and foundational drive."
        action={
          isOwner && (
            <GlassButton
              variant="primary"
              icon={Edit3}
              onClick={onEdit}
            >
              Edit About Info
            </GlassButton>
          )
        }
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
          alignItems: 'start',
        }}
      >
        {/* Profile Card */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div
            className="glass-card"
            style={{
              padding: '36px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Avatar with red ambient ring */}
            <div
              style={{
                position: 'relative',
                width: '140px',
                height: '140px',
                marginBottom: '24px',
              }}
            >
              <div
                style={{
                  position: 'absolute',
                  inset: '-6px',
                  borderRadius: '50%',
                  background: 'conic-gradient(from 180deg at 50% 50%, var(--accent-red) 0deg, transparent 180deg, var(--accent-red) 360deg)',
                  opacity: 0.8,
                  filter: 'blur(4px)',
                }}
              />
              {profile?.avatar && !avatarError ? (
                <img
                  src={profile.avatar}
                  alt={profile?.name || 'Santhosh'}
                  onError={() => setAvatarError(true)}
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    objectFit: 'cover',
                    border: '2px solid rgba(255, 255, 255, 0.2)',
                  }}
                />
              ) : (
                <div
                  style={{
                    position: 'relative',
                    width: '100%',
                    height: '100%',
                    borderRadius: '50%',
                    background:
                      'radial-gradient(circle at 35% 35%, rgba(255, 43, 67, 0.3) 0%, rgba(14, 14, 22, 0.95) 75%)',
                    border: '2px solid rgba(255, 43, 67, 0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    boxShadow: '0 0 25px rgba(255, 43, 67, 0.2)',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '3rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      textShadow: '0 0 20px rgba(255, 43, 67, 0.6)',
                    }}
                  >
                    {profile?.name ? profile.name.charAt(0).toUpperCase() : 'S'}
                  </span>
                </div>
              )}
            </div>

            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.6rem',
                fontWeight: 700,
                color: '#ffffff',
                margin: '0 0 6px 0',
              }}
            >
              {profile?.name || 'SANTHOSH'}
            </h3>

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                color: 'var(--accent-red)',
                letterSpacing: '0.05em',
                margin: '0 0 16px 0',
              }}
            >
              {profile?.role || 'Full-Stack Engineer & AI Systems Architect'}
            </p>

            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                fontSize: '0.88rem',
                color: 'var(--text-muted)',
                marginBottom: '24px',
              }}
            >
              <MapPin size={15} color="var(--accent-red)" />
              <span>{profile?.location || 'Bangalore, India'}</span>
            </div>

            <div
              style={{
                padding: '12px 18px',
                borderRadius: '10px',
                background: 'rgba(255, 43, 67, 0.08)',
                border: '1px solid rgba(255, 43, 67, 0.2)',
                fontSize: '0.82rem',
                color: 'var(--text-secondary)',
                lineHeight: '1.4',
              }}
            >
              {profile?.status || 'Available for high-impact engineering & AI initiatives'}
            </div>
          </div>
        </motion.div>

        {/* Narrative & Philosophy */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div className="glass-card" style={{ padding: '32px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.25rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}
            >
              <User size={20} color="var(--accent-red)" />
              Introduction & Mission
            </h4>
            <p
              style={{
                color: 'var(--text-primary)',
                fontSize: '1.05rem',
                lineHeight: '1.7',
                marginBottom: '16px',
                fontWeight: 400,
              }}
            >
              {about?.headline}
            </p>
            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.98rem',
                lineHeight: '1.7',
                margin: 0,
              }}
            >
              {about?.bio}
            </p>

            {about?.philosophy && (
              <div
                style={{
                  marginTop: '24px',
                  padding: '16px 20px',
                  borderRadius: '10px',
                  background: 'rgba(255, 255, 255, 0.02)',
                  borderLeft: '3px solid var(--accent-red)',
                  fontStyle: 'italic',
                  color: 'var(--text-secondary)',
                  fontSize: '0.92rem',
                }}
              >
                "{about?.philosophy}"
              </div>
            )}
          </div>

          {/* Interests & Goals split */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '24px',
            }}
          >
            {/* Core Interests */}
            <div className="glass-card" style={{ padding: '28px' }}>
              <h5
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Compass size={18} color="var(--accent-red)" />
                Core Interests
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(about?.interests || []).map((interest, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <CheckCircle2 size={15} color="var(--accent-red)" style={{ flexShrink: 0 }} />
                    <span>{interest}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Strategic Goals */}
            <div className="glass-card" style={{ padding: '28px' }}>
              <h5
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.1rem',
                  fontWeight: 700,
                  color: '#ffffff',
                  marginBottom: '16px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                }}
              >
                <Target size={18} color="var(--accent-red)" />
                Strategic Objectives
              </h5>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {(about?.goals || []).map((goal, i) => (
                  <div
                    key={i}
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: '10px',
                      fontSize: '0.9rem',
                      color: 'var(--text-secondary)',
                      lineHeight: '1.45',
                    }}
                  >
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        color: 'var(--accent-red)',
                        fontWeight: 700,
                        fontSize: '0.8rem',
                      }}
                    >
                      0{i + 1}
                    </span>
                    <span>{goal}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
