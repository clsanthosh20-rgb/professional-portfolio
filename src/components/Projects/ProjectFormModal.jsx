import React, { useState, useEffect, useRef } from 'react';
import { GlassModal } from '../Common/GlassModal';
import { GlassButton } from '../Common/GlassButton';
import { Upload, X, AlertCircle } from 'lucide-react';

export function ProjectFormModal({ isOpen, onClose, onSave, projectToEdit }) {
  const isEditing = Boolean(projectToEdit);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    title: '',
    shortDescription: '',
    description: '',
    category: 'AI Systems',
    status: 'Completed',
    techStack: '',
    features: '',
    github: '',
    liveDemo: '',
    image: '',
  });

  const [errors, setErrors] = useState({});
  const [uploadError, setUploadError] = useState('');

  useEffect(() => {
    if (projectToEdit) {
      setFormData({
        title: projectToEdit.title || '',
        shortDescription: projectToEdit.shortDescription || '',
        description: projectToEdit.description || '',
        category: projectToEdit.category || 'AI Systems',
        status: projectToEdit.status || 'Completed',
        techStack: (projectToEdit.techStack || []).join(', '),
        features: (projectToEdit.features || []).join('\n'),
        github: projectToEdit.github || '',
        liveDemo: projectToEdit.liveDemo || '',
        image: projectToEdit.image || '',
      });
    } else {
      setFormData({
        title: '',
        shortDescription: '',
        description: '',
        category: 'AI Systems',
        status: 'Completed',
        techStack: '',
        features: '',
        github: '',
        liveDemo: '',
        image: '',
      });
    }
    setErrors({});
    setUploadError('');
  }, [projectToEdit, isOpen]);

  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadError('');
    const validTypes = ['image/png', 'image/jpeg', 'image/jpg'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setUploadError('Only PNG and JPEG (.png, .jpg, .jpeg) images are supported.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const maxDimension = 800;
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

        const dataUrl = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.85);
        setFormData((prev) => ({ ...prev, image: dataUrl }));
      };
      img.onerror = () => {
        setUploadError('Failed to parse image file.');
      };
      img.src = event.target.result;
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.shortDescription.trim()) newErrors.shortDescription = 'Short description is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const payload = {
      title: formData.title.trim(),
      shortDescription: formData.shortDescription.trim(),
      description: formData.description.trim() || formData.shortDescription.trim(),
      category: formData.category,
      status: formData.status,
      techStack: formData.techStack
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      features: formData.features
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      github: formData.github.trim(),
      liveDemo: formData.liveDemo.trim(),
      image: formData.image.trim(),
    };

    onSave(payload);
    onClose();
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit Project' : '+ Add New Project'}
      maxWidth="680px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {/* Title */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Project Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Hyperion RAG Neural Engine"
            className="glass-input"
          />
          {errors.title && <span style={{ color: '#ff6b7e', fontSize: '0.8rem', marginTop: '4px' }}>{errors.title}</span>}
        </div>

        {/* Category & Status */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="glass-select"
            >
              <option value="AI Systems">AI Systems</option>
              <option value="Full-Stack & AI">Full-Stack & AI</option>
              <option value="Backend & Systems">Backend & Systems</option>
              <option value="Design Systems">Design Systems</option>
              <option value="Open Source">Open Source</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Status
            </label>
            <select
              name="status"
              value={formData.status}
              onChange={handleChange}
              className="glass-select"
            >
              <option value="Completed">Completed</option>
              <option value="In Progress">In Progress</option>
              <option value="Experimental">Experimental</option>
            </select>
          </div>
        </div>

        {/* Short Description */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Short Description *
          </label>
          <input
            type="text"
            name="shortDescription"
            value={formData.shortDescription}
            onChange={handleChange}
            placeholder="High-level 1-line elevator pitch"
            className="glass-input"
          />
          {errors.shortDescription && (
            <span style={{ color: '#ff6b7e', fontSize: '0.8rem', marginTop: '4px' }}>{errors.shortDescription}</span>
          )}
        </div>

        {/* Detailed Description */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Detailed Architecture Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="In-depth details about the problem, solution, and technical implementation..."
            className="glass-textarea"
          />
        </div>

        {/* Tech Stack */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Tech Stack (Comma-separated)
          </label>
          <input
            type="text"
            name="techStack"
            value={formData.techStack}
            onChange={handleChange}
            placeholder="React, Node.js, Express, MySQL, Vector DB"
            className="glass-input"
          />
        </div>

        {/* Features */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Key Features (One feature per line)
          </label>
          <textarea
            name="features"
            value={formData.features}
            onChange={handleChange}
            rows={3}
            placeholder="Sub-200ms query latency&#10;Hybrid dense-sparse retrieval&#10;Dynamic chunking"
            className="glass-textarea"
          />
        </div>

        {/* Links: GitHub & Live Demo */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              GitHub Repository URL
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
              Live Demo URL
            </label>
            <input
              type="url"
              name="liveDemo"
              value={formData.liveDemo}
              onChange={handleChange}
              placeholder="https://..."
              className="glass-input"
            />
          </div>
        </div>

        {/* Manual Project Image Upload (PNG / JPEG) */}
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '8px' }}>
            Project Image (PNG / JPEG)
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept=".png, .jpg, .jpeg, image/png, image/jpeg"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />

          {formData.image ? (
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
                  width: '90px',
                  height: '56px',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#0a0a0f',
                  flexShrink: 0,
                }}
              >
                <img
                  src={formData.image}
                  alt="Project preview"
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>

              <div style={{ flex: 1 }}>
                <p style={{ margin: '0 0 4px 0', fontSize: '0.88rem', color: '#fff', fontWeight: 500 }}>
                  Project Visual Attached
                </p>
                <p style={{ margin: 0, fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  PNG/JPEG saved locally
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
                  onClick={handleRemoveImage}
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
                  title="Remove Image"
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
                  width: '38px',
                  height: '38px',
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
                Click to browse project image (PNG or JPG)
              </p>
              <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                No automatic or URL images
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

        {/* Actions */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
          <GlassButton onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Create Project'}
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
