import { db } from '../../../../lib/db/connection';

export async function GET() {
  try {
    const result = db.prepare('SELECT 1').get();
    return Response.json({ status: 'ok', result });
  } catch (error) {
    return Response.json({ status: 'error', error: String(error) }, { status: 500 });
  }
}