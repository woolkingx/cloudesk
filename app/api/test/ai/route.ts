export async function GET() {
  try {
    const result = 'AI 模組正常運作';
    return Response.json({ status: 'ok', result });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}