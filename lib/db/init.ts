import { db } from './connection';
import { Database } from 'better-sqlite3';
import initData from '../../data/init-data.json';
export function initializeDatabase() {
db.exec(`
    CREATE TABLE IF NOT EXISTS widgets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      data TEXT NOT NULL
    );
  `);
  const count = (db.prepare('SELECT COUNT(*) AS count FROM widgets').get() as { count: number }).count;
  if (count === 0) {
    const insert = db.prepare('INSERT INTO widgets (type, data) VALUES (?, ?)');
    initData.forEach(widget => insert.run(widget.type, JSON.stringify(widget.data)));
  }
}