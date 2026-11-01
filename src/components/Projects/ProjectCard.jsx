import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit3, Trash2, Layers } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const STATUS_COLORS = {
  Completed: { bg: 'rgba(34, 197, 94, 0.12)', border: 'rgba(34, 197, 94, 0.3)', text: '#4ade80' },
  'In Progress': { bg: 'rgba(234, 179, 8, 0.12)', border: 'rgba(234, 179, 8, 0.3)', text: '#facc15' },
  Experimental: { bg: 'rgba(255, 43, 67, 0.15)', border: 'rgba(255, 43, 67, 0.35)', text: '#ff6b7e' },
};

export function ProjectCard({ project, onViewDetails, onEdit, onDelete }) {
  const { isOwner } = useAuth();
  const [imgError, setImgError] = useState(false);
  const statusStyle = STATUS_COLORS[project.status] || STATUS_COLORS['Completed'];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      whileHover={{ y: -5, transition: { duration: 0.25 } }}
      style={{ height: '100%' }}
    >
      <div
        className="glass-card"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          padding: 0,
          overflow: 'hidden',
        }}
      >
        {/* Project Thumbnail Image / Cinematic Canvas Banner */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '210px',
            overflow: 'hidden',
            backgroundColor: '#0a0a0f',
          }}
        >
          {project.image && !imgError ? (
            <img
              src={project.image}
              alt={project.title}
              onError={() => setImgError(true)}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.05)')}
              onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
            />
          ) : (
            <div
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                background:
                  'radial-gradient(circle at 50% 40%, rgba(255, 43, 67, 0.16) 0%, rgba(12, 12, 18, 0.95) 75%)',
                borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '54px',
                  height: '54px',
                  borderRadius: '14px',
                  background: 'rgba(255, 43, 67, 0.12)',
                  border: '1px solid rgba(255, 43, 67, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-red)',
                  marginBottom: '10px',
                  boxShadow: '0 0 20px rgba(255, 43, 67, 0.15)',
                }}
              >
                <Layers size={24} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  letterSpacing: '0.12em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {project.category || 'System Architecture'}
              </span>
            </div>
          )}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(180deg, transparent 40%, rgba(12, 12, 18, 0.95) 100%)',
              pointerEvents: 'none',
            }}
          />

          {/* Status Badge */}
          <div
            style={{
              position: 'absolute',
              top: '14px',
              right: '14px',
              padding: '4px 10px',
              borderRadius: '999px',
              background: statusStyle.bg,
              border: `1px solid ${statusStyle.border}`,
              color: statusStyle.text,
              fontSize: '0.72rem',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              letterSpacing: '0.04em',
              backdropFilter: 'blur(8px)',
            }}
          >
            {project.status || 'Active'}
          </div>

          {/* Category Tag */}
          {project.category && (
            <div
              style={{
                position: 'absolute',
                top: '14px',
                left: '14px',
                padding: '4px 10px',
                borderRadius: '6px',
                background: 'rgba(10, 10, 15, 0.75)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                color: 'var(--text-secondary)',
                fontSize: '0.72rem',
                fontFamily: 'var(--font-mono)',
                backdropFilter: 'blur(8px)',
              }}
            >
              {project.category}
            </div>
          )}
        </div>

        {/* Content Body */}
        <div
          style={{
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            justifyContent: 'space-between',
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.28rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '10px',
                lineHeight: 1.3,
              }}
            >
              {project.title}
            </h3>

            <p
              style={{
                color: 'var(--text-secondary)',
                fontSize: '0.9rem',
                lineHeight: '1.55',
                marginBottom: '18px',
                display: '-webkit-box',
                WebkitLineClamp: 3,
                WebkitBoxOrient: 'vertical',
                overflow: 'hidden',
              }}
            >
              {project.shortDescription || project.description}
            </p>

            {/* Tech Stack Chips */}
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '20px',
              }}
            >
              {(project.techStack || []).slice(0, 4).map((tech, i) => (
                <span
                  key={i}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '5px',
                    background: 'rgba(255, 255, 255, 0.04)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-secondary)',
                  }}
                >
                  {tech}
                </span>
              ))}
              {(project.techStack || []).length > 4 && (
                <span
                  style={{
                    padding: '3px 6px',
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                  }}
                >
                  +{(project.techStack || []).length - 4}
                </span>
              )}
            </div>
          </div>

          {/* Action Row */}
          <div
            style={{
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <button
              type="button"
              onClick={() => onViewDetails(project)}
              className="glass-btn glass-btn-primary"
              style={{
                padding: '8px 18px',
                fontSize: '0.82rem',
                borderRadius: '8px',
              }}
            >
              <Eye size={14} />
              <span>View Details</span>
            </button>

            {/* Owner Actions */}
            {isOwner && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => onEdit(project)}
                  title="Edit Project"
                  style={{
                    background: 'rgba(255, 255, 255, 0.06)',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    color: 'var(--text-secondary)',
                    padding: '7px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
                  onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
                >
                  <Edit3 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(project)}
                  title="Delete Project"
                  style={{
                    background: 'rgba(255, 43, 67, 0.12)',
                    border: '1px solid rgba(255, 43, 67, 0.3)',
                    color: '#ff6b7e',
                    padding: '7px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 43, 67, 0.25)';
                    e.currentTarget.style.color = '#fff';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255, 43, 67, 0.12)';
                    e.currentTarget.style.color = '#ff6b7e';
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
