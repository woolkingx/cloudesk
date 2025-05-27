import React from 'react';

interface ErrorStateProps {
  error: string;
  onRetry?: () => void;
}

export function ErrorState({ error, onRetry }: ErrorStateProps) {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '50vh',
      gap: '16px',
      padding: '20px'
    }}>
      <div style={{ fontSize: '48px' }}>⚠️</div>
      <h2 style={{ color: '#d32f2f', margin: 0 }}>載入錯誤</h2>
      <p style={{ color: '#666', textAlign: 'center', maxWidth: '400px' }}>
        {error}
      </p>
      {onRetry && (
        <button 
          onClick={onRetry}
          style={{
            padding: '12px 24px',
            backgroundColor: '#007bff',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
        >
          重新載入
        </button>
      )}
    </div>
  );
}