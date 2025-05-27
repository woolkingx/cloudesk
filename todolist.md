📘 **CloudDesk OS 開發計劃與詳細 TODO 清單**

-–

### 🏗️ 開發總覽
目標：基於白皮書 v5，依照 Function / Behave / Structure 展開每個細節，逐步開發並對應功能模組。

-–

### ✅ Function（功能模組）

1️⃣ **核心功能**
- [ ] WidgetRenderer → 根據 JSON type 渲染對應元件
- [ ] MCP API → 接收 intent，產生對應 widget JSON
- [ ] AI Controller → 接收文字/語音指令，呼叫 AI API，驅動操作
- [ ] SQLite 儲存 → 儲存系統全狀態與 widget 資料

2️⃣ **互動功能**
- [ ] Popup Menu → 顯示所有 widget 與 AI 入口
- [ ] Widget 拖拉、縮放、變色、最大化、收合
- [ ] Guided UI → 用戶操作教學提示

3️⃣ **擴展功能**
- [ ] AI API 設定（支援多家模型）
- [ ] 語音輸入模組
- [ ] 狀態快照還原、場景調度

-–

### ✅ Behave（行為細節）

- [ ] WidgetRenderer fallback：不識別 type → 顯示 ErrorHandleWidget
- [ ] AI 指令分析：拆解為動作，例如更新 widget、切換主題
- [ ] 狀態記錄：所有互動都寫入 SQLite（包含拖拉、縮放、AI 操作）
- [ ] API 安全性：prepared statements 防止 SQL injection
- [ ] 前端效能：lazy loading、按需渲染

-–

### ✅ Structure（結構與檔案）

- [ ] `components/widget-renderer.tsx` → 中央渲染工廠
- [ ] `components/widgets/` → 每個 widget 單獨模組（todo, note, chart, error）
- [ ] `components/popup-menu.tsx` → 主入口 + AI 按鈕
- [ ] `lib/ai-controller.ts` → AI 模型呼叫與指令分派
- [ ] `lib/db/` → connection/init/queries 拆分模組
- [ ] `store/status.ts` → 全局 loading/error 狀態管理
- [ ] `tests/` → api, db, frontend, integration 測試分層
- [ ] `data/init-data.json` → 初始資料載入
- [ ] `.env` → AI API key、DB 路徑、環境變數

-–

### 📋 總結 TODO List

✅ 開發基礎框架
✅ 開發 MCP API 回傳 JSON
✅ 開發 WidgetRenderer + fallback
✅ 建立 SQLite + 儲存狀態機制
✅ 開發 Popup Menu + AI 按鈕
✅ 接入 AI Controller → 指令分析
✅ 建立語音輸入模組（前端）
✅ 強化互動（拖拉、縮放、變色、最大化、收合）
✅ 建立 Guided UI 模組
✅ 製作 init-data.json 與測試檔案
✅ 撰寫 README 與部署配置

-–
