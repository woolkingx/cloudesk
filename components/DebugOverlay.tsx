import React from 'react';

interface DebugOverlayProps {
  children: React.ReactNode;
  statusBarPosition: 'top' | 'bottom';
  isVisible: boolean;
  onHide: () => void;
}

export function DebugOverlay({ children, statusBarPosition, isVisible, onHide }: DebugOverlayProps) {
  if (!isVisible) {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        ...(statusBarPosition === 'top' 
          ? { top: '50px', left: '10px' } 
          : { bottom: '50px', left: '10px' }
        ),
        background: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '12px 16px',
        borderRadius: '8px',
        fontSize: '13px',
        fontFamily: 'monospace',
        zIndex: 1001,
        maxWidth: '280px',
        boxShadow: '0 4px 12px rgba(0,0,0,0.4)',
        border: '1px solid rgba(255,255,255,0.1)',
        animation: 'slideIn 0.3s ease-out',
        backdropFilter: 'blur(10px)'
      }}
    >
      {/* 標題 */}
      <div style={{
        fontSize: '11px',
        color: '#4fc3f7',
        marginBottom: '6px',
        fontWeight: '600',
        paddingRight: '20px'
      }}>
        📊 Worksheet 狀態
      </div>

      {/* 調試內容 */}
      <div style={{ paddingRight: '20px', lineHeight: '1.4' }}>
        {children}
      </div>

      {/* CSS 動畫 */}
      <style jsx>{`
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateX(-20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }
      `}</style>
    </div>
  );
}