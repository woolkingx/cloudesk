'use client';
import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';

export interface Worksheet {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error' | 'loading';
  widgetCount: number;
  lastUpdate: Date;
}

export function useWorksheet() {
  const params = useParams();
  const rawId = params?.id;
  const urlId = Array.isArray(rawId) ? rawId[0] : rawId || 'workspace-1';

  const [currentWorksheet, setCurrentWorksheet] = useState<string>(urlId);
  const [worksheets, setWorksheets] = useState<Worksheet[]>([
    {
      id: 'workspace-1',
      name: 'Workspace 1',
      status: 'active',
      widgetCount: 0,
      lastUpdate: new Date(),
    },
    {
      id: 'workspace-2',
      name: 'Workspace 2',
      status: 'idle',
      widgetCount: 0,
      lastUpdate: new Date(),
    },
    {
      id: 'workspace-3',
      name: 'Workspace 3',
      status: 'idle',
      widgetCount: 0,
      lastUpdate: new Date(),
    },
  ]);

  useEffect(() => {
    setCurrentWorksheet(urlId);
    setWorksheets((prev) =>
      prev.map((ws) => ({
        ...ws,
        status: ws.id === urlId ? 'active' : 'idle',
      }))
    );
  }, [urlId]);

  const switchWorksheet = (id: string) => {
    setWorksheets((prev) =>
      prev.map((ws) => ({
        ...ws,
        status: ws.id === id ? 'active' : 'idle',
      }))
    );
    setCurrentWorksheet(id);
  };

  const updateWorksheetStatus = (id: string, status: Worksheet['status']) => {
    setWorksheets((prev) =>
      prev.map((ws) =>
        ws.id === id ? { ...ws, status, lastUpdate: new Date() } : ws
      )
    );
  };

  const updateWidgetCount = (id: string, count: number) => {
    setWorksheets((prev) =>
      prev.map((ws) =>
        ws.id === id
          ? { ...ws, widgetCount: count, lastUpdate: new Date() }
          : ws
      )
    );
  };

  return {
    worksheets,
    currentWorksheet,
    switchWorksheet,
    updateWorksheetStatus,
    updateWidgetCount,
  };
}
