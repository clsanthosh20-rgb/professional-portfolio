import React from 'react';
import { motion } from 'framer-motion';
import {
  User,
  Briefcase,
  Sparkles,
  Cpu,
  Users,
  Mail,
  ArrowUpRight,
  ShieldCheck,
  Zap,
} from 'lucide-react';
import { GlassCard } from '../Common/GlassCard';

export function SpatialDashboard({ profile, projectsCount, teamCount, onSelectSection }) {
  const DESTINATIONS = [
    {
      id: 'about',
      title: 'ABOUT SANTHOSH',
      tag: 'Identity & Philosophy',
      desc: 'Architecting high-throughput full-stack systems and cognitive AI interfaces.',
      icon: User,
      metric: `${profile?.experienceYears || 4}+ Years Exp`,
      gridArea: 'about',
    },
    {
      id: 'projects',
      title: 'FEATURED PROJECTS',
      tag: 'Systems & Code',
      desc: 'Explore production-grade RAG engines, autonomous agent swarms, and full-stack web platforms.',
      icon: Briefcase,
      metric: `${projectsCount || 5} Flagship Projects`,
      gridArea: 'projects',
      highlight: true,
    },
    {
      id: 'ailab',
      title: 'AI LAB & EXPERIMENTS',
      tag: 'Frontier AI',
      desc: 'Deep dives into multi-stage vector search, Socratic exam copilots, and vision document intelligence.',
      icon: Sparkles,
      metric: 'Operational Models',
      gridArea: 'ailab',
      highlight: true,
    },
    {
      id: 'skills',
      title: 'TECHNICAL SKILLS',
      tag: 'Stack & Capabilities',
      desc: 'Full-stack mastery across React, Node.js, Vector DBs, MySQL, and distributed systems.',
      icon: Cpu,
      metric: '32+ Core Competencies',
      gridArea: 'skills',
    },
    {
      id: 'team',
      title: 'ENGINEERING SQUAD',
      tag: 'Collaborators',
      desc: 'High-caliber engineers and researchers collaborating on breakthrough software.',
      icon: Users,
      metric: `${teamCount || 3} Core Members`,
      gridArea: 'team',
    },
    {
      id: 'contact',
      title: 'GET IN TOUCH',
      tag: 'Connect',
      desc: 'Open for strategic engineering positions, advisory roles, and ambitious AI collaborations.',
      icon: Mail,
      metric: 'Direct Channel',
      gridArea: 'contact',
    },
  ];

  return (
    <div
      style={{
        width: '100%',
        maxWidth: '1240px',
        margin: '0 auto',
        padding: '100px 20px 60px 20px',
        position: 'relative',
        zIndex: 10,
        perspective: '1200px',
      }}
    >
      {/* Central Identity Hub */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          textAlign: 'center',
          marginBottom: '50px',
          position: 'relative',
        }}
      >
        {/* Subtle Ambient Red Glow Behind Name */}
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            width: '320px',
            height: '140px',
            background: 'radial-gradient(ellipse, rgba(255, 43, 67, 0.22) 0%, transparent 70%)',
            filter: 'blur(40px)',
            pointerEvents: 'none',
          }}
        />

        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '6px 16px',
            borderRadius: '999px',
            background: 'rgba(255, 255, 255, 0.03)',
            border: '1px solid rgba(255, 43, 67, 0.25)',
            marginBottom: '16px',
          }}
        >
          <Zap size={14} color="var(--accent-red)" />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--text-secondary)',
            }}
          >
            Spatial Portfolio Matrix
          </span>
        </div>

        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.8rem, 6.5vw, 5rem)',
            fontWeight: 800,
            letterSpacing: '-0.02em',
            color: '#ffffff',
            margin: '0 0 10px 0',
            textShadow: '0 0 30px rgba(255, 43, 67, 0.25)',
          }}
        >
          {profile?.name || 'SANTHOSH'}
        </h1>

        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1rem, 2vw, 1.35rem)',
            fontWeight: 400,
            color: 'var(--text-secondary)',
            letterSpacing: '0.04em',
            maxWidth: '650px',
            margin: '0 auto',
          }}
        >
          {profile?.tagline || 'Developer • Builder • AI Explorer'}
        </p>
      </motion.div>

      {/* Floating Spatial Grid Destinations */}
      <div
        className="spatial-grid-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {DESTINATIONS.map((dest, idx) => {
          const Icon = dest.icon;
          return (
            <motion.div
              key={dest.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 + idx * 0.08 }}
              whileHover={{
                scale: 1.025,
                rotateX: 2,
                rotateY: -2,
                transition: { duration: 0.2 },
              }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectSection(dest.id)}
              style={{
                cursor: 'pointer',
              }}
            >
              <div
                className="glass-card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  padding: '28px',
                  border: dest.highlight
                    ? '1px solid rgba(255, 43, 67, 0.35)'
                    : '1px solid rgba(255, 255, 255, 0.08)',
                  background: dest.highlight
                    ? 'linear-gradient(145deg, rgba(22, 18, 26, 0.75) 0%, rgba(12, 12, 18, 0.65) 100%)'
                    : 'rgba(15, 15, 22, 0.65)',
                }}
              >
                <div>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '20px',
                    }}
                  >
                    <div
                      style={{
                        width: '44px',
                        height: '44px',
                        borderRadius: '12px',
                        background: dest.highlight
                          ? 'rgba(255, 43, 67, 0.16)'
                          : 'rgba(255, 255, 255, 0.05)',
                        border: dest.highlight
                          ? '1px solid rgba(255, 43, 67, 0.3)'
                          : '1px solid rgba(255, 255, 255, 0.08)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: dest.highlight ? 'var(--accent-red)' : '#ffffff',
                      }}
                    >
                      <Icon size={20} />
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        color: 'var(--text-muted)',
                        fontSize: '0.8rem',
                        fontFamily: 'var(--font-mono)',
                      }}
                    >
                      <span>ENTER</span>
                      <ArrowUpRight size={15} color="var(--accent-red)" />
                    </div>
                  </div>

                  <span
                    className="glass-tag"
                    style={{
                      marginBottom: '10px',
                      color: dest.highlight ? '#ff8595' : 'var(--text-secondary)',
                      borderColor: dest.highlight ? 'rgba(255, 43, 67, 0.25)' : 'rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    {dest.tag}
                  </span>

                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.25rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      letterSpacing: '0.01em',
                      margin: '6px 0 10px 0',
                    }}
                  >
                    {dest.title}
                  </h3>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.92rem',
                      lineHeight: '1.55',
                      margin: 0,
                    }}
                  >
                    {dest.desc}
                  </p>
                </div>

                <div
                  style={{
                    marginTop: '24px',
                    paddingTop: '16px',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      color: 'var(--text-muted)',
                    }}
                  >
                    {dest.metric}
                  </span>
                  <span
                    style={{
                      width: '6px',
                      height: '6px',
                      borderRadius: '50%',
                      backgroundColor: dest.highlight ? 'var(--accent-red)' : 'rgba(255, 255, 255, 0.2)',
                    }}
                  />
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
