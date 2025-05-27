📘 **CloudDesk OS 開發計劃 + 對應 Checklist**

-–

### 🏗️ 開發總覽
基於白皮書 v5，依照 Function / Behave / Structure 展開，並附上詳細 checklist，逐步開發並檢核完成度。

-–

### ✅ Function（功能模組）Checklist

- [ ] `app/api/mcp/generate/route.ts` → 是否正確接收 intent 並回傳 JSON
- [ ] WidgetRenderer → 是否能正確渲染各 type
- [ ] MCP API → 是否正確接收 intent 並回傳 JSON
- [ ] AI Controller → 是否能處理文字/語音指令，呼叫 AI API
- [ ] SQLite 儲存 → 是否能完整儲存系統狀態與 widget 資料

### ✅ 互動功能 Checklist
- [ ] Popup Menu → 是否能顯示所有 widget 與 AI 入口
- [ ] Widget 拖拉 → 是否能自由拖拉與排序
- [ ] Widget 縮放 → 是否能切換大小狀態
- [ ] Widget 變色 → 是否能更換主題顏色
- [ ] Widget 最大化/收合 → 是否能切換顯示模式
- [ ] Guided UI → 是否能正確引導用戶操作

### ✅ 擴展功能 Checklist
- [ ] AI API 設定 → 是否支援多家模型與 API key
- [ ] 語音輸入模組 → 是否能接受語音指令並轉換文字
- [ ] 狀態快照與還原 → 是否能正確記錄與還原系統場景

-–

### ✅ Behave（行為細節）Checklist
- [ ] WidgetRenderer fallback → 是否正確處理未知 type
- [ ] AI 指令分析 → 是否能拆解動作並正確執行
- [ ] 狀態記錄 → 是否能追蹤所有互動並寫入 SQLite
- [ ] API 安全性 → 是否全面採用 prepared statements
- [ ] 前端效能 → 是否實作 lazy loading、按需渲染

-–

### ✅ Structure（結構與檔案）Checklist
- [ ] `components/widget-renderer.tsx` → 是否具備中央渲染邏輯
- [ ] `components/widgets/*` → 是否每個 widget 獨立模組化
- [ ] `components/popup-menu.tsx` → 是否整合 AI 與 widget 選單
- [ ] `lib/ai-controller.ts` → 是否正確分派 AI 指令
- [ ] `lib/db/*` → 是否有 connection/init/queries 清楚拆分
- [ ] `store/status.ts` → 是否正確管理全局狀態
- [ ] `tests/*` → 是否涵蓋 api、db、frontend、integration 測試
- [ ] `data/init-data.json` → 是否包含完整初始資料
- [ ] `.env` → 是否正確設置 API key、DB 路徑、環境變數

-–

👉 下一步：
- 需要產生詳細的 milestone 表嗎？
- 還是要直接開始對每一項目展開代碼實作？

- [ ] `app/page.tsx` → 是否正確整合所有元件與狀態管理
- [ ] `app/layout.tsx` → 是否正確包裹全局佈局與 provider
- [ ] `components/status-bar.tsx` → 是否正確顯示系統狀態與 AI 回應
- [ ] `lib/ai-generator.ts` → 是否正確轉換 intent 為 widget JSON
- [ ] `components/widgets/todo-widget.tsx` → 是否正確實現 TODO 功能
- [ ] `components/widgets/note-widget.tsx` → 是否正確實現 Note 功能
- [ ] `components/widgets/chart-widget.tsx` → 是否正確實現 Chart 功能
- [ ] `components/widgets/error-handle-widget.tsx` → 是否正確實現 Error 處理功能
直接告訴我！
