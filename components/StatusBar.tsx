'use client';
import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Worksheet } from '@/hooks/useWorksheet';

interface StatusBarProps {
  worksheets: Worksheet[];
  currentWorksheet: string;
  onWorksheetSwitch: (id: string) => void;
}

export function StatusBar({ worksheets, currentWorksheet, onWorksheetSwitch }: StatusBarProps) {
  const router = useRouter();
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      setTime(new Date().toLocaleTimeString('zh-TW', { 
        hour12: false, 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    };

    updateTime();
    const intervalId = setInterval(updateTime, 60000); // 每分鐘更新一次

    return () => clearInterval(intervalId);
  }, []);

  // 拖拉相關狀態
  const [position, setPosition] = useState<'top' | 'bottom'>('top');
  const [isDragging, setIsDragging] = useState(false);
  const [dragY, setDragY] = useState(0);
  const [startY, setStartY] = useState(0);
  const barRef = useRef<HTMLDivElement>(null);

  // 從 localStorage 恢復位置偏好
  useEffect(() => {
    const savedPosition = localStorage.getItem('statusbar-position') as 'top' | 'bottom';
    console.log('Saved position from localStorage:', savedPosition);
    if (savedPosition) {
      setPosition(savedPosition);
    }
  }, []);

  const getStatusColor = (status: Worksheet['status']) => {
    switch (status) {
      case 'active': return '#4caf50';
      case 'loading': return '#ff9800';
      case 'error': return '#f44336';
      case 'idle': return '#9e9e9e';
      default: return '#9e9e9e';
    }
  };

  const getStatusIcon = (status: Worksheet['status']) => {
    switch (status) {
      case 'active': return '●';
      case 'loading': return '◐';
      case 'error': return '⚠';
      case 'idle': return '○';
      default: return '○';
    }
  };

  // 拖拉處理函數
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setStartY(e.clientY);
    setDragY(0);
    document.body.style.userSelect = 'none';
    e.preventDefault();
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;
    
    const deltaY = e.clientY - startY;
    setDragY(deltaY);
    
    // 視覺回饋 - 當拖拉超過螢幕中間時改變透明度
    const screenHeight = window.innerHeight;
    const threshold = screenHeight / 2;
    
    if (position === 'top' && deltaY > threshold) {
      // 拖拉到下半部，準備切換到底部
      if (barRef.current) {
        barRef.current.style.opacity = '0.7';
      }
    } else if (position === 'bottom' && deltaY < -threshold) {
      // 拖拉到上半部，準備切換到頂部
      if (barRef.current) {
        barRef.current.style.opacity = '0.7';
      }
    } else {
      if (barRef.current) {
        barRef.current.style.opacity = '1';
      }
    }
  };

  const handleMouseUp = () => {
    if (!isDragging) return;
    
    setIsDragging(false);
    document.body.style.userSelect = '';
    
    const screenHeight = window.innerHeight;
    const threshold = screenHeight / 3; // 降低閾值，更容易觸發
    
    // 決定最終位置
    let newPosition = position;
    
    if (position === 'top' && dragY > threshold) {
      newPosition = 'bottom';
    } else if (position === 'bottom' && dragY < -threshold) {
      newPosition = 'top';
    }
    
    // 更新位置並保存偏好
    if (newPosition !== position) {
      setPosition(newPosition);
      localStorage.setItem('statusbar-position', newPosition);
    }
    
    // 重置拖拉狀態
    setDragY(0);
    if (barRef.current) {
      barRef.current.style.opacity = '1';
    }
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, startY, position, dragY]);

  return (
    <div
      ref={barRef}
      onMouseDown={handleMouseDown}
      style={{
        height: '40px',
        backgroundColor: '#2c3e50',
        borderBottom: position === 'top' ? '1px solid #34495e' : 'none',
        borderTop: position === 'bottom' ? '1px solid #34495e' : 'none',
        display: 'flex',
        alignItems: 'center',
        padding: '0 16px',
        gap: '16px',
        fontSize: '14px',
        color: 'white',
        position: 'fixed',
        left: 0,
        right: 0,
        zIndex: 1000,
        boxShadow: position === 'top' 
          ? '0 2px 4px rgba(0,0,0,0.1)' 
          : '0 -2px 4px rgba(0,0,0,0.1)',
        cursor: isDragging ? 'grabbing' : 'grab',
        transition: isDragging ? 'none' : 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...(position === 'top' ? { top: 0 } : { bottom: 0 }),
        ...(isDragging && {
          transform: `translateY(${dragY}px)`,
        })
      }}
    >
      {/* 拖拉指示器 */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        marginRight: '8px',
        fontSize: '12px',
        color: '#95a5a6',
        userSelect: 'none'
      }}>
        <span style={{ transform: 'rotate(90deg)' }}>⋮⋮</span>
      </div>

      {/* Logo/Title */}
      <div style={{ 
        fontWeight: '600',
        marginRight: '24px',
        color: '#ecf0f1'
      }}>
        CloudDesk OS
      </div>

      {/* Worksheet Tabs */}
      <div style={{ 
        display: 'flex',
        gap: '8px',
        flex: 1
      }}>
        {worksheets.map(worksheet => (
          <button
            key={worksheet.id}
            onClick={(e) => {
              e.stopPropagation();
              onWorksheetSwitch(worksheet.id);
//              router.push(`/workspace/${worksheet.id}`); // 新增導航
            }}
            style={{
              background: worksheet.id === currentWorksheet 
                ? 'rgba(255,255,255,0.1)' 
                : 'transparent',
              border: worksheet.id === currentWorksheet 
                ? '1px solid rgba(255,255,255,0.2)' 
                : '1px solid transparent',
              borderRadius: '6px',
              padding: '6px 12px',
              color: 'white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              fontSize: '13px',
              transition: 'all 0.2s ease',
              outline: 'none'
            }}
            onMouseEnter={(e) => {
              if (worksheet.id !== currentWorksheet) {
                e.currentTarget.style.background = 'rgba(255,255,255,0.05)';
              }
            }}
            onMouseLeave={(e) => {
              if (worksheet.id !== currentWorksheet) {
                e.currentTarget.style.background = 'transparent';
              }
            }}
          >
            <span style={{ 
              color: getStatusColor(worksheet.status),
              fontSize: '12px'
            }}>
              {getStatusIcon(worksheet.status)}
            </span>
            <span>{worksheet.name}</span>
            {worksheet.widgetCount > 0 && (
              <span style={{
                background: 'rgba(255,255,255,0.2)',
                borderRadius: '10px',
                padding: '2px 6px',
                fontSize: '11px',
                fontWeight: '500'
              }}>
                {worksheet.widgetCount}
              </span>
            )}
          </button>
        ))}
      </div>
      
      {/* System Status */}
      <div style={{ 
        display: 'flex',
        alignItems: 'center',
        gap: '16px',
        marginLeft: 'auto',
        fontSize: '12px',
        color: '#bdc3c7'
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span style={{ color: '#4caf50' }}>●</span>
          <span>System OK</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
          <span>🕒</span>
          <span>{time}</span>
        </div>
      </div>
    </div>
  );
}