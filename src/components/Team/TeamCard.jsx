import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Globe, Edit3, Trash2, ChevronUp, ChevronDown, User } from 'lucide-react';
import { GithubIcon, LinkedinIcon } from '../Common/SocialIcons';
import { useAuth } from '../../context/AuthContext';

export function TeamCard({
  member,
  index,
  totalMembers,
  onEdit,
  onDelete,
  onMoveUp,
  onMoveDown,
}) {
  const { isOwner } = useAuth();
  const [imgError, setImgError] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
      style={{ height: '100%' }}
    >
      <div
        className="glass-card"
        style={{
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          padding: '28px',
          position: 'relative',
        }}
      >
        <div>
          {/* Top Row: Avatar & Reorder/Owner Controls */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              marginBottom: '20px',
            }}
          >
            <div style={{ position: 'relative', width: '70px', height: '70px', flexShrink: 0 }}>
              {member.avatar && !imgError ? (
                <img
                  src={member.avatar}
                  alt={member.name}
                  onError={() => setImgError(true)}
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    objectFit: 'cover',
                    border: '1px solid rgba(255, 255, 255, 0.15)',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                  }}
                />
              ) : (
                <div
                  style={{
                    width: '100%',
                    height: '100%',
                    borderRadius: '16px',
                    background:
                      'linear-gradient(135deg, rgba(255, 43, 67, 0.2) 0%, rgba(20, 20, 30, 0.9) 100%)',
                    border: '1px solid rgba(255, 43, 67, 0.35)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#ffffff',
                    fontFamily: 'var(--font-display)',
                    fontWeight: 700,
                    fontSize: '1.4rem',
                    boxShadow: '0 4px 15px rgba(0, 0, 0, 0.4)',
                  }}
                >
                  {member.name ? (
                    member.name.charAt(0).toUpperCase()
                  ) : (
                    <User size={24} color="var(--accent-red)" />
                  )}
                </div>
              )}
            </div>

            {isOwner && (
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <button
                  type="button"
                  disabled={index === 0}
                  onClick={() => onMoveUp(index)}
                  title="Move Up"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: index === 0 ? 'var(--text-dim)' : 'var(--text-secondary)',
                    padding: '5px',
                    borderRadius: '6px',
                    cursor: index === 0 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ChevronUp size={14} />
                </button>
                <button
                  type="button"
                  disabled={index === totalMembers - 1}
                  onClick={() => onMoveDown(index)}
                  title="Move Down"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: index === totalMembers - 1 ? 'var(--text-dim)' : 'var(--text-secondary)',
                    padding: '5px',
                    borderRadius: '6px',
                    cursor: index === totalMembers - 1 ? 'not-allowed' : 'pointer',
                  }}
                >
                  <ChevronDown size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onEdit(member)}
                  title="Edit Member"
                  style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    border: '1px solid rgba(255, 255, 255, 0.08)',
                    color: 'var(--text-secondary)',
                    padding: '5px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Edit3 size={14} />
                </button>
                <button
                  type="button"
                  onClick={() => onDelete(member)}
                  title="Delete Member"
                  style={{
                    background: 'rgba(255, 43, 67, 0.12)',
                    border: '1px solid rgba(255, 43, 67, 0.3)',
                    color: '#ff6b7e',
                    padding: '5px',
                    borderRadius: '6px',
                    cursor: 'pointer',
                  }}
                >
                  <Trash2 size={14} />
                </button>
              </div>
            )}
          </div>

          <h3
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.25rem',
              fontWeight: 700,
              color: '#ffffff',
              margin: '0 0 4px 0',
            }}
          >
            {member.name}
          </h3>

          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.82rem',
              color: 'var(--accent-red)',
              letterSpacing: '0.04em',
              margin: '0 0 14px 0',
            }}
          >
            {member.role}
          </p>

          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.88rem',
              lineHeight: '1.55',
              marginBottom: '18px',
            }}
          >
            {member.bio}
          </p>

          {/* Member Skills */}
          {member.skills && member.skills.length > 0 && (
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '6px',
                marginBottom: '20px',
              }}
            >
              {member.skills.map((skill, idx) => (
                <span
                  key={idx}
                  style={{
                    padding: '3px 8px',
                    borderRadius: '5px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    fontSize: '0.74rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                  }}
                >
                  {skill}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Social Links Row */}
        <div
          style={{
            paddingTop: '16px',
            borderTop: '1px solid rgba(255, 255, 255, 0.06)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}
        >
          {member.email && (
            <a
              href={`mailto:${member.email}`}
              title="Email"
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Mail size={16} />
            </a>
          )}

          {member.github && (
            <a
              href={member.github}
              target="_blank"
              rel="noopener noreferrer"
              title="GitHub"
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <GithubIcon size={16} />
            </a>
          )}

          {member.linkedin && (
            <a
              href={member.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              title="LinkedIn"
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <LinkedinIcon size={16} />
            </a>
          )}

          {member.website && (
            <a
              href={member.website}
              target="_blank"
              rel="noopener noreferrer"
              title="Portfolio Website"
              style={{
                color: 'var(--text-secondary)',
                transition: 'color 0.2s',
                display: 'flex',
                alignItems: 'center',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = '#fff')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--text-secondary)')}
            >
              <Globe size={16} />
            </a>
          )}
        </div>
      </div>
    </motion.div>
  );
}
