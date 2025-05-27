#📘 **CloudDesk **#

CloudDesk 的目標是成為 AI 原生操作系統，打破傳統介面設計， 用語意驅動、智慧生成與自動化操作，基於 Web 技術預計通用於各類裝置。 CloudDesk aims to become an AI-native operating system, breaking away from traditional interface design, driven by semantics, intelligent generation, and automated operations, built on web technologies to run universally across devices.
-–

### 🏗️ 專案目標
基於 Next.js + SQLite + JSON 打造一個 AI 驅動作業平台，整合：模組化設計、popup menu（類似 Apple Launchpad）、可拖拉 widget、附屬控制按鈕（大小、顏色、縮放）、安卓風格引導、AI 控制層（文字輸入、語音輸入、API 設定），將系統狀態存入 SQLite，供 AI 驅動自動化操作與場景調度。

-–

### 📁 專案目錄與檔案說明
```


### 🌟 補充重點
✅ **WidgetRenderer** 是核心模組，負責：
- 接收從 API 回傳的 JSON
- 根據 `type` 轉換為 React 元件（todo, note, chart, error 等）
- 提供 fallback 與 error 處理
- 作為 AI 控制的更新入口（例如 AI 調整 todo、改變 chart 資料）

✅ **AI 功能整合**：
- 文字輸入、語音輸入
- 設定外部 API key
- 呼叫 AI 分析指令，自動更新 widget 或全局狀態
- 記錄所有操作到 SQLite，形成 context base

✅ **互動與視覺設計**：
- popup menu 使用動畫與過渡
- widget 支援拖拉、調整大小、顏色
- Guided UI 以安卓風格呈現，引導用戶操作

✅ **測試與最佳化**：
- 資料庫用 prepared statements 防止 SQL injection
- 前端引入 lazy loading 降低初始載入負擔
- ESLint + Prettier + Husky + lint-staged 做碼規與 pre-commit 驗證
- 提供 Vercel 或 Docker 部署

-–

### 📐 系統架構
```
┌────────────────────────────────────────────────────────────┐
│ Next.js 14 App Router │
├────────────────────────────────────────────────────────────┤
│ AI Popup Menu (文字/語音輸入 + API 設定) │
├────────────────────────────────────────────────────────────┤
│ AI Controller (分析指令、觸發系統操作) │
├────────────────────────────────────────────────────────────┤
│ WidgetRenderer (轉換 JSON → React 元件) │
├────────────────────────────────────────────────────────────┤
│ Widget Drag Manager + Control Bar (拖拉、大小、顏色) │
├────────────────────────────────────────────────────────────┤
│ Guided UI (安卓風格教學) │
├────────────────────────────────────────────────────────────┤
│ System State Manager (SQLite 儲存與讀取) │
└────────────────────────────────────────────────────────────┘
```

-–

### 🧪 測試計劃
- 測試 AI popup menu 與 API 呼叫
- 測試 AI 指令驅動 widget 更新
- 測試 WidgetRenderer 轉換 JSON 並渲染元件
- 測試 widget 拖拉、大小、顏色、縮放
- 測試狀態快照與還原
- 測試語音輸入（模擬或實機）
- 測試多場景與多 widget 類型互動

-–

### 🚀 開發與運行
- 安裝：`npm install`
- 開發：`npm run dev`
- 測試：`npx playwright test` + `npx vitest run`
- 部署：`vercel deploy` 或 `docker build`

需要設置：
- Node.js LTS (18.x+)
- `.env` 檔（AI API key、開發 IP、資料庫路徑）
- SQLite + SQLiteStudio
- VSCode 插件：Tailwind CSS IntelliSense、React Snippets、REST Client

-–
