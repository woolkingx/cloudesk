export function generateWidget(intent) {
  return { type: 'todo', data: { items: [`AI 處理 ${intent}`] } };
}