export async function POST(req) {
  const { intent } = await req.json();
  const widget = { type: 'todo', data: { items: ['AI 生成任務'] } };
  return Response.json(widget);
}