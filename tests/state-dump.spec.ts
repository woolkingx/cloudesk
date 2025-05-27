import { describe, it, expect } from 'vitest';
import { vi } from 'vitest';
import { getWidgets } from '../lib/db/queries';
import { initializeDatabase } from '../lib/db/init';

describe('狀態列出測試', () => {
  it('應該列出目前資料庫中的所有 widget 狀態', async () => {
    const res = await fetch('http://192.168.10.131:3000/api/test/widgets');
    expect(res.status).toBe(200);
    const data = await res.json();
    expect(data.widgets.length).toBeGreaterThanOrEqual(0);
    console.log('--- 所有 Widget 狀態 ---');
    data.widgets.forEach((w: { type: string; data: any }, i: number) => {
      console.log(`${i + 1}. 類型: ${w.type}`);
      console.log(`   資料: ${JSON.stringify(w.data)}`);
    });
    await initializeDatabase();
    const widgets = getWidgets();
// 延遲 100 毫秒以確保資料庫初始化完成
    await new Promise(resolve => setTimeout(resolve, 100));
    console.log('--- 所有 Widget 狀態 ---');
    widgets.forEach((w, i) => {
      console.log(`${i + 1}. 類型: ${w.type}`);
      console.log(`   資料: ${JSON.stringify(w.data)}`);
    });
    expect(widgets.length).toBeGreaterThanOrEqual(0);
  });
});