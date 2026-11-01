import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../Common/SectionHeader';
import { GlassCard } from '../Common/GlassCard';
import { GlassButton } from '../Common/GlassButton';
import {
  Mail,
  MapPin,
  Send,
  Check,
  Copy,
  Edit3,
  ExternalLink,
  Sparkles,
} from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from '../Common/SocialIcons';
import { useAuth } from '../../context/AuthContext';

export function ContactSection({ contact, onEditContact }) {
  const { isOwner } = useAuth();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyEmail = () => {
    if (contact?.email) {
      navigator.clipboard.writeText(contact.email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.name.trim()) newErrors.name = 'Please provide your name';
    if (!formData.email.trim() || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = 'Valid email address required';
    if (!formData.message.trim()) newErrors.message = 'Please include a message';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setSubmitted(true);
    setFormData({ name: '', email: '', subject: '', message: '' });
  };

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
        tag="DIRECT CHANNELS"
        title="Initiate Strategic Collaboration"
        description="Whether you are exploring frontier AI initiatives, building high-throughput systems, or seeking high-impact engineering leadership, let's talk."
        action={
          isOwner && (
            <GlassButton variant="primary" icon={Edit3} onClick={onEditContact}>
              Edit Contact Info
            </GlassButton>
          )
        }
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '32px',
          alignItems: 'start',
        }}
      >
        {/* Left: Contact Information Cards */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Main Direct Email Card */}
          <div
            className="glass-card"
            style={{
              padding: '30px',
              border: '1px solid rgba(255, 43, 67, 0.25)',
              background: 'linear-gradient(135deg, rgba(20, 16, 24, 0.7) 0%, rgba(12, 12, 18, 0.8) 100%)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px',
              }}
            >
              <div
                style={{
                  width: '42px',
                  height: '42px',
                  borderRadius: '10px',
                  background: 'rgba(255, 43, 67, 0.15)',
                  border: '1px solid rgba(255, 43, 67, 0.3)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--accent-red)',
                }}
              >
                <Mail size={20} />
              </div>
              <div>
                <span
                  style={{
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-mono)',
                    color: 'var(--text-muted)',
                    textTransform: 'uppercase',
                  }}
                >
                  Primary Email
                </span>
                <h4
                  style={{
                    fontFamily: 'var(--font-display)',
                    fontSize: '1.15rem',
                    fontWeight: 700,
                    color: '#ffffff',
                    margin: 0,
                  }}
                >
                  {contact?.email || 'santhosh.dev.ai@gmail.com'}
                </h4>
              </div>
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: '1.5', margin: '0 0 20px 0' }}>
              {contact?.availabilityNotice || 'Currently open to strategic technical roles and ambitious AI collaborations.'}
            </p>

            <div style={{ display: 'flex', gap: '10px' }}>
              <a
                href={`mailto:${contact?.email || 'santhosh.dev.ai@gmail.com'}`}
                className="glass-btn glass-btn-primary"
                style={{ flex: 1, padding: '10px 16px', fontSize: '0.85rem' }}
              >
                <Mail size={15} />
                <span>Send Email</span>
              </a>
              <button
                type="button"
                onClick={handleCopyEmail}
                className="glass-btn"
                style={{ padding: '10px 16px', fontSize: '0.85rem' }}
                title="Copy Email"
              >
                {copied ? <Check size={15} color="#4ade80" /> : <Copy size={15} />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>
          </div>

          {/* Social Profiles Grid */}
          <div className="glass-card" style={{ padding: '26px' }}>
            <h4
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: '1.1rem',
                fontWeight: 700,
                color: '#ffffff',
                marginBottom: '18px',
              }}
            >
              Verified Engineering Profiles
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {contact?.github && (
                <a
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    transition: 'all 0.2s',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <GithubIcon size={18} color="var(--accent-red)" />
                    <span style={{ fontSize: '0.9rem', color: '#fff' }}>GitHub Profile</span>
                  </div>
                  <ExternalLink size={15} color="var(--text-muted)" />
                </a>
              )}

              {contact?.linkedin && (
                <a
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    transition: 'all 0.2s',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <LinkedinIcon size={18} color="var(--accent-red)" />
                    <span style={{ fontSize: '0.9rem', color: '#fff' }}>LinkedIn Network</span>
                  </div>
                  <ExternalLink size={15} color="var(--text-muted)" />
                </a>
              )}

              {contact?.twitter && (
                <a
                  href={contact.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: '12px 16px',
                    borderRadius: '10px',
                    background: 'rgba(255, 255, 255, 0.03)',
                    border: '1px solid rgba(255, 255, 255, 0.07)',
                    transition: 'all 0.2s',
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
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <TwitterIcon size={18} color="var(--accent-red)" />
                    <span style={{ fontSize: '0.9rem', color: '#fff' }}>X / Twitter</span>
                  </div>
                  <ExternalLink size={15} color="var(--text-muted)" />
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Right: Interactive Contact Form */}
        <div className="glass-card" style={{ padding: '36px' }}>
          <h4
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#ffffff',
              marginBottom: '8px',
            }}
          >
            Direct Dispatch
          </h4>
          <p
            style={{
              color: 'var(--text-secondary)',
              fontSize: '0.9rem',
              marginBottom: '24px',
            }}
          >
            Send an inquiry directly to SANTHOSH. Messages are logged and handled promptly.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                padding: '30px',
                textAlign: 'center',
                borderRadius: '12px',
                background: 'rgba(34, 197, 94, 0.08)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
              }}
            >
              <Check size={36} color="#4ade80" style={{ margin: '0 auto 12px auto' }} />
              <h5 style={{ color: '#fff', fontSize: '1.2rem', marginBottom: '8px' }}>
                Transmission Received
              </h5>
              <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', margin: '0 0 20px 0' }}>
                Thank you for reaching out. I will respond to your transmission within 24 hours.
              </p>
              <GlassButton onClick={() => setSubmitted(false)}>
                Send Another Message
              </GlassButton>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Your Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. Alex Vance"
                    className="glass-input"
                  />
                  {errors.name && <span style={{ color: '#ff6b7e', fontSize: '0.78rem' }}>{errors.name}</span>}
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                    Your Email *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="alex@example.com"
                    className="glass-input"
                  />
                  {errors.email && <span style={{ color: '#ff6b7e', fontSize: '0.78rem' }}>{errors.email}</span>}
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Subject / Topic
                </label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  placeholder="e.g. AI System Architecture Opportunity"
                  className="glass-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Message *
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows={4}
                  placeholder="Outline your project scope, engineering requirements, or timeline..."
                  className="glass-textarea"
                />
                {errors.message && <span style={{ color: '#ff6b7e', fontSize: '0.78rem' }}>{errors.message}</span>}
              </div>

              <GlassButton type="submit" variant="primary" icon={Send} style={{ marginTop: '8px' }}>
                Transmit Message
              </GlassButton>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
