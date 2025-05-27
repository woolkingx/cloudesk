'use client';

import { useState } from 'react';

export default function TestPage() {
  const [result, setResult] = useState('');

  const runCheck = async (endpoint: string) => {
    try {
      const res = await fetch(endpoint);
      const data = await res.json();
      setResult(JSON.stringify(data, null, 2));
    } catch (err: any) {
      setResult(`錯誤: ${err.message}`);
    }
  };

  return (
    <div className='p-6'>
      <div className='grid gap-2 mb-4'>
        <button onClick={() => runCheck('/api/test/health')} className='p-2 bg-green-500 text-white rounded'>健康檢查</button>
        <button onClick={() => runCheck('/api/test/db')} className='p-2 bg-blue-500 text-white rounded'>資料庫檢查</button>
        <button onClick={() => runCheck('/api/test/widgets')} className='p-2 bg-purple-500 text-white rounded'>列出所有 Widgets</button>
        <button onClick={() => runCheck('/api/test/ai')} className='p-2 bg-yellow-500 text-black rounded'>AI 模組檢查</button>
      </div>
      <pre className='p-4 bg-gray-100 rounded overflow-auto'>{result}</pre>
    </div>
  );
}