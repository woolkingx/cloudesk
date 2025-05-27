import { NextRequest } from 'next/server';
import { getWidgets } from '../../../lib/db/queries';
import { db } from '../../../lib/db/connection';

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = req.nextUrl;
    const type = searchParams.get('type') || 'health';
  
    if (type === 'health') {
      return Response.json({ status: 'healthy', timestamp: new Date().toISOString() });
    }
    
    if (type === 'db') {
      try {
        // 檢查資料庫連線
        const result = db.prepare('SELECT COUNT(*) as count FROM widgets').get() as { count: number };
        return Response.json({ dbStatus: 'connected', widgetCount: result.count as number });
      } catch (err) {
        return Response.json({ dbStatus: 'disconnected', error: (err as Error).message });
      }
    }
    
    if (type === 'widgets') {
      try {
        // 從資料庫抓取 widgets
        const widgets = await getWidgets();
        return Response.json({ widgets });
      } catch (err: any) {
        return Response.json({ error: '資料庫錯誤', details: err.message }, { status: 500 });
      }
    }
    
    if (type === 'ai') {
      try {
        // 模擬 AI 模組檢查
        const aiResponse = await fetch('/api/mcp/generate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ intent: 'test' }),
        });
        
        if (aiResponse.ok) {
          const aiData = await aiResponse.json();
          return Response.json({ aiStatus: 'active', response: aiData });
        }
        
        return Response.json({ error: 'AI 模組無回應', details: 'AI module not responding' }, { status: 500 });
      } catch (err: any) {
        return Response.json({ error: 'AI 模組無回應', details: err.message }, { status: 500 });
      }
    }
    
    return Response.json({ error: 'Unknown test type' }, { status: 400 });

  
  
} catch (error) {
  console.error(error);
  return Response.json({ error: String(error) }, { status: 500 });
}
}