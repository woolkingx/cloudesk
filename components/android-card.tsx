import React from 'react';

interface AndroidCardProps {
  title?: string;
  subtitle?: string;
  content?: React.ReactNode;
  image?: string;
  actions?: React.ReactNode;
  onClick?: () => void;
  elevation?: 'elevated' | 'outlined' | 'filled';
  className?: string;
}

export function AndroidCard({ 
  title, 
  subtitle, 
  content, 
  image, 
  actions, 
  onClick,
  elevation = 'elevated',
  className = '' 
}: AndroidCardProps) {
  
  const getElevationStyles = () => {
    switch (elevation) {
      case 'elevated':
        return {
          backgroundColor: '#ffffff',
          boxShadow: '0 1dp 3dp rgba(0, 0, 0, 0.12), 0 1dp 2dp rgba(0, 0, 0, 0.24)',
          border: 'none'
        };
      case 'outlined':
        return {
          backgroundColor: '#ffffff',
          boxShadow: 'none',
          border: '1px solid rgba(0, 0, 0, 0.12)'
        };
      case 'filled':
        return {
          backgroundColor: '#f5f5f5',
          boxShadow: 'none',
          border: 'none'
        };
      default:
        return {};
    }
  };

  return (
    <div
      className={`android-card ${className}`}
      onClick={onClick}
      style={{
        ...getElevationStyles(),
        borderRadius: '12px',
        margin: '8px',
        overflow: 'hidden',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'all 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)',
        minHeight: '48px',
        position: 'relative',
      }}
      onMouseEnter={(e) => {
        if (onClick && elevation === 'elevated') {
          e.currentTarget.style.boxShadow = '0 2px 8px rgba(0, 0, 0, 0.15), 0 2px 4px rgba(0, 0, 0, 0.20)';
          e.currentTarget.style.transform = 'translateY(-1px)';
        }
      }}
      onMouseLeave={(e) => {
        if (onClick && elevation === 'elevated') {
          e.currentTarget.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)';
          e.currentTarget.style.transform = 'translateY(0)';
        }
      }}
    >
      {image && (
        <div style={{ 
          width: '100%', 
          height: '200px', 
          overflow: 'hidden',
          backgroundColor: '#f0f0f0'
        }}>
          <img
            src={image}
            alt={title || ''}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover'
            }}
          />
        </div>
      )}

      <div style={{ 
        padding: '16px',
        paddingBottom: actions ? '8px' : '16px'
      }}>
        {(title || subtitle) && (
          <div style={{ marginBottom: content ? '16px' : '0' }}>
            {title && (
              <h3 style={{
                margin: '0 0 4px 0',
                fontSize: '20px',
                fontWeight: '500',
                lineHeight: '24px',
                color: 'rgba(0, 0, 0, 0.87)',
                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                {title}
              </h3>
            )}
            {subtitle && (
              <p style={{
                margin: '0',
                fontSize: '14px',
                fontWeight: '400',
                lineHeight: '20px',
                color: 'rgba(0, 0, 0, 0.60)',
                fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
              }}>
                {subtitle}
              </p>
            )}
          </div>
        )}

        {content && (
          <div style={{
            fontSize: '14px',
            fontWeight: '400',
            lineHeight: '20px',
            color: 'rgba(0, 0, 0, 0.87)',
            fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif'
          }}>
            {content}
          </div>
        )}
      </div>

      {actions && (
        <div style={{
          padding: '8px 16px 16px 16px',
          display: 'flex',
          justifyContent: 'flex-end',
          gap: '8px',
          alignItems: 'center'
        }}>
          {actions}
        </div>
      )}
    </div>
  );
}

export function CardButton({ 
  children, 
  onClick, 
  variant = 'text' 
}: { 
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
}) {
  const getButtonStyles = () => {
    switch (variant) {
      case 'contained':
        return {
          backgroundColor: '#1976d2',
          color: 'white',
          border: 'none'
        };
      case 'outlined':
        return {
          backgroundColor: 'transparent',
          color: '#1976d2',
          border: '1px solid #1976d2'
        };
      case 'text':
      default:
        return {
          backgroundColor: 'transparent',
          color: '#1976d2',
          border: 'none'
        };
    }
  };

  return (
    <button
      onClick={onClick}
      style={{
        ...getButtonStyles(),
        padding: '8px 16px',
        borderRadius: '4px',
        fontSize: '14px',
        fontWeight: '500',
        textTransform: 'uppercase',
        cursor: 'pointer',
        transition: 'all 0.2s ease',
        fontFamily: 'Roboto, -apple-system, BlinkMacSystemFont, sans-serif',
        outline: 'none'
      }}
      onMouseEnter={(e) => {
        if (variant === 'text' || variant === 'outlined') {
          e.currentTarget.style.backgroundColor = 'rgba(25, 118, 210, 0.04)';
        } else {
          e.currentTarget.style.backgroundColor = '#1565c0';
        }
      }}
      onMouseLeave={(e) => {
        const styles = getButtonStyles();
        e.currentTarget.style.backgroundColor = styles.backgroundColor;
      }}
    >
      {children}
    </button>
  );
}