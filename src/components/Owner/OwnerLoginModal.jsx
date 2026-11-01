import React, { useState } from 'react';
import { GlassModal } from '../Common/GlassModal';
import { GlassButton } from '../Common/GlassButton';
import { Lock, KeyRound, AlertCircle } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

export function OwnerLoginModal({ isOpen, onClose }) {
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const res = login(username, password);
    if (res.success) {
      setUsername('');
      setPassword('');
      onClose();
    } else {
      setError(res.message);
    }
  };

  return (
    <GlassModal isOpen={isOpen} onClose={onClose} title="Owner Authentication" maxWidth="440px">
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ textAlign: 'center', marginBottom: '8px' }}>
          <div
            style={{
              width: '48px',
              height: '48px',
              borderRadius: '12px',
              background: 'rgba(255, 43, 67, 0.14)',
              border: '1px solid rgba(255, 43, 67, 0.3)',
              color: 'var(--accent-red)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 12px auto',
            }}
          >
            <Lock size={22} />
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', margin: 0 }}>
            Enter owner credentials to unlock portfolio customization and system management.
          </p>
        </div>

        {error && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '10px 14px',
              borderRadius: '8px',
              background: 'rgba(255, 43, 67, 0.15)',
              border: '1px solid rgba(255, 43, 67, 0.35)',
              color: '#ff6b7e',
              fontSize: '0.82rem',
            }}
          >
            <AlertCircle size={16} />
            <span>{error}</span>
          </div>
        )}

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Username or Email
          </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder=""
            className="glass-input"
            autoFocus
            required
          />
        </div>

        <div>
          <label style={{ display: 'block', fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '6px' }}>
            Password
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="••••••••••••"
            className="glass-input"
            required
          />
        </div>


        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '10px' }}>
          <GlassButton onClick={onClose}>
            Cancel
          </GlassButton>
          <GlassButton type="submit" variant="primary" icon={KeyRound}>
            Unlock Owner Mode
          </GlassButton>
        </div>
      </form>
    </GlassModal>
  );
}
