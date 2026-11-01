import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { SectionHeader } from '../Common/SectionHeader';
import { GlassCard } from '../Common/GlassCard';
import { GlassButton } from '../Common/GlassButton';
import { AILabModal } from './AILabModal';
import { ConfirmModal } from '../Common/ConfirmModal';
import { Sparkles, Terminal, Activity, Plus, Edit3, Trash2, Cpu, CheckCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function AILabSection({ aiLab, onAddItem, onUpdateItem, onDeleteItem }) {
  const { isOwner } = useAuth();
  const [selectedExperiment, setSelectedExperiment] = useState(aiLab[0] || null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [deletingItem, setDeletingItem] = useState(null);

  // Sync if selected experiment changes or is deleted
  const currentExp = aiLab.find((e) => e.id === selectedExperiment?.id) || aiLab[0] || null;

  const handleOpenAdd = () => {
    setEditingItem(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingItem(item);
    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingItem) {
      onUpdateItem(editingItem.id, data);
    } else {
      const added = onAddItem(data);
      setSelectedExperiment(added);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingItem) {
      onDeleteItem(deletingItem.id);
      if (currentExp?.id === deletingItem.id) {
        setSelectedExperiment(aiLab.find((e) => e.id !== deletingItem.id) || null);
      }
      setDeletingItem(null);
    }
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
        tag="AI LAB & RESEARCH"
        title="Cognitive Systems & Experiments"
        description="Exploring retrieval augmented generation (RAG), Socratic pedagogical models, document understanding, and multi-agent systems."
        action={
          isOwner && (
            <GlassButton variant="primary" icon={Plus} onClick={handleOpenAdd}>
              Add Experiment
            </GlassButton>
          )
        }
      />

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px',
          alignItems: 'start',
        }}
      >
        {/* Left: Experiment Selection List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {aiLab.map((exp) => {
            const isSelected = currentExp?.id === exp.id;
            return (
              <motion.div
                key={exp.id}
                whileHover={{ scale: 1.01 }}
                onClick={() => setSelectedExperiment(exp)}
                style={{ cursor: 'pointer' }}
              >
                <div
                  className="glass-card"
                  style={{
                    padding: '20px 24px',
                    border: isSelected
                      ? '1px solid rgba(255, 43, 67, 0.45)'
                      : '1px solid rgba(255, 255, 255, 0.07)',
                    background: isSelected
                      ? 'linear-gradient(135deg, rgba(25, 20, 30, 0.85) 0%, rgba(14, 14, 20, 0.75) 100%)'
                      : 'rgba(15, 15, 22, 0.6)',
                    boxShadow: isSelected
                      ? '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(255, 43, 67, 0.15)'
                      : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      marginBottom: '8px',
                    }}
                  >
                    <span
                      className="glass-tag"
                      style={{
                        color: isSelected ? 'var(--accent-red)' : 'var(--text-muted)',
                        borderColor: isSelected ? 'rgba(255, 43, 67, 0.3)' : 'rgba(255, 255, 255, 0.08)',
                      }}
                    >
                      {exp.category}
                    </span>
                    <span
                      style={{
                        fontSize: '0.75rem',
                        fontFamily: 'var(--font-mono)',
                        color: exp.status === 'Operational' ? '#4ade80' : '#facc15',
                      }}
                    >
                      ● {exp.status}
                    </span>
                  </div>

                  <h4
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#ffffff',
                      margin: '0 0 8px 0',
                    }}
                  >
                    {exp.title}
                  </h4>

                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.86rem',
                      lineHeight: '1.45',
                      margin: 0,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {exp.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Right: Selected Experiment Deep Dive & Code Terminal */}
        {currentExp && (
          <motion.div
            key={currentExp.id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.35 }}
            style={{ position: 'sticky', top: '100px' }}
          >
            <div
              className="glass-panel-elevated"
              style={{
                padding: '32px',
                background: 'rgba(12, 12, 18, 0.9)',
                border: '1px solid rgba(255, 43, 67, 0.3)',
              }}
            >
              {/* Header with Title and Owner Controls */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  gap: '16px',
                  marginBottom: '20px',
                }}
              >
                <div>
                  <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                    <span className="glass-tag glass-tag-red">{currentExp.category}</span>
                    <span className="glass-tag">{currentExp.status}</span>
                  </div>
                  <h3
                    style={{
                      fontFamily: 'var(--font-display)',
                      fontSize: '1.5rem',
                      fontWeight: 800,
                      color: '#ffffff',
                      margin: 0,
                    }}
                  >
                    {currentExp.title}
                  </h3>
                </div>

                {isOwner && (
                  <div style={{ display: 'flex', gap: '8px' }}>
                    <button
                      type="button"
                      onClick={() => handleOpenEdit(currentExp)}
                      title="Edit Experiment"
                      style={{
                        background: 'rgba(255, 255, 255, 0.06)',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                        color: 'var(--text-secondary)',
                        padding: '8px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Edit3 size={15} />
                    </button>
                    <button
                      type="button"
                      onClick={() => setDeletingItem(currentExp)}
                      title="Delete Experiment"
                      style={{
                        background: 'rgba(255, 43, 67, 0.12)',
                        border: '1px solid rgba(255, 43, 67, 0.3)',
                        color: '#ff6b7e',
                        padding: '8px',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                )}
              </div>

              {/* Description */}
              <p
                style={{
                  color: 'var(--text-secondary)',
                  fontSize: '0.96rem',
                  lineHeight: '1.65',
                  marginBottom: '24px',
                }}
              >
                {currentExp.description}
              </p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px', marginBottom: '24px' }}>
                {(currentExp.tags || []).map((t, i) => (
                  <span
                    key={i}
                    style={{
                      padding: '4px 10px',
                      borderRadius: '6px',
                      background: 'rgba(255, 255, 255, 0.04)',
                      border: '1px solid rgba(255, 255, 255, 0.08)',
                      color: 'var(--text-primary)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                    }}
                  >
                    #{t}
                  </span>
                ))}
              </div>

              {/* Metrics Grid */}
              {currentExp.metrics && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
                    gap: '12px',
                    marginBottom: '24px',
                  }}
                >
                  {Object.entries(currentExp.metrics).map(([key, val]) => (
                    <div
                      key={key}
                      style={{
                        padding: '14px',
                        borderRadius: '10px',
                        background: 'rgba(255, 255, 255, 0.02)',
                        border: '1px solid rgba(255, 255, 255, 0.06)',
                      }}
                    >
                      <div
                        style={{
                          fontSize: '0.72rem',
                          fontFamily: 'var(--font-mono)',
                          color: 'var(--text-muted)',
                          textTransform: 'uppercase',
                          marginBottom: '4px',
                        }}
                      >
                        {key}
                      </div>
                      <div
                        style={{
                          fontSize: '1.05rem',
                          fontFamily: 'var(--font-mono)',
                          fontWeight: 700,
                          color: 'var(--accent-red)',
                        }}
                      >
                        {val}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Terminal Code Snippet */}
              {currentExp.codeSnippet && (
                <div
                  style={{
                    borderRadius: '10px',
                    background: '#050508',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    overflow: 'hidden',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '10px 16px',
                      background: 'rgba(20, 20, 28, 0.6)',
                      borderBottom: '1px solid rgba(255, 255, 255, 0.08)',
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff5f56' }} />
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ffbd2e' }} />
                      <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#27c93f' }} />
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.75rem',
                        color: 'var(--text-muted)',
                      }}
                    >
                      pipeline-sample.ts
                    </span>
                  </div>

                  <pre
                    style={{
                      margin: 0,
                      padding: '16px',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      lineHeight: '1.6',
                      color: '#e4e4e7',
                      overflowX: 'auto',
                    }}
                  >
                    <code>{currentExp.codeSnippet}</code>
                  </pre>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </div>

      <AILabModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        itemToEdit={editingItem}
      />

      <ConfirmModal
        isOpen={Boolean(deletingItem)}
        onClose={() => setDeletingItem(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete AI Experiment?"
        message={`Are you sure you want to remove "${deletingItem?.title}"?`}
        confirmText="Delete"
        danger={true}
      />
    </div>
  );
}
