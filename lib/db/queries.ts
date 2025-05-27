import { db } from './connection';
export function getWidgets() {
// 確保資料庫初始化
  return db.prepare('SELECT * FROM widgets').all() as { id: number; type: string; data: any }[];
}
export function saveWidget(widget: { type: string; data: any }) {
  db.prepare('INSERT INTO widgets (type, data) VALUES (?, ?)').run(widget.type, JSON.stringify(widget.data));
}