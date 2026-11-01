import React from 'react';

export class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('Unhandled Application Error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div
          style={{
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: '#08080c',
            color: '#ffffff',
            padding: '24px',
            textAlign: 'center',
            fontFamily: 'sans-serif',
          }}
        >
          <div
            style={{
              padding: '36px',
              maxWidth: '540px',
              borderRadius: '16px',
              background: 'rgba(20, 20, 28, 0.8)',
              border: '1px solid rgba(255, 43, 67, 0.3)',
              boxShadow: '0 20px 50px rgba(0, 0, 0, 0.8)',
            }}
          >
            <h2 style={{ fontFamily: 'var(--font-display)', color: '#ff4d64', marginBottom: '12px' }}>
              System Recovery Mode
            </h2>
            <p style={{ color: '#a1a1aa', fontSize: '0.95rem', lineHeight: '1.6', marginBottom: '24px' }}>
              An unexpected condition was intercepted. Your persisted portfolio data is intact.
            </p>
            <button
              type="button"
              onClick={() => {
                this.setState({ hasError: false });
                window.location.reload();
              }}
              style={{
                padding: '12px 28px',
                borderRadius: '8px',
                background: '#ff2b43',
                color: '#ffffff',
                border: 'none',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              Reinitialize System
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
