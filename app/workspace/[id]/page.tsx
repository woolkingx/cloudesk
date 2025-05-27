'use client';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useWorksheet } from '@/hooks/useWorksheet';

export default function WorkspacePage() {
  const router = useRouter();
  const { worksheets, currentWorksheet, switchWorksheet } = useWorksheet();

  const handleWorksheetSwitch = (id: string) => {
    // 如果已經在目標頁面，只觸發調試資訊
    if (id === currentWorksheet) {
      return;
    }
    
    // 切換 worksheet 狀態
    switchWorksheet(id);
    // 導航到新頁面
    router.push(`/workspace/${id}`);
  };
  return (
    <AppLayout 
//  title="工作區 - CloudDesk OS"
      worksheets={worksheets}
      currentWorksheet={currentWorksheet}
      onWorksheetSwitch={handleWorksheetSwitch}
    >
      <div className="flex items-center justify-center h-screen">
        <h1>工作區內容</h1>
        {/* 這裡可以添加工作區的具體內容 */}
      </div>
    </AppLayout>
  );

}