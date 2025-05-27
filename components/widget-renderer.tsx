'use client';
import React from 'react';
import { AndroidCard } from 'components/android-card';
import TodoWidget from 'components/widgets/todo-widget';
import NoteWidget from 'components/widgets/note-widget';
import ChartWidget from 'components/widgets/chart-widget';
import ErrorHandleWidget from 'components/widgets/error-handle-widget';

interface Widget {
  id: string;
  type: 'todo' | 'note' | 'chart' | 'error';
  title: string;
  data: any;
  position: { x: number; y: number };
  size: { width: number; height: number };
  workspaceId?: string;
}

interface WidgetRendererProps {
  widgets: Widget[];
  onWidgetUpdate?: (id: string, data: any) => void;
  onWidgetRemove?: (id: string) => void;
}

export function WidgetRenderer({ widgets, onWidgetUpdate, onWidgetRemove }: WidgetRendererProps) {
  console.log('WidgetRenderer 收到的 widgets:', widgets);
  console.log('widgets 類型:', typeof widgets);
  console.log('是否為陣列:', Array.isArray(widgets));
  
  // 確保 widgets 是陣列
  const safeWidgets = Array.isArray(widgets) ? widgets : [];

  const renderWidget = (widget: Widget) => {
    const handleUpdate = (newData: any) => {
      onWidgetUpdate?.(widget.id, newData);
    };

    const handleRemove = () => {
      onWidgetRemove?.(widget.id);
    };

    // 根據 widget 類型渲染對應的組件
    let WidgetComponent: React.ReactNode;

    switch (widget.type) {
      case 'todo':
        WidgetComponent = (
          <TodoWidget
            data={widget.data}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        );
        break;
        
      case 'note':
        WidgetComponent = (
          <NoteWidget
            data={widget.data}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        );
        break;
        
      case 'chart':
        WidgetComponent = (
          <ChartWidget
            data={widget.data}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        );
        break;
        
      case 'error':
        WidgetComponent = (
          <ErrorHandleWidget
            data={widget.data}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        );
        break;
        
      default:
        WidgetComponent = (
          <div style={{
            padding: '20px',
            textAlign: 'center',
            color: '#999'
          }}>
            未知的 Widget 類型: {widget.type}
          </div>
        );
    }

    return (
      <AndroidCard
        key={widget.id}
        title={widget.title}
        subtitle={`${widget.type} widget`}
        elevation="elevated"
        content={WidgetComponent}
      />
    );
  };

  return (
    <div style={{
      padding: '16px',
      backgroundColor: '#f5f5f5',
      minHeight: '100vh',
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
      gap: '16px',
      alignContent: 'start'
    }}>
      {safeWidgets.map((widget) => renderWidget(widget))}
      
      {safeWidgets.length === 0 && (
        <div style={{
          gridColumn: '1 / -1',
          textAlign: 'center',
          padding: '48px',
          color: 'rgba(0, 0, 0, 0.6)'
        }}>
          <h3 style={{ margin: '0 0 8px 0', fontWeight: '400' }}>
            暫無 Widget ({widgets ? widgets.length : 0})
          </h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            使用右下角的選單來測試和新增 Widget
          </p>
        </div>
      )}
    </div>
  );
}