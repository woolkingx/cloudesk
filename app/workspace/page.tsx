'use client';
import { useRouter } from 'next/navigation';
import { AppLayout } from '@/components/layout/AppLayout';
import { useWorksheet, Worksheet } from '@/hooks/useWorksheet';

export default function WorkspaceOverviewPage() {
  const router = useRouter();
  const { worksheets, currentWorksheet, switchWorksheet } = useWorksheet();

  const handleWorksheetSwitch = (id: string) => {
    switchWorksheet(id);
    router.push(`/workspace/${id}`);
  };

  return (
    <AppLayout 
      title="工作區總覽 - CloudDesk OS"
      worksheets={worksheets}
      currentWorksheet={currentWorksheet}
      onWorksheetSwitch={handleWorksheetSwitch}
    >
      <div style={{ padding: '24px' }}>
        <h1 style={{ 
          fontSize: '24px', 
          marginBottom: '24px',
          color: '#333'
        }}>
          選擇工作區
        </h1>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '20px',
          maxWidth: '1000px'
        }}>
          {worksheets.map((workspace: Worksheet) => (
            <div
              key={workspace.id}
              onClick={() => handleWorksheetSwitch(workspace.id)}
              style={{
                background: 'white',
                border: workspace.id === currentWorksheet 
                  ? '2px solid #007bff' 
                  : '1px solid #e0e0e0',
                borderRadius: '12px',
                padding: '24px',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: workspace.id === currentWorksheet
                  ? '0 4px 16px rgba(0, 123, 255, 0.2)'
                  : '0 2px 8px rgba(0,0,0,0.1)'
              }}
              onMouseEnter={(e) => {
                if (workspace.id !== currentWorksheet) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.15)';
                }
              }}
              onMouseLeave={(e) => {
                if (workspace.id !== currentWorksheet) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
                }
              }}
            >
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                marginBottom: '16px'
              }}>
                <span style={{
                  fontSize: '24px',
                  color: workspace.status === 'active' ? '#4caf50' : '#9e9e9e'
                }}>
                  ●
                </span>
                <h3 style={{
                  margin: 0,
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#333'
                }}>
                  {workspace.name}
                </h3>
                {workspace.id === currentWorksheet && (
                  <span style={{
                    background: '#007bff',
                    color: 'white',
                    padding: '2px 8px',
                    borderRadius: '12px',
                    fontSize: '12px',
                    fontWeight: '500'
                  }}>
                    當前
                  </span>
                )}
              </div>
              
              <div style={{
                fontSize: '16px',
                color: '#666',
                marginBottom: '12px'
              }}>
                {workspace.widgetCount} 個 widgets
              </div>
              
              <div style={{
                fontSize: '14px',
                color: '#999',
                marginBottom: '16px'
              }}>
                最後更新: {workspace.lastUpdate.toLocaleTimeString('zh-TW')}
              </div>
              
              <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
              }}>
                <span style={{
                  fontSize: '14px',
                  color: workspace.status === 'active' ? '#4caf50' : '#9e9e9e',
                  fontWeight: '500'
                }}>
                  {workspace.status === 'active' ? '● 活躍中' : 
                   workspace.status === 'loading' ? '◐ 載入中' :
                   workspace.status === 'error' ? '⚠ 錯誤' : '○ 閒置'}
                </span>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleWorksheetSwitch(workspace.id);
                  }}
                  style={{
                    background: workspace.id === currentWorksheet ? '#007bff' : 'transparent',
                    color: workspace.id === currentWorksheet ? 'white' : '#007bff',
                    border: '1px solid #007bff',
                    borderRadius: '6px',
                    padding: '6px 12px',
                    fontSize: '14px',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease'
                  }}
                >
                  {workspace.id === currentWorksheet ? '當前工作區' : '切換'}
                </button>
              </div>
            </div>
          ))}
        </div>
        
        {/* 快速說明 */}
        <div style={{
          marginTop: '32px',
          padding: '16px',
          background: '#f8f9fa',
          borderRadius: '8px',
          color: '#666',
          fontSize: '14px'
        }}>
          💡 <strong>提示：</strong> 你可以點擊上方 StatusBar 的工作區按鈕快速切換，或直接點擊卡片進入對應的工作區。
        </div>
      </div>
    </AppLayout>
  );
}