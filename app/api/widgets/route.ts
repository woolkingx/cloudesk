export async function GET() {
  const widgets = await getWidgets();
  return Response.json({ widgets });
}

import { getWidgets } from '../../../lib/db/queries';
// Import database functions