import React, { useState } from 'react';
import { SectionHeader } from '../Common/SectionHeader';
import { ProjectCard } from './ProjectCard';
import { ProjectDetailModal } from './ProjectDetailModal';
import { ProjectFormModal } from './ProjectFormModal';
import { ConfirmModal } from '../Common/ConfirmModal';
import { GlassButton } from '../Common/GlassButton';
import { Plus, Filter } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function ProjectsSection({ projects, onAddProject, onUpdateProject, onDeleteProject }) {
  const { isOwner } = useAuth();
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [viewingProject, setViewingProject] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [deletingProject, setDeletingProject] = useState(null);

  const categories = ['All', 'AI Systems', 'Full-Stack & AI', 'Backend & Systems', 'Design Systems'];

  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  const handleOpenAdd = () => {
    setEditingProject(null);
    setIsFormOpen(true);
  };

  const handleOpenEdit = (project) => {
    setEditingProject(project);
    setIsFormOpen(true);
  };

  const handleSaveForm = (data) => {
    if (editingProject) {
      onUpdateProject(editingProject.id, data);
    } else {
      onAddProject(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingProject) {
      onDeleteProject(deletingProject.id);
      setDeletingProject(null);
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
        tag="SYSTEM PORTFOLIO"
        title="Featured Engineering Works"
        description="Scalable distributed architectures, high-performance web systems, and autonomous cognitive AI frameworks built with modern engineering standards."
        action={
          isOwner && (
            <GlassButton variant="primary" icon={Plus} onClick={handleOpenAdd}>
              Add Project
            </GlassButton>
          )
        }
      />

      {/* Filter Tabs */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '8px',
          marginBottom: '36px',
        }}
      >
        {categories.map((cat) => {
          const isActive = selectedCategory === cat;
          return (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 18px',
                borderRadius: '999px',
                background: isActive ? 'rgba(255, 43, 67, 0.18)' : 'rgba(255, 255, 255, 0.04)',
                border: isActive
                  ? '1px solid rgba(255, 43, 67, 0.5)'
                  : '1px solid rgba(255, 255, 255, 0.08)',
                color: isActive ? '#ffffff' : 'var(--text-secondary)',
                fontFamily: 'var(--font-body)',
                fontSize: '0.85rem',
                fontWeight: isActive ? 600 : 400,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = '#fff';
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = 'var(--text-secondary)';
              }}
            >
              {cat}
            </button>
          );
        })}
      </div>

      {/* Projects Grid */}
      {filteredProjects.length === 0 ? (
        <div
          className="glass-card"
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ fontSize: '1.1rem', margin: '0 0 16px 0' }}>No projects found in this category.</p>
          {isOwner && (
            <GlassButton variant="primary" icon={Plus} onClick={handleOpenAdd}>
              Create First Project
            </GlassButton>
          )}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(330px, 1fr))',
            gap: '28px',
          }}
        >
          {filteredProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={setViewingProject}
              onEdit={handleOpenEdit}
              onDelete={setDeletingProject}
            />
          ))}
        </div>
      )}

      {/* Detail Modal */}
      <ProjectDetailModal
        isOpen={Boolean(viewingProject)}
        onClose={() => setViewingProject(null)}
        project={viewingProject}
      />

      {/* Add / Edit Form Modal */}
      <ProjectFormModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        onSave={handleSaveForm}
        projectToEdit={editingProject}
      />

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        isOpen={Boolean(deletingProject)}
        onClose={() => setDeletingProject(null)}
        onConfirm={handleDeleteConfirm}
        title="Delete Project?"
        message={`Are you sure you want to permanently delete "${deletingProject?.title}"? This action cannot be undone.`}
        confirmText="Delete Project"
        danger={true}
      />
    </div>
  );
}
