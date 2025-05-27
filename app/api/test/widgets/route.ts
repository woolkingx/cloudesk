import { getWidgets } from '../../../../lib/db/queries';
import { NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const widgets = await getWidgets();
    return Response.json({ widgets }, { headers: { 'Content-Type': 'application/json' } });
  } catch (error) {
    return Response.json({ error: String(error) }, { status: 500 });
  }
}