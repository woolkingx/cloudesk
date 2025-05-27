import { useState, useEffect } from 'react';

interface Widget {
  id: string;
  type: 'todo' | 'note' | 'chart';
  title: string;
  data: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
}

export function useWidgets() {
  const [widgets, setWidgets] = useState<Widget[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadWidgets = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/widgets');
      const data = await response.json();
      console.log('載入的 widgets:', data);
      
      if (data && data.widgets && Array.isArray(data.widgets)) {
        setWidgets(data.widgets);
      } else if (Array.isArray(data)) {
        setWidgets(data);
      } else {
        setWidgets([]);
      }
      setError(null);
    } catch (err) {
      console.error('載入失敗:', err);
      setError(err instanceof Error ? err.message : '載入失敗');
      setWidgets([]);
    } finally {
      setLoading(false);
    }
  };

  const updateWidget = async (id: string, data: any) => {
    try {
      const response = await fetch(`/api/widgets/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ data })
      });
      
      if (response.ok) {
        await loadWidgets(); // 重新載入
      }
    } catch (error) {
      console.error('更新 widget 失敗:', error);
    }
  };

  const removeWidget = async (id: string) => {
    try {
      const response = await fetch(`/api/widgets/${id}`, {
        method: 'DELETE'
      });
      
      if (response.ok) {
        setWidgets(widgets.filter(w => w.id !== id));
      }
    } catch (error) {
      console.error('刪除 widget 失敗:', error);
    }
  };

  useEffect(() => {
    loadWidgets();
  }, []);

  return {
    widgets,
    loading,
    error,
    loadWidgets,
    updateWidget,
    removeWidget
  };
}