import React, { useState, useEffect } from 'react';
import { GlassModal } from '../Common/GlassModal';
import { GlassButton } from '../Common/GlassButton';
import { Plus, Trash2 } from 'lucide-react';

export function EditSkillsModal({ isOpen, onClose, category, onSave }) {
  const [formData, setFormData] = useState({
    category: '',
    description: '',
    items: [],
  });

  useEffect(() => {
    if (category) {
      setFormData({
        category: category.category || '',
        description: category.description || '',
        items: category.items ? [...category.items] : [],
      });
    }
  }, [category, isOpen]);

  const handleItemChange = (index, field, value) => {
    const updated = [...formData.items];
    updated[index] = { ...updated[index], [field]: value };
    setFormData((prev) => ({ ...prev, items: updated }));
  };

  const handleAddItem = () => {
    setFormData((prev) => ({
      ...prev,
      items: [...prev.items, { name: 'New Skill', level: 'Intermediate', experience: '1 yr' }],
    }));
  };

  const handleRemoveItem = (index) => {
    setFormData((prev) => ({
      ...prev,
      items: prev.items.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.category.trim()) return;

    onSave(category.id, {
      ...category,
      category: formData.category.trim(),
      description: formData.description.trim(),
      items: formData.items.filter((item) => item.name.trim()),
    });
    onClose();
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title="Edit Skills Category"
      maxWidth="650px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Category Title *
          </label>
          <input
            type="text"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="glass-input"
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Category Scope Description
          </label>
          <textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={2}
            className="glass-textarea"
          />
        </div>

        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              marginBottom: '10px',
            }}
          >
            <label style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              Skills & Competencies
            </label>
            <button
              type="button"
              onClick={handleAddItem}
              className="glass-btn"
              style={{ padding: '4px 10px', fontSize: '0.78rem' }}
            >
              <Plus size={13} />
              <span>Add Skill</span>
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '240px', overflowY: 'auto' }}>
            {formData.items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr auto',
                  gap: '8px',
                  alignItems: 'center',
                  background: 'rgba(255, 255, 255, 0.02)',
                  padding: '6px',
                  borderRadius: '8px',
                }}
              >
                <input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleItemChange(idx, 'name', e.target.value)}
                  placeholder="Skill name"
                  className="glass-input"
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
                <input
                  type="text"
                  value={item.level}
                  onChange={(e) => handleItemChange(idx, 'level', e.target.value)}
                  placeholder="Level"
                  className="glass-input"
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
                <input
                  type="text"
                  value={item.experience}
                  onChange={(e) => handleItemChange(idx, 'experience', e.target.value)}
                  placeholder="Exp"
                  className="glass-input"
                  style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveItem(idx)}
                  style={{
                    background: 'transparent',
                    border: 'none',
                    color: '#ff6b7e',
                    cursor: 'pointer',
                    padding: '6px',
                  }}
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '12px' }}>
          <GlassButton onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton type="submit" variant="primary">
            Save Category
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
