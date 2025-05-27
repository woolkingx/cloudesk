# Project File List

## App Directory
- **app/** - 主應用程式目錄
  - globals.css - 全局樣式
  - layout.tsx - 應用佈局
  - page.tsx - 主頁面組件
  - api/ - API 路由
    - mcp/ - MCP 相關路由
      - generate/ - 生成路由
        - route.ts - 生成 API 路由
    - test/ - 測試相關路由
      - route.ts - 測試 API 路由
      - ai/ - AI 相關路由
        - route.ts - AI API 路由
      - db/ - DB 相關路由
        - route.ts - DB API 路由
      - health/ - 健康檢查路由
        - route.ts - 健康檢查 API 路由
      - widgets/ - Widgets 相關路由
        - route.ts - Widgets API 路由
    - widgets/ - Widgets API 路由
      - route.ts - Widgets API 路由
  - test/ - 測試頁面
    - page.tsx - 測試頁面組件

## Components Directory
- **components/** - 組件目錄
  - android-card.tsx - Android 風格卡片組件
  - popup-menu.tsx - 下拉選單組件
  - status-bar.tsx - 狀態列組件
  - widget-renderer.tsx - Widget 渲染組件
  - layout/ - 佈局組件
    - AppLayout.tsx - 應用佈局組件
    - LoadingState.tsx - 載入狀態組件
    - ErrorState.tsx - 錯誤狀態組件
  - ui/ - UI 組件
    - card.tsx - 卡片組件
    - dropdown-menu.tsx - 下拉選單組件
  - widgets/ - Widget 組件
    - chart-widget.tsx - 圖表 Widget
    - error-handle-widget.tsx - 錯誤處理 Widget
    - note-widget.tsx - 筆記 Widget
    - todo-widget.tsx - 待辦事項 Widget

## Hooks Directory
- **hooks/** - 自定義 Hook 目錄
  - useWidgets.ts - Widget 狀態管理 Hook
  - useApiTesting.ts - API 測試 Hook

## Other Files
- .env - 環境變數檔案
- checklist.md - 檢查清單
- components.json - 組件配置
- Dockerfile - Docker 配置檔
- filelist.md - 檔案列表
- next-env.d.ts - Next.js 環境定義
- next.config.js - Next.js 配置檔
- package-lock.json - npm 鎖定檔
- package.json - npm 配置檔
- postcss.config.js - PostCSS 配置檔
- README.md - 專案說明文件
- tailwind.config.js - Tailwind CSS 配置檔
- tsconfig.json - TypeScript 配置檔
- vercel.json - Vercel 配置檔
- data/ - 資料目錄
  - init-data.json - 初始化資料
  - widgets.db - Widgets 資料庫
- lib/ - 庫目錄
  - ai-controller.ts - AI 控制器
  - ai-generator.ts - AI 生成器
  - utils.ts - 工具函數
  - voice-input.ts - 語音輸入
  - db/ - 資料庫相關
    - connection.ts - 資料庫連接
    - init.ts - 資料庫初始化
    - queries.ts - 資料庫查詢
    - schema.sql - 資料庫結構
- store/ - 狀態管理
  - status.ts - 狀態管理
- tests/ - 測試目錄
  - api.spec.ts - API 測試
  - db.spec.ts - DB 測試
  - frontend.spec.ts - 前端測試
  - integration.spec.ts - 整合測試
  - state-dump.spec.ts - 狀態轉儲測試

## 主要功能說明
- **Widget 管理**: 使用 `useWidgets` hook 來管理 Widget 的載入、更新和刪除。
- **API 測試**: 使用 `useApiTesting` hook 來測試 API 並獲取回應。
- **佈局組件**: 使用 `AppLayout` 組件來統一應用的佈局。
- **載入和錯誤狀態**: 使用 `LoadingState` 和 `ErrorState` 組件來顯示載入和錯誤信息。
- **響應式設計**: 所有組件均支持響應式設計，適應不同螢幕尺寸。