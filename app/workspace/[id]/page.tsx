'use client';
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import WidgetRenderer from '@/components/widget-renderer';
import type { Widget } from '@/types/widget';

export default function WorkspaceDetailPage() {
  const params = useParams();
  const workspaceId = Array.isArray(params.id) ? params.id[0] : params.id;

  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchWidgets() {
      try {
        setLoading(true);
        const res = await fetch(`/api/test?type=widgets&workspaceId=${workspaceId}`);
        const json = await res.json();
        setWidgets(Array.isArray(json.widgets) ? json.widgets : []);
        setError(null);
      } catch (err) {
        console.error('載入 widget 錯誤:', err);
        setError('載入 widget 錯誤');
        setWidgets([]);
      } finally {
        setLoading(false);
      }
    }

    if (workspaceId) {
      fetchWidgets();
    }
  }, [workspaceId]);

  const displayWidgets = [...widgets];

  if (loading) {
    displayWidgets.push({
      id: 'loading-status',
      type: 'loading',
      title: '載入中',
      data: { message: '正在載入工作區資料，請稍候...' },
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      workspaceId: 'status'
    });
  }

  if (error) {
    displayWidgets.push({
      id: 'error-status',
      type: 'error',
      title: '載入錯誤',
      data: { message: error },
      position: { x: 0, y: 0 },
      size: { width: 1, height: 1 },
      workspaceId: 'status'
    });
  }

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">工作區內容 - {workspaceId}</h1>
      <WidgetRenderer
        widgets={displayWidgets}
        onWidgetUpdate={(id, newData) => console.log('更新 widget', id, newData)}
        onWidgetRemove={(id) => console.log('刪除 widget', id)}
      />
    </div>
  );
}
