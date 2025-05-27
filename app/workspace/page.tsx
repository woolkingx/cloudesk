'use client';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useWorksheet } from '@/hooks/useWorksheet';

export default function WorkspaceOverviewPage() {
  const router = useRouter();
  const { worksheets, currentWorksheet, switchWorksheet } = useWorksheet();

  const handleSwitch = (id: string) => {
    if (id !== currentWorksheet) {
      switchWorksheet(id);
      router.push(`/workspace/${id}`);
    }
  };

  return (
    <AppLayout
      worksheets={worksheets}
      currentWorksheet={currentWorksheet}
      onWorksheetSwitch={handleSwitch}
    >
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">工作區總覽</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {worksheets.map((ws) => (
            <div
              key={ws.id}
              className="border p-4 rounded shadow cursor-pointer hover:bg-gray-50"
              onClick={() => handleSwitch(ws.id)}
            >
              <h2 className="text-xl font-semibold">{ws.name}</h2>
              <p>狀態: {ws.status}</p>
              <p>Widget 數量: {ws.widgetCount}</p>
            </div>
          ))}
        </div>
      </div>
    </AppLayout>
  );
}
