import React, { useState, useEffect, useRef } from 'react';
import { GlassModal } from '../Common/GlassModal';
import { GlassButton } from '../Common/GlassButton';
import { Upload, X, Image as ImageIcon, AlertCircle } from 'lucide-react';

export function TeamMemberModal({ isOpen, onClose, onSave, memberToEdit }) {
  const isEditing = Boolean(memberToEdit);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    name: '',
    role: '',
    bio: '',
    avatar: '',
    skills: '',
    email: '',
    github: '',
    linkedin: '',
    website: '',
  });

  const [errors, setErrors] = useState({});
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (memberToEdit) {
      setFormData({
        name: memberToEdit.name || '',
        role: memberToEdit.role || '',
        bio: memberToEdit.bio || '',
        avatar: memberToEdit.avatar || '',
        skills: (memberToEdit.skills || []).join(', '),
        email: memberToEdit.email || '',
        github: memberToEdit.github || '',
        linkedin: memberToEdit.linkedin || '',
        website: memberToEdit.website || '',
      });
    } else {
      // Start completely blank - no automatic photo or prefilled someone else's data
      setFormData({
        name: '',
        role: '',
        bio: '',
        avatar: '',
        skills: '',
        email: '',
        github: '',
        linkedin: '',
        website: '',
      });
    }
    setErrors({});
    setUploadError('');
  }, [memberToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }));
  };

  // Handle local PNG / JPG / JPEG file upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');

    // Validate mime type
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError('Please select a valid PNG or JPEG (.png, .jpg, .jpeg) image file.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        // Optimize and resize image using canvas to keep localStorage light & fast
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

        // Convert to optimized data URL
        const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.88);
        setFormData((prev) => ({ ...prev, avatar: dataUrl }));
      };
      img.onerror = () => {
        setUploadError('Failed to parse selected image. Please try another file.');
      };
      img.src = event.target.result;
    };
    reader.onerror = () => {
      setUploadError('Error reading file from disk.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemovePhoto = () => {
    setFormData((prev) => ({ ...prev, avatar: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.role.trim()) newErrors.role = 'Role is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSave({
      name: formData.name.trim(),
      role: formData.role.trim(),
      bio: formData.bio.trim(),
      avatar: formData.avatar,
      skills: formData.skills
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      email: formData.email.trim(),
      github: formData.github.trim(),
      linkedin: formData.linkedin.trim(),
      website: formData.website.trim(),
    });
    onClose();
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Team Member' : '+ Add Team Member'}
      maxWidth="620px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Avatar File Upload Section */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Profile Avatar (PNG / JPEG)
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".png, .jpg, .jpeg, image/png, image/jpeg"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {formData.avatar ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '16px',
                padding: '12px 16px',
                borderRadius: '12px',
                background: 'rgba(255, 255, 255, 0.03)',
                border: '1px solid rgba(255, 43, 67, 0.3)',
              }}
            >
              <div
                style={{
                  width: '64px',
                  height: '64px',
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#0a0a0f',
                  flexShrink: 0,
                }}
              >
                <img
                  src={formData.avatar}
                  alt="Avatar preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.88rem', color: '#fff', fontWeight: 500 }}>
                  Photo Attached
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Stored in local storage
                </p>
              </div>

              <div style={{ display: 'flex', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="glass-btn"
                  style={{ padding: '6px 12px', fontSize: '0.78rem' }}
                >
                  Change
                </button>
                <button
                  type="button"
                  onClick={handleRemovePhoto}
                  style={{
                    background: 'rgba(255, 43, 67, 0.15)',
                    border: '1px solid rgba(255, 43, 67, 0.3)',
                    color: '#ff6b7e',
                    padding: '6px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                  }}
                  title="Remove Photo"
                >
                  <X size={16} />
                </button>
              </div>
            </div>
          ) : (
            <div
              onClick={() => fileInputRef.current?.click()}
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '24px 16px',
                borderRadius: '12px',
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
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(255, 43, 67, 0.1)',
                  color: 'var(--accent-red)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Upload size={18} />
              </div>
              <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Click to browse photo from computer
              </p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                PNG, JPG, or JPEG supported
              </span>
            </div>
          )}

          {uploadError && (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                marginTop: '6px',
                color: '#ff6b7e',
                fontSize: '0.8rem',
              }}
            >
              <AlertCircle size={14} />
              <span>{uploadError}</span>
            </div>
          )}
        </div>

        {/* Name & Role */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Full Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="e.g. Alex Vance"
              className="glass-input"
            />
            {errors.name && <span style={{ color: '#ff6b7e', fontSize: '0.8rem' }}>{errors.name}</span>}
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Role / Position *
            </label>
            <input
              type="text"
              name="role"
              value={formData.role}
              onChange={handleChange}
              placeholder="e.g. AI Research Engineer"
              className="glass-input"
            />
            {errors.role && <span style={{ color: '#ff6b7e', fontSize: '0.8rem' }}>{errors.role}</span>}
          </div>
        </div>

        {/* Short Bio */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Short Bio
          </label>
          <textarea
            name="bio"
            value={formData.bio}
            onChange={handleChange}
            rows={3}
            placeholder="Brief bio describing responsibilities and expertise..."
            className="glass-textarea"
          />
        </div>

        {/* Skills */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Skills / Technologies (Comma-separated)
          </label>
          <input
            type="text"
            name="skills"
            value={formData.skills}
            onChange={handleChange}
            placeholder="React, Node.js, PyTorch, Docker"
            className="glass-input"
          />
        </div>

        {/* Email & Website */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="collaborator@domain.com"
              className="glass-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Website URL
            </label>
            <input
              type="url"
              name="website"
              value={formData.website}
              onChange={handleChange}
              placeholder="https://example.com"
              className="glass-input"
            />
          </div>
        </div>

        {/* GitHub & LinkedIn */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              GitHub Profile URL
            </label>
            <input
              type="url"
              name="github"
              value={formData.github}
              onChange={handleChange}
              placeholder="https://github.com/..."
              className="glass-input"
            />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              LinkedIn Profile URL
            </label>
            <input
              type="url"
              name="linkedin"
              value={formData.linkedin}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/..."
              className="glass-input"
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
          <GlassButton onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Add Member'}
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
