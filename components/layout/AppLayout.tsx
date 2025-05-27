// components/layout/AppLayout.tsx

import React from 'react';
import type { Worksheet } from '@/types/worksheet';

export interface AppLayoutProps {
  children: React.ReactNode;
  worksheets: Worksheet[];
  currentWorksheet: string;
  onWorksheetSwitch: (id: string) => void;
}

export function AppLayout({
  children,
  worksheets,
  currentWorksheet,
  onWorksheetSwitch,
}: AppLayoutProps) {
  return (
    <div>
      {/* 假設有個側邊欄列出 worksheets */}
      <aside>
        {worksheets.map((ws) => (
          <button
            key={ws.id}
            className={ws.id === currentWorksheet ? 'font-bold' : ''}
            onClick={() => onWorksheetSwitch(ws.id)}
          >
            {ws.name}
          </button>
        ))}
      </aside>

      {/* 主內容 */}
      <main>{children}</main>
    </div>
  );
}

export default AppLayout;
