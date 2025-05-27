'use client';
import React, { useState } from 'react';

interface NoteWidgetProps {
  data: {
    text?: string;
  };
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function NoteWidget({ data, onUpdate, onRemove }: NoteWidgetProps) {
  const [note, setNote] = useState<string>(data?.text || '');

  const editNote = () => {
    const newNote = prompt('編輯筆記內容:', note);
    if (newNote !== null) {
      setNote(newNote);
      onUpdate({ text: newNote });
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
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500' }}>筆記</h3>
      <div style={{
        padding: '12px',
        background: '#f5f5f5',
        borderRadius: '4px',
        minHeight: '60px',
        marginBottom: '12px'
      }}>
        {note || <span style={{ color: '#999' }}>（尚無內容）</span>}
      </div>
      <div>
        <button onClick={editNote} style={buttonStyle}>
          編輯筆記
        </button>
        <button onClick={onRemove} style={deleteButtonStyle}>
          刪除 Widget
        </button>
      </div>
    </div>
  );
}
