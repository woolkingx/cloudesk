'use client';
import React from 'react';

interface InfoWidgetProps {
  variant: 'info' | 'loading' | 'success' | 'warning';
  title: string;
  message: string;
  onRemove?: () => void;
}

export function InfoWidget({ variant, title, message, onRemove }: InfoWidgetProps) {
  const variantStyles: Record<string, React.CSSProperties> = {
    info: {
      background: '#e3f2fd',
      border: '1px solid #64b5f6',
      color: '#1565c0'
    },
    loading: {
      background: '#f5f5f5',
      border: '1px solid #bdbdbd',
      color: '#424242'
    },
    success: {
      background: '#e8f5e9',
      border: '1px solid #81c784',
      color: '#2e7d32'
    },
    warning: {
      background: '#fff8e1',
      border: '1px solid #ffb74d',
      color: '#f57c00'
    }
  };

  const style = variantStyles[variant] || variantStyles.info;

  const buttonStyle: React.CSSProperties = {
    background: 'transparent',
    color: style.color,
    border: `1px solid ${style.color}`,
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginTop: '12px'
  };

  return (
    <div style={{ padding: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500', color: style.color }}>
        {title}
      </h3>
      <div style={{
        padding: '12px',
        background: style.background,
        border: style.border,
        borderRadius: '4px',
        minHeight: '60px',
        marginBottom: '12px',
        color: style.color
      }}>
        {variant === 'loading' ? (
          <span>⏳ {message}</span>
        ) : (
          <span>{message}</span>
        )}
      </div>
      {onRemove && (
        <button onClick={onRemove} style={buttonStyle}>
          關閉
        </button>
      )}
    </div>
  );
}
