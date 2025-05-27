'use client';
import React, { useState } from 'react';

interface TodoWidgetProps {
  data: {
    items?: string[];
  };
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function TodoWidget({ data, onUpdate, onRemove }: TodoWidgetProps) {
  const [items, setItems] = useState<string[]>(data?.items || []);

  const addItem = () => {
    const newItem = prompt('輸入新項目:');
    if (newItem && newItem.trim() !== '') {
      const updatedItems = [...items, newItem.trim()];
      setItems(updatedItems);
      onUpdate({ items: updatedItems });
    }
  };

  const removeItem = (index: number) => {
    const updatedItems = items.filter((_, i) => i !== index);
    setItems(updatedItems);
    onUpdate({ items: updatedItems });
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
    marginLeft: '8px'
  };

  const deleteButtonStyle: React.CSSProperties = {
    ...buttonStyle,
    background: 'transparent',
    color: '#f44336',
    border: '1px solid #f44336'
  };

  return (
    <div style={{ padding: '12px' }}>
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500' }}>待辦事項</h3>
      <ul style={{ listStyleType: 'none', padding: 0, margin: 0 }}>
        {items.length === 0 ? (
          <li style={{ color: '#999', fontSize: '14px' }}>目前沒有待辦項目</li>
        ) : (
          items.map((item, index) => (
            <li
              key={index}
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: '8px'
              }}
            >
              <span>{item}</span>
              <button
                onClick={() => removeItem(index)}
                style={deleteButtonStyle}
              >
                刪除
              </button>
            </li>
          ))
        )}
      </ul>

      <div style={{ marginTop: '12px' }}>
        <button onClick={addItem} style={buttonStyle}>
          新增項目
        </button>
        <button onClick={onRemove} style={deleteButtonStyle}>
          刪除整個 Widget
        </button>
      </div>
    </div>
  );
}
