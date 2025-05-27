import { describe, it, expect } from 'vitest';
import { initializeDatabase } from '../lib/db/init';
import { getWidgets } from '../lib/db/queries';

describe('資料庫初始化測試', () => {
  it('應該成功初始化資料庫並插入初始資料', () => {
    initializeDatabase();
    const widgets = getWidgets();
    console.log('--- 初始化後 Widget 數量:', widgets.length);
    expect(widgets.length).toBeGreaterThan(0);
  });
});