'use client';
import React, { useState } from 'react';

interface ErrorHandleWidgetProps {
  data: {
    message?: string;
  };
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function ErrorHandleWidget({ data, onUpdate, onRemove }: ErrorHandleWidgetProps) {
  const [message, setMessage] = useState<string>(data?.message || '未知錯誤');

  const editMessage = () => {
    const newMessage = prompt('編輯錯誤訊息:', message);
    if (newMessage !== null) {
      setMessage(newMessage);
      onUpdate({ message: newMessage });
    }
  };

  const buttonStyle: React.CSSProperties = {
    background: '#1976d2',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    padding: '6px 12px',
    fontSize: '12px',
    cursor: 'pointer',
    textTransform: 'uppercase',
    marginRight: '8px'
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'transparent',
    color: '#f44336',
    border: '1px solid #f44336'
  };

  return (
    <div style={{ padding: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500', color: '#f44336' }}>
        錯誤處理
      </h3>
      <div style={{
        padding: '12px',
        background: '#fff3f3',
        border: '1px solid #f44336',
        borderRadius: '4px',
        minHeight: '60px',
        marginBottom: '12px',
        color: '#b71c1c'
      }}>
        {message}
      </div>
      <div>
        <button onClick={editMessage} style={buttonStyle}>
          編輯訊息
        </button>
        <button onClick={onRemove} style={deleteButtonStyle}>
          刪除 Widget
        </button>
      </div>
    </div>
  );
}
