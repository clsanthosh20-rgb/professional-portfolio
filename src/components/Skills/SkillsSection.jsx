import React from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../Common/SectionHeader';
import { GlassCard } from '../Common/GlassCard';
import { GlassButton } from '../Common/GlassButton';
import { Cpu, Edit3, CheckCircle, Code2, Database, Brain, Wrench } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const CATEGORY_ICONS = {
  'Frontend Engineering': Code2,
  'Backend & Systems': Database,
  'AI & Cognitive Engineering': Brain,
  'Developer Tools & Workflow': Wrench,
};

export function SkillsSection({ skills, onEditCategory }) {
  const { isOwner } = useAuth();

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
        tag="TECHNICAL MASTERY"
        title="Engineering Toolkit & Stack"
        description="Comprehensive technical proficiencies spanning high-performance client layers, robust distributed systems, and frontier cognitive AI pipelines."
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
        }}
      >
        {skills.map((category, idx) => {
          const Icon = CATEGORY_ICONS[category.category] || Cpu;
          return (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: idx * 0.1 }}
            >
              <div
                className="glass-card"
                style={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  padding: '28px',
                }}
              >
                {/* Category Header */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    marginBottom: '16px',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        borderRadius: '10px',
                        background: 'rgba(255, 43, 67, 0.12)',
                        border: '1px solid rgba(255, 43, 67, 0.3)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'var(--accent-red)',
                      }}
                    >
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3
                        style={{
                          fontFamily: 'var(--font-display)',
                          fontSize: '1.2rem',
                          fontWeight: 700,
                          color: '#ffffff',
                          margin: 0,
                        }}
                      >
                        {category.category}
                      </h3>
                    </div>
                  </div>

                  {isOwner && (
                    <button
                      type="button"
                      onClick={() => onEditCategory(category)}
                      title="Edit Category"
                      style={{
                        background: 'rgba(255, 255, 255, 0.05)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-secondary)',
                        padding: '6px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                      onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                    >
                      <Edit3 size={14} />
                    </button>
                  )}
                </div>

                <p
                  style={{
                    color: 'var(--text-secondary)',
                    fontSize: '0.88rem',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                    minHeight: '40px',
                  }}
                >
                  {category.description}
                </p>

                {/* Tech Pills Grid */}
                <div
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    gap: '10px',
                    marginTop: 'auto',
                  }}
                >
                  {(category.items || []).map((skill, sIdx) => (
                    <div
                      key={sIdx}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '8px',
                        padding: '8px 14px',
                        borderRadius: '8px',
                        background: 'rgba(255, 255, 255, 0.03)',
                        border: '1px solid rgba(255, 255, 255, 0.07)',
                        fontSize: '0.85rem',
                        transition: 'all 0.2s ease',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 43, 67, 0.35)';
                        e.currentTarget.style.background = 'rgba(255, 43, 67, 0.06)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.07)';
                        e.currentTarget.style.background = 'rgba(255, 255, 255, 0.03)';
                      }}
                    >
                      <span style={{ color: '#ffffff', fontWeight: 500 }}>{skill.name}</span>
                      {skill.level && (
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.72rem',
                            color: 'var(--accent-red)',
                            opacity: 0.85,
                          }}
                        >
                          {skill.level}
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
