'use client';
import React from 'react';
import { StatusBar } from '../StatusBar';
import { Worksheet } from '../../hooks/useWorksheet';

interface AppLayoutProps {
  children: React.ReactNode;
  title?: string;
  debugInfo?: React.ReactNode;
  worksheets?: Worksheet[];
  currentWorksheet?: string;
  onWorksheetSwitch?: (id: string) => void;
  onDebugHide?: () => void; // 新增 onDebugHide 屬性
}

export function AppLayout({ 
  children, 
  title = " CloudDesk OS", 
  debugInfo,
  worksheets = [],
  currentWorksheet = '',
  onWorksheetSwitch = () => {}
}: AppLayoutProps) {
  return (
    <div style={{ 
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      display: 'flex',
      flexDirection: 'column'
    }}>
      {/* Status Bar */}
      <StatusBar 
        worksheets={worksheets}
        currentWorksheet={currentWorksheet}
        onWorksheetSwitch={onWorksheetSwitch}
      />


      {/* 主要內容 */}
      <main className="flex items-center justify-center" style={{
        flex: 1,
        position: 'relative'
      }}>
        {children}
      </main>

      {/* 調試資訊 */}
      {debugInfo && (
        <div style={{
          position: 'fixed',
          top: 'var(--status-bar-height, 50px)', // 動態計算位置
          left: '10px',
          background: 'rgba(0,0,0,0.8)',
          color: 'white',
          padding: '8px 12px',
          borderRadius: '6px',
          fontSize: '12px',
          fontFamily: 'monospace',
          zIndex: 1001,
          maxWidth: '300px'
        }}>
          {debugInfo}
        </div>
      )}
    </div>
  );
}