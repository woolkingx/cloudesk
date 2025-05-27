import { useState, useRef, useEffect } from 'react';

export function PopupMenu({ onFetch }: { onFetch: (url: string) => void }) {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
  const buttonRef = useRef<HTMLButtonElement>(null);

  // 使用 useEffect 在客戶端初始化位置
  useEffect(() => {
    if (typeof window !== 'undefined') {
      setPosition({ 
        x: window.innerWidth - 120, 
        y: window.innerHeight - 120 
      });
    }
  }, []);

  // 計算展開方向 (四個象限)
  const getMenuPosition = () => {
    if (typeof window === 'undefined') {
      return { bottom: 'auto', top: '100%', left: '0', right: 'auto', marginTop: '8px' };
    }
    
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;
    
    const isLeft = position.x < centerX;
    const isTop = position.y < centerY;
    
    if (isLeft && isTop) {
      // 左上象限 - 向右下展開
      return { bottom: 'auto', top: '100%', left: '0', right: 'auto', marginTop: '8px' };
    } else if (!isLeft && isTop) {
      // 右上象限 - 向左下展開
      return { bottom: 'auto', top: '100%', right: '0', left: 'auto', marginTop: '8px' };
    } else if (isLeft && !isTop) {
      // 左下象限 - 向右上展開
      return { top: 'auto', bottom: '100%', left: '0', right: 'auto', marginBottom: '8px' };
    } else {
      // 右下象限 - 向左上展開
      return { top: 'auto', bottom: '100%', right: '0', left: 'auto', marginBottom: '8px' };
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isOpen) return; // 如果選單開啟，不允許拖拉
    
    setIsDragging(true);
    const rect = buttonRef.current?.getBoundingClientRect();
    if (rect) {
      setDragOffset({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top
      });
    }
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging || typeof window === 'undefined') return;

      const newX = e.clientX - dragOffset.x;
      const newY = e.clientY - dragOffset.y;
      
      // 限制在視窗範圍內
      const buttonSize = 60;
      const clampedX = Math.max(0, Math.min(window.innerWidth - buttonSize, newX));
      const clampedY = Math.max(0, Math.min(window.innerHeight - buttonSize, newY));
      
      setPosition({ x: clampedX, y: clampedY });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isDragging, dragOffset]);

  const handleClick = (e: React.MouseEvent) => {
    if (isDragging) {
      e.preventDefault();
      return;
    }
    setIsOpen(!isOpen);
  };

  const menuPosition = getMenuPosition();

  return (
    <div style={{ 
      position: 'fixed', 
      left: `${position.x}px`,
      top: `${position.y}px`,
      zIndex: 1000,
      userSelect: 'none'
    }}>
      <button
        ref={buttonRef}
        onMouseDown={handleMouseDown}
        onClick={handleClick}
        style={{
          width: '60px',
          height: '60px',
          borderRadius: '50%',
          backgroundColor: '#007bff',
          border: 'none',
          fontSize: '18px',
          color: 'white',
          cursor: isDragging ? 'grabbing' : (isOpen ? 'pointer' : 'grab'),
          outline: 'none',
          transition: isDragging ? 'none' : 'all 0.2s ease',
          boxShadow: '0 4px 20px rgba(0, 123, 255, 0.4)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          transform: isDragging ? 'scale(1.1)' : 'scale(1)',
        }}
        onMouseEnter={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = '#0056b3';
            e.currentTarget.style.transform = 'scale(1.05)';
          }
        }}
        onMouseLeave={(e) => {
          if (!isDragging) {
            e.currentTarget.style.backgroundColor = '#007bff';
            e.currentTarget.style.transform = 'scale(1)';
          }
        }}
      >
        <svg
          style={{ 
            width: '24px', 
            height: '24px',
            transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s ease'
          }}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          {isOpen ? (
            // X 圖示 (關閉)
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          ) : (
            // + 圖示 (展開)
            <path
              fillRule="evenodd"
              d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
              clipRule="evenodd"
            />
          )}
        </svg>
      </button>

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            ...menuPosition,
            minWidth: '200px',
            backgroundColor: 'white',
            border: '1px solid #dee2e6',
            borderRadius: '12px',
            boxShadow: '0 8px 25px rgba(0, 0, 0, 0.15)',
            overflow: 'hidden',
            animation: 'fadeInUp 0.2s ease-out forwards',
          }}
        >
          <div style={{ padding: '8px 0' }}>
            <button
              onClick={() => {
                onFetch('/api/test/db');
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px',
                color: '#495057',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              📊 呼叫 DB API
            </button>
            <button
              onClick={() => {
                onFetch('/api/test/widgets');
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px',
                color: '#495057',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              🔧 測試 Widgets
            </button>
            <button
              onClick={() => {
                onFetch('/api/test/ai');
                setIsOpen(false);
              }}
              style={{
                display: 'block',
                width: '100%',
                textAlign: 'left',
                padding: '12px 16px',
                border: 'none',
                backgroundColor: 'transparent',
                fontSize: '14px',
                color: '#495057',
                cursor: 'pointer',
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#f8f9fa';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
              }}
            >
              🤖 測試 AI
            </button>
          </div>
        </div>
      )}
      
      {/* Click outside to close */}
      {isOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999,
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
      
      {/* Add keyframes animation via style tag */}
      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
}