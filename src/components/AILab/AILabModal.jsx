import React, { useState, useEffect } from 'react';
import { GlassModal } from '../Common/GlassModal';
import { GlassButton } from '../Common/GlassButton';

export function AILabModal({ isOpen, onClose, onSave, itemToEdit }) {
  const isEditing = Boolean(itemToEdit);

  const [formData, setFormData] = useState({
    title: '',
    category: 'Information Retrieval',
    status: 'Operational',
    description: '',
    tags: '',
    codeSnippet: '',
  });

  useEffect(() => {
    if (itemToEdit) {
      setFormData({
        title: itemToEdit.title || '',
        category: itemToEdit.category || 'Information Retrieval',
        status: itemToEdit.status || 'Operational',
        description: itemToEdit.description || '',
        tags: (itemToEdit.tags || []).join(', '),
        codeSnippet: itemToEdit.codeSnippet || '',
      });
    } else {
      setFormData({
        title: '',
        category: 'Information Retrieval',
        status: 'Operational',
        description: '',
        tags: 'RAG, Vector DB, LLM',
        codeSnippet: '// AI Experiment snippet\nconst res = await aiPipeline.query(input);',
      });
    }
  }, [itemToEdit, isOpen]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    onSave({
      title: formData.title.trim(),
      category: formData.category,
      status: formData.status,
      description: formData.description.trim(),
      tags: formData.tags
        .split(',')
        .map((t) => t.trim())
        .filter(Boolean),
      codeSnippet: formData.codeSnippet.trim(),
      metrics: itemToEdit?.metrics || { latency: '120ms', accuracy: '95%' },
    });
    onClose();
  };

  return (
    <GlassModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? 'Edit AI Experiment' : '+ Add AI Experiment'}
      maxWidth="640px"
    >
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Experiment Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            placeholder="e.g. Cognitive Exam Copilot"
            className="glass-input"
            required
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
              Category
            </label>
            <input
              type="text"
              name="category"
              value={formData.category}
              onChange={handleChange}
              placeholder="e.g. Information Retrieval"
              className="glass-input"
            />
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
              <option value="Operational">Operational</option>
              <option value="Beta Testing">Beta Testing</option>
              <option value="Prototype">Prototype</option>
            </select>
          </div>
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Technical Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={3}
            placeholder="Description of the model, prompt chaining, or indexing strategy..."
            className="glass-textarea"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Tags (Comma-separated)
          </label>
          <input
            type="text"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
            placeholder="RAG, Vector Embeddings, LLMs"
            className="glass-input"
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Architecture Code Snippet
          </label>
          <textarea
            name="codeSnippet"
            value={formData.codeSnippet}
            onChange={handleChange}
            rows={4}
            placeholder="// Core pipeline execution..."
            className="glass-textarea"
            style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem' }}
          />
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
          <GlassButton onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton type="submit" variant="primary">
            {isEditing ? 'Save Changes' : 'Add Experiment'}
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
