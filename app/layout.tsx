'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { StatusBar } from '../components/StatusBar';
import { PopupMenu } from '../components/popup-menu';
import { DebugOverlay } from '../components/DebugOverlay';
import { useWorksheet } from '../hooks/useWorksheet';
import WidgetRenderer from '@/components/widget-renderer';

// Widget type 定義（保證符合 WidgetRenderer 需求）
interface Widget {
  id: string;
  type: 'todo' | 'note' | 'chart' | 'error';
  title: string;
  data: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  workspaceId?: string;
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();

  const {
    worksheets,
    currentWorksheet,
    switchWorksheet
  } = useWorksheet();

  const [debugVisible, setDebugVisible] = useState(false);

  const handleWorksheetSwitch = (id: string) => {
    switchWorksheet(id);
    router.push(`/workspace/${id}`);
  };

  const handleFetch = (url: string) => {
    console.log(`Fetching ${url}`);
  };

  const toggleDebug = () => {
    setDebugVisible((prev) => !prev);
  };

  // 全局 Debug 用 Widget
  const debugWidget: Widget[] = [
    {
      id: 'debug-error-1',
      type: 'error',
      title: '全局 Debug Widget',
      data: { message: '這是全局除錯 Widget，確認渲染正常' },
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      workspaceId: 'debug'
    }
  ];

  return (
    <html lang="en">
      <body className="min-h-screen bg-gray-100 flex flex-col">
        {/* StatusBar */}
        <StatusBar
          worksheets={worksheets}
          currentWorksheet={currentWorksheet}
          onWorksheetSwitch={handleWorksheetSwitch}
          debugInfo={debugVisible ? 'Debug Mode ON' : null}
          onDebugToggle={toggleDebug}
        />

        {/* Main Content */}
        <main className="flex-1 p-4 relative">
          {children}
        </main>

        {/* 全局 Debug WidgetRenderer */}
        <WidgetRenderer
          widgets={debugWidget}
          onWidgetUpdate={(id, newData) => {
            console.log('全局 Debug Widget 更新:', id, newData);
          }}
          onWidgetRemove={(id) => {
            console.log('全局 Debug Widget 移除:', id);
          }}
        />

        {/* Debug Overlay */}
        {debugVisible && (
          <DebugOverlay onHide={toggleDebug}>
            Debugging info active...
          </DebugOverlay>
        )}

        {/* PopupMenu */}
        <PopupMenu onFetch={handleFetch} />
      </body>
    </html>
  );
}
