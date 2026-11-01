import React, { useState } from 'react';
import { SectionHeader } from '../Common/SectionHeader';
import { TeamCard } from './TeamCard';
import { TeamMemberModal } from './TeamMemberModal';
import { ConfirmModal } from '../Common/ConfirmModal';
import { GlassButton } from '../Common/GlassButton';
import { Plus, Users } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function TeamSection({
  team,
  onAddMember,
  onUpdateMember,
  onDeleteMember,
  onReorderTeam,
}) {
  const { isOwner } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [deletingMember, setDeletingMember] = useState(null);

  const handleOpenAdd = () => {
    setEditingMember(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (member) => {
    setEditingMember(member);
    setIsModalOpen(true);
  };

  const handleSave = (data) => {
    if (editingMember) {
      onUpdateMember(editingMember.id, data);
    } else {
      onAddMember(data);
    }
  };

  const handleDeleteConfirm = () => {
    if (deletingMember) {
      onDeleteMember(deletingMember.id);
      setDeletingMember(null);
    }
  };

  const handleMoveUp = (index) => {
    if (index <= 0) return;
    const newTeam = [...team];
    const temp = newTeam[index];
    newTeam[index] = newTeam[index - 1];
    newTeam[index - 1] = temp;
    onReorderTeam(newTeam);
  };

  const handleMoveDown = (index) => {
    if (index >= team.length - 1) return;
    const newTeam = [...team];
    const temp = newTeam[index];
    newTeam[index] = newTeam[index + 1];
    newTeam[index + 1] = temp;
    onReorderTeam(newTeam);
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
        tag="COLLABORATION NETWORK"
        title="Engineering Squad & Collaborators"
        description="High-caliber engineers, researchers, and systems specialists collaborating to build world-class cognitive products."
        action={
          isOwner && (
            <GlassButton variant="primary" icon={Plus} onClick={handleOpenAdd}>
              Add Team Member
            </GlassButton>
          )
        }
      />

      {team.length === 0 ? (
        <div
          className="glass-card"
          style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: 'var(--text-muted)',
          }}
        >
          <p style={{ fontSize: '1.1rem', margin: '0 0 16px 0' }}>No team members listed.</p>
          {isOwner && (
            <GlassButton variant="primary" icon={Plus} onClick={handleOpenAdd}>
              Add First Member
            </GlassButton>
          )}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '28px',
          }}
        >
          {team.map((member, idx) => (
            <TeamCard
              key={member.id}
              member={member}
              index={idx}
              totalMembers={team.length}
              onEdit={handleOpenEdit}
              onDelete={setDeletingMember}
              onMoveUp={handleMoveUp}
              onMoveDown={handleMoveDown}
            />
          ))}
        </div>
      )}

      <TeamMemberModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        memberToEdit={editingMember}
      />

      <ConfirmModal
        isOpen={Boolean(deletingMember)}
        onClose={() => setDeletingMember(null)}
        onConfirm={handleDeleteConfirm}
        title="Remove Team Member?"
        message={`Are you sure you want to remove "${deletingMember?.name}" from the squad?`}
        confirmText="Remove"
        danger={true}
      />
    </div>
  );
}
