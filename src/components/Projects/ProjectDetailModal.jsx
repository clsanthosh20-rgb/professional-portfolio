import React, { useState } from 'react';
import { GlassModal } from '../Common/GlassModal';
import { GlassButton } from '../Common/GlassButton';
import { ExternalLink, CheckCircle2, Layers, Cpu, Compass } from 'lucide-react';
import { GithubIcon } from '../Common/SocialIcons';

export function ProjectDetailModal({ isOpen, onClose, project }) {
  if (!project) return null;
  const [imgError, setImgError] = useState(false);

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title={project.title} maxWidth="820px">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        {/* Large Hero Banner */}
        <div
          style={{
            position: 'relative',
            width: '100%',
            height: '240px',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#0a0a0f',
          }}
        >
          {project.image && !imgError ? (
            <img
              src={project.image}
              alt={project.title}
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              onError={() => setImgError(true)}
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
                  'radial-gradient(circle at 50% 50%, rgba(255, 43, 67, 0.2) 0%, rgba(12, 12, 18, 0.98) 75%)',
                border: '1px solid rgba(255, 43, 67, 0.2)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '16px',
                  background: 'rgba(255, 43, 67, 0.14)',
                  border: '1px solid rgba(255, 43, 67, 0.35)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-red)',
                  marginBottom: '10px',
                  boxShadow: '0 0 25px rgba(255, 43, 67, 0.2)',
                }}
              >
                <Layers size={28} />
              </div>
              <span
                style={{
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.85rem',
                  letterSpacing: '0.15em',
                  color: 'var(--text-muted)',
                  textTransform: 'uppercase',
                }}
              >
                {project.category || 'Architecture System'}
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

          <div
            style={{
              position: 'absolute',
              bottom: '16px',
              left: '16px',
              display: 'flex',
              gap: '8px',
            }}
          >
            <span className="glass-tag glass-tag-red">
              {project.status || 'Active'}
            </span>
            {project.category && (
              <span className="glass-tag">
                {project.category}
              </span>
            )}
          </div>
        </div>

        {/* Overview Description */}
        <div>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.15rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '10px',
            }}
          >
            System Overview & Architecture
          </h4>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.96rem',
              lineHeight: '1.7',
              margin: 0,
            }}
          >
            {project.description || project.shortDescription}
          </p>
        </div>

        {/* Key Features */}
        {project.features && project.features.length > 0 && (
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <CheckCircle2 size={18} color="var(--accent-red)" />
              Key Features & Innovations
            </h4>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                gap: '10px',
              }}
            >
              {project.features.map((feat, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: '12px 16px',
                    borderRadius: '8px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '0.88rem',
                    color: 'var(--text-secondary)',
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: '10px',
                  }}
                >
                  <span
                    style={{
                      color: 'var(--accent-red)',
                      fontWeight: 700,
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                    }}
                  >
                    ✦
                  </span>
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tech Stack Breakdown */}
        {project.techStack && project.techStack.length > 0 && (
          <div>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.15rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '12px',
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
              }}
            >
              <Cpu size={18} color="var(--accent-red)" />
              Technologies Deployed
            </h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {project.techStack.map((tech, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '6px 14px',
                    borderRadius: '6px',
                    background: 'rgba(255, 43, 67, 0.08)',
                    border: '1px solid rgba(255, 43, 67, 0.25)',
                    color: '#ff8595',
                    fontSize: '0.82rem',
                    fontFamily: 'var(--font-mono)',
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Action Buttons: Live Demo & GitHub */}
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'flex-end',
            gap: '12px',
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          }}
        >
          {project.github && (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn"
            >
              <GithubIcon size={16} />
              <span>View Source</span>
            </a>
          )}

          {project.liveDemo && (
            <a
              href={project.liveDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="glass-btn glass-btn-primary"
            >
              <ExternalLink size={16} />
              <span>Launch Live System</span>
            </a>
          )}
        </div>
      </div>
    </GlassModal>
  );
}
