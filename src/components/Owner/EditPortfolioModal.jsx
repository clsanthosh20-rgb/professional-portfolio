import React, { useState, useEffect, useRef } from 'react';
import { GlassModal } from '../Common/GlassModal';
import { GlassButton } from '../Common/GlassButton';
import { User, FileText, Mail, RotateCcw, Upload, X, AlertCircle } from 'lucide-react';

export function EditPortfolioModal({
  isOpen,
  onClose,
  portfolio,
  onUpdateProfile,
  onUpdateAbout,
  onUpdateContact,
  onResetDefaults,
}) {
  const [activeTab, setActiveTab] = useState('profile');
  const avatarInputRef = useRef(null);
  const [avatarUploadError, setAvatarUploadError] = useState('');

  const [profileForm, setProfileForm] = useState({
    name: '',
    tagline: '',
    role: '',
    location: '',
    avatar: '',
    status: '',
    experienceYears: 4,
  });

  const [aboutForm, setAboutForm] = useState({
    headline: '',
    bio: '',
    philosophy: '',
    interests: '',
    goals: '',
  });

  const [contactForm, setContactForm] = useState({
    email: '',
    github: '',
    linkedin: '',
    twitter: '',
    availabilityNotice: '',
  });

  const handleAvatarFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setAvatarUploadError('');
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setAvatarUploadError('Only PNG and JPEG (.png, .jpg, .jpeg) images are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 400;
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > maxDimension) {
            height = Math.round((height * maxDimension) / width);
            width = maxDimension;
          }
        } else {
          if (height > maxDimension) {
            width = Math.round((width * maxDimension) / height);
            height = maxDimension;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);

        const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.88);
        setProfileForm((prev) => ({ ...prev, avatar: dataUrl }));
      };
      img.onerror = () => {
        setAvatarUploadError('Failed to parse avatar image.');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveAvatar = () => {
    setProfileForm((prev) => ({ ...prev, avatar: '' }));
    if (avatarInputRef.current) {
      avatarInputRef.current.value = '';
    }
  };

  useEffect(() => {
    if (portfolio) {
      if (portfolio.profile) {
        setProfileForm({
          name: portfolio.profile.name || '',
          tagline: portfolio.profile.tagline || '',
          role: portfolio.profile.role || '',
          location: portfolio.profile.location || '',
          avatar: portfolio.profile.avatar || '',
          status: portfolio.profile.status || '',
          experienceYears: portfolio.profile.experienceYears || 4,
        });
      }
      if (portfolio.about) {
        setAboutForm({
          headline: portfolio.about.headline || '',
          bio: portfolio.about.bio || '',
          philosophy: portfolio.about.philosophy || '',
          interests: (portfolio.about.interests || []).join('\n'),
          goals: (portfolio.about.goals || []).join('\n'),
        });
      }
      if (portfolio.contact) {
        setContactForm({
          email: portfolio.contact.email || '',
          github: portfolio.contact.github || '',
          linkedin: portfolio.contact.linkedin || '',
          twitter: portfolio.contact.twitter || '',
          availabilityNotice: portfolio.contact.availabilityNotice || '',
        });
      }
    }
  }, [portfolio, isOpen]);

  const handleSaveAll = (e) => {
    e.preventDefault();

    onUpdateProfile({
      ...profileForm,
      experienceYears: Number(profileForm.experienceYears) || 4,
    });

    onUpdateAbout({
      headline: aboutForm.headline,
      bio: aboutForm.bio,
      philosophy: aboutForm.philosophy,
      interests: aboutForm.interests
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      goals: aboutForm.goals
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
    });

    onUpdateContact({
      ...contactForm,
    });

    onClose();
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Customize Portfolio" maxWidth="720px">
      <div>
        {/* Navigation Tabs */}
        <div
          style={{
            display: 'flex',
            gap: '8px',
            borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
            paddingBottom: '14px',
            marginBottom: '20px',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'profile' ? 'rgba(255, 43, 67, 0.16)' : 'transparent',
              border: activeTab === 'profile' ? '1px solid rgba(255, 43, 67, 0.4)' : '1px solid transparent',
              color: activeTab === 'profile' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <User size={15} />
            <span>Identity & Profile</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('about')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'about' ? 'rgba(255, 43, 67, 0.16)' : 'transparent',
              border: activeTab === 'about' ? '1px solid rgba(255, 43, 67, 0.4)' : '1px solid transparent',
              color: activeTab === 'about' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <FileText size={15} />
            <span>About & Vision</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('contact')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 16px',
              borderRadius: '8px',
              background: activeTab === 'contact' ? 'rgba(255, 43, 67, 0.16)' : 'transparent',
              border: activeTab === 'contact' ? '1px solid rgba(255, 43, 67, 0.4)' : '1px solid transparent',
              color: activeTab === 'contact' ? '#fff' : 'var(--text-secondary)',
              fontSize: '0.85rem',
              cursor: 'pointer',
            }}
          >
            <Mail size={15} />
            <span>Contact & Socials</span>
          </button>
        </div>

        <form onSubmit={handleSaveAll} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* PROFILE TAB */}
          {activeTab === 'profile' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Brand Name *
                  </label>
                  <input
                    type="text"
                    value={profileForm.name}
                    onChange={(e) => setProfileForm({ ...profileForm, name: e.target.value })}
                    className="glass-input"
                    required
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Years Experience
                  </label>
                  <input
                    type="number"
                    value={profileForm.experienceYears}
                    onChange={(e) => setProfileForm({ ...profileForm, experienceYears: e.target.value })}
                    className="glass-input"
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Brand Tagline *
                </label>
                <input
                  type="text"
                  value={profileForm.tagline}
                  onChange={(e) => setProfileForm({ ...profileForm, tagline: e.target.value })}
                  className="glass-input"
                  required
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Role / Title
                  </label>
                  <input
                    type="text"
                    value={profileForm.role}
                    onChange={(e) => setProfileForm({ ...profileForm, role: e.target.value })}
                    className="glass-input"
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Location
                  </label>
                  <input
                    type="text"
                    value={profileForm.location}
                    onChange={(e) => setProfileForm({ ...profileForm, location: e.target.value })}
                    className="glass-input"
                  />
                </div>
              </div>

              {/* Profile Avatar (PNG / JPEG) */}
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
                  Profile Photo (PNG / JPEG)
                </label>

                <input
                  ref={avatarInputRef}
                  type="file"
                  accept=".png, .jpg, .jpeg, image/png, image/jpeg"
                  onChange={handleAvatarFileChange}
                  style={{ display: 'none' }}
                />

                {profileForm.avatar ? (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      padding: '10px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.03)',
                      border: '1px solid rgba(255, 43, 67, 0.3)',
                    }}
                  >
                    <div
                      style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        overflow: 'hidden',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        backgroundColor: '#0a0a0f',
                        flexShrink: 0,
                      }}
                    >
                      <img
                        src={profileForm.avatar}
                        alt="Profile avatar"
                        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                      />
                    </div>

                    <div style={{ flex: 1 }}>
                      <p style={{ margin: '0 0 2px 0', fontSize: '0.85rem', color: '#fff', fontWeight: 500 }}>
                        Avatar Attached
                      </p>
                      <p style={{ margin: 0, fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                        Saved to local storage
                      </p>
                    </div>

                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                        className="glass-btn"
                        style={{ padding: '5px 10px', fontSize: '0.75rem' }}
                      >
                        Change
                      </button>
                      <button
                        type="button"
                        onClick={handleRemoveAvatar}
                        style={{
                          background: 'rgba(255, 43, 67, 0.15)',
                          border: '1px solid rgba(255, 43, 67, 0.3)',
                          color: '#ff6b7e',
                          padding: '5px',
                          borderRadius: '6px',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                        }}
                        title="Remove Avatar"
                      >
                        <X size={15} />
                      </button>
                    </div>
                  </div>
                ) : (
                  <div
                    onClick={() => avatarInputRef.current?.click()}
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '6px',
                      padding: '18px 14px',
                      borderRadius: '10px',
                      background: 'rgba(255, 255, 255, 0.02)',
                      border: '1px dashed rgba(255, 255, 255, 0.15)',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 43, 67, 0.5)';
                      e.currentTarget.style.background = 'rgba(255, 43, 67, 0.04)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.15)';
                      e.currentTarget.style.background = 'rgba(255, 255, 255, 0.02)';
                    }}
                  >
                    <div
                      style={{
                        width: '32px',
                        height: '32px',
                        borderRadius: '8px',
                        background: 'rgba(255, 43, 67, 0.1)',
                        color: 'var(--accent-red)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <Upload size={16} />
                    </div>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                      Browse photo from computer (PNG / JPG)
                    </p>
                  </div>
                )}

                {avatarUploadError && (
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      marginTop: '6px',
                      color: '#ff6b7e',
                      fontSize: '0.78rem',
                    }}
                  >
                    <AlertCircle size={14} />
                    <span>{avatarUploadError}</span>
                  </div>
                )}
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Availability Status Notice
                </label>
                <input
                  type="text"
                  value={profileForm.status}
                  onChange={(e) => setProfileForm({ ...profileForm, status: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>
          )}

          {/* ABOUT TAB */}
          {activeTab === 'about' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Headline / Mission
                </label>
                <input
                  type="text"
                  value={aboutForm.headline}
                  onChange={(e) => setAboutForm({ ...aboutForm, headline: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Full Bio Narrative
                </label>
                <textarea
                  value={aboutForm.bio}
                  onChange={(e) => setAboutForm({ ...aboutForm, bio: e.target.value })}
                  rows={3}
                  className="glass-textarea"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Engineering Philosophy
                </label>
                <input
                  type="text"
                  value={aboutForm.philosophy}
                  onChange={(e) => setAboutForm({ ...aboutForm, philosophy: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Interests (One per line)
                  </label>
                  <textarea
                    value={aboutForm.interests}
                    onChange={(e) => setAboutForm({ ...aboutForm, interests: e.target.value })}
                    rows={4}
                    className="glass-textarea"
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                    Strategic Goals (One per line)
                  </label>
                  <textarea
                    value={aboutForm.goals}
                    onChange={(e) => setAboutForm({ ...aboutForm, goals: e.target.value })}
                    rows={4}
                    className="glass-textarea"
                  />
                </div>
              </div>
            </div>
          )}

          {/* CONTACT TAB */}
          {activeTab === 'contact' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Contact Email
                </label>
                <input
                  type="email"
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Availability Notice
                </label>
                <input
                  type="text"
                  value={contactForm.availabilityNotice}
                  onChange={(e) => setContactForm({ ...contactForm, availabilityNotice: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  GitHub Profile URL
                </label>
                <input
                  type="url"
                  value={contactForm.github}
                  onChange={(e) => setContactForm({ ...contactForm, github: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  LinkedIn URL
                </label>
                <input
                  type="url"
                  value={contactForm.linkedin}
                  onChange={(e) => setContactForm({ ...contactForm, linkedin: e.target.value })}
                  className="glass-input"
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '4px' }}>
                  Twitter / X Profile URL
                </label>
                <input
                  type="url"
                  value={contactForm.twitter}
                  onChange={(e) => setContactForm({ ...contactForm, twitter: e.target.value })}
                  className="glass-input"
                />
              </div>
            </div>
          )}

          {/* Action Row */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginTop: '16px',
              paddingTop: '16px',
              borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            }}
          >
            <button
              type="button"
              onClick={() => {
                if (window.confirm('Reset all portfolio details back to default values?')) {
                  onResetDefaults();
                  onClose();
                }
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                background: 'transparent',
                border: 'none',
                color: 'var(--text-muted)',
                fontSize: '0.78rem',
                cursor: 'pointer',
              }}
            >
              <RotateCcw size={13} />
              <span>Reset Factory Defaults</span>
            </button>

            <div style={{ display: 'flex', gap: '10px' }}>
              <GlassButton onClick={onClose}>
                Cancel
              </GlassButton>
              <GlassButton type="submit" variant="primary">
                Save All Changes
              </GlassButton>
            </div>
          </div>
        </form>
      </div>
    </GlassModal>
  );
}
