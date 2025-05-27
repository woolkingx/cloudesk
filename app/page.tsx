'use client';
import { useDebugInfo } from '../hooks/useDebugInfo.js'; // 添加 .js 副檔名
import { useWorksheet } from '../hooks/useWorksheet.js'; // 添加 .js 副檔名
import { AppLayout } from '../components/layout/AppLayout.js'; // 添加 .js 副檔名
import { useRouter } from 'next/navigation'; // 新增
import { PopupMenu } from '../components/popup-menu.js';

export default function Page({ children }: { children: React.ReactNode }) {
  const router = useRouter(); // 新增
  const { 
    worksheets, 
    currentWorksheet, 
    switchWorksheet, 
    updateWorksheetStatus,
    updateWidgetCount 
  } = useWorksheet();

  // 新增 debug hook
  const { isVisible: debugVisible, triggerShow, hide: hideDebug } = useDebugInfo();

  const handleWorksheetSwitch = (id: string) => {
    switchWorksheet(id);
    router.push(`/workspace/${id}`); // 新增導航
    triggerShow(id); // 觸發調試資訊顯示
    // 這裡可以加載不同 worksheet 的資料
  };

  const handleFetch = (url: string) => {
    console.log(`Fetching ${url}`);
    // 可以用 fetch(url).then(...) 來測試
  };

  return (
    <AppLayout 
      debugInfo={debugVisible ? "Debug Info" : null} // 使用簡單的 debugInfo
      worksheets={worksheets}
      currentWorksheet={currentWorksheet}
      onWorksheetSwitch={handleWorksheetSwitch}
      onDebugHide={hideDebug} // 新增隱藏回調
    >
      {children} // 添加 children 屬性
      <PopupMenu onFetch={handleFetch} />
      {/* 其他內容保持不變 */}
    </AppLayout>
  );
}