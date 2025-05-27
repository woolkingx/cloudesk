'use client';
import React from 'react';
import { AndroidCard } from '@/components/android-card';
import { TodoWidget } from '@/components/widgets/todo-widget';
import { NoteWidget } from '@/components/widgets/note-widget';
import { ChartWidget } from '@/components/widgets/chart-widget';
import { ErrorHandleWidget } from '@/components/widgets/error-handle-widget';
import { Widget, WidgetRendererProps } from '@/types/widget';

export default function WidgetRenderer({ widgets, onWidgetUpdate, onWidgetRemove }: WidgetRendererProps) {
  const renderWidget = (widget: Widget) => {
    const handleUpdate = (newData: unknown) => {
      onWidgetUpdate?.(widget.id, newData);
    };

    const handleRemove = () => {
      onWidgetRemove?.(widget.id);
    };

    let WidgetComponent: React.ReactNode;

    switch (widget.type) {
      case 'todo':
        WidgetComponent = (
          <TodoWidget
            data={widget.data as { items?: string[] }}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        );
        break;
      case 'note':
        WidgetComponent = (
          <NoteWidget
            data={widget.data as { text?: string }}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        );
        break;
      case 'chart':
        WidgetComponent = (
          <ChartWidget
            data={widget.data as { values?: number[] }}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        );
        break;
      case 'error':
        WidgetComponent = (
          <ErrorHandleWidget
            data={widget.data as { message?: string }}
            onUpdate={handleUpdate}
            onRemove={handleRemove}
          />
        );
        break;
      default:
        WidgetComponent = (
          <div style={{ padding: '20px', color: '#999' }}>
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
      {widgets.length > 0
        ? widgets.map(renderWidget)
        : (
          <div style={{ textAlign: 'center', color: '#aaa' }}>
            暫無 widgets
          </div>
        )}
    </div>
  );
}
