'use client';
import React, { useState } from 'react';

interface ChartWidgetProps {
  data: {
    values?: number[];
  };
  onUpdate: (data: any) => void;
  onRemove: () => void;
}

export function ChartWidget({ data, onUpdate, onRemove }: ChartWidgetProps) {
  const [values, setValues] = useState<number[]>(data?.values || []);

  const editValues = () => {
    const input = prompt('輸入逗號分隔的數字（如 10,20,30）:', values.join(','));
    if (input !== null) {
      const newValues = input
        .split(',')
        .map((v) => parseFloat(v.trim()))
        .filter((n) => !isNaN(n));
      setValues(newValues);
      onUpdate({ values: newValues });
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
      <h3 style={{ margin: '0 0 12px 0', fontSize: '16px', fontWeight: '500' }}>圖表</h3>
      <div style={{
        padding: '12px',
        background: '#f5f5f5',
        borderRadius: '4px',
        minHeight: '60px',
        marginBottom: '12px'
      }}>
        {values.length > 0
          ? `數值: ${values.join(', ')}`
          : <span style={{ color: '#999' }}>（尚無數據）</span>}
      </div>
      <div>
        <button onClick={editValues} style={buttonStyle}>
          編輯數據
        </button>
        <button onClick={onRemove} style={deleteButtonStyle}>
          刪除 Widget
        </button>
      </div>
    </div>
  );
}
