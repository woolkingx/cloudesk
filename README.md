# 🌟 CloudDesk OS

> **雲端級桌面操作系統** - 基於 Next.js 13+ 的現代化工作空間管理平台
    CloudDesk 的目標是成為 AI 原生操作系統，打破傳統介面設計，
    用語意驅動、智慧生成與自動化操作，基於 Web 技術預計通用於各類裝置。

CloudDesk aims to become an AI-native operating system, breaking away from traditional interface design,
driven by semantics, intelligent generation, and automated operations, built on web technologies to run universally across devices.

### 🏗️ 專案目標
基於 Next.js + SQLite + JSON 打造一個 AI 驅動作業平台，整合：模組化設計、popup menu（類似 Apple Launchpad）、可拖拉 widget、附屬控制按鈕（大小、顏色、縮放）、安卓風格引導、AI 控制層（文字輸入、語音輸入、API 設定），將系統狀態存入 SQLite，供 AI 驅動自動化操作與場景調度。

## ✨ 核心特色

### 🎪 可拖拉狀態列 (StatusBar)
- **智能位置切換** - 頂部 ↔ 底部拖拉切換
- **工作區管理** - 三個獨立工作空間快速切換
- **狀態指示器** - 實時顯示工作區狀態 (●活躍 ◐載入 ⚠錯誤 ○閒置)  
- **位置記憶** - localStorage 自動保存用戶偏好
- **系統監控** - 實時顯示系統狀態和時間

### 📊 多工作區系統
- **獨立路由** - `/workspace/workspace-1` `/workspace/workspace-2` `/workspace/workspace-3`
- **動態內容載入** - 每個工作區有獨立的 Widget 內容
- **URL 同步** - 瀏覽器前進/後退完全支援
- **無縫切換** - StatusBar 點擊即時跳轉頁面
- **錯誤處理** - 完善的載入狀態和錯誤處理

### 🧩 模組化 Widget 系統
- **TodoWidget** - 待辦事項管理 (新增/刪除/標記完成)
- **NoteWidget** - 富文本筆記編輯器
- **ChartWidget** - 數據可視化圖表
- **ErrorHandleWidget** - 錯誤信息處理和顯示
- **Android 卡片風格** - Material Design 3.0 規範

### 🎨 用戶體驗設計
- **響應式布局** - 完美適配桌面和移動設備
- **平滑動畫** - 60fps 流暢交互體驗
- **直觀導航** - 符合用戶習慣的操作邏輯
- **調試系統** - 開發者友好的調試界面

## 🚀 快速開始

### 環境要求
- **Node.js** 18.0 或更高版本
- **npm** 或 **yarn** 包管理器
- **現代瀏覽器** (Chrome 90+, Firefox 88+, Safari 14+)

### 安裝與運行

```bash
# 克隆項目
git clone https://github.com/woolkingx/cloudesk.git
cd cloudesk

# 安裝依賴
npm install
# 或
yarn install

# 啟動開發服務器
npm run dev
# 或  
yarn dev

# 建置生產版本
npm run build
npm start
# 或
yarn build
yarn start
```

### 訪問應用
- **開發環境**: http://localhost:3000
- **工作區 1**: http://localhost:3000/workspace/workspace-1
- **工作區 2**: http://localhost:3000/workspace/workspace-2  
- **工作區 3**: http://localhost:3000/workspace/workspace-3

## 🏗️ 技術架構

### 前端技術棧
```typescript
📦 Core Framework
├── Next.js 13+ (App Router)
├── React 18 (Client/Server Components)
├── TypeScript 5.0+ (Strict Mode)
└── Modern ES2022+ Features

🎨 UI/UX Framework  
├── Android Material Design 3.0
├── CSS-in-JS (Inline Styles)
├── Responsive Grid Layout
└── Smooth Animations & Transitions

🔧 State Management
├── Custom React Hooks
├── Context API (Minimal Usage)  
├── localStorage (Position Memory)
└── URL State Synchronization
```

### 核心架構模式
- **模組化組件設計** - 單一職責原則
- **Custom Hooks 狀態管理** - `useWorksheet`, `useDebugInfo`
- **路由驅動架構** - Next.js App Router
- **類型安全開發** - TypeScript 嚴格模式
- **服務器/客戶端分離** - 適當的組件標記

## 📁 項目結構

> 📋 **完整的檔案結構說明** → [查看 filelist.md](./filelist.md)

```
CloudDesk OS/
├── 🎪 StatusBar System
│   ├── components/StatusBar.tsx
│   └── hooks/useWorksheet.ts
├── 📊 Workspace System  
│   ├── app/workspace/[id]/page.tsx
│   └── app/workspace/page.tsx
├── 🧩 Widget System
│   ├── components/widgets/
│   ├── components/widget-renderer.tsx
│   └── components/android-card.tsx
└── 🛠️ Developer Tools
    ├── components/DebugOverlay.tsx
    ├── hooks/useDebugInfo.ts
    └── components/popup-menu.tsx
```

## 🎮 功能演示

### StatusBar 拖拉操作
```typescript
// 拖拉狀態列到頂部或底部
const handleDrag = () => {
  // 自動吸附到 top 或 bottom
  // 保存位置偏好到 localStorage
  // 更新所有相關組件位置
}
```

### 工作區切換
```typescript  
// 點擊 StatusBar 按鈕切換工作區
const switchWorkspace = (id: string) => {
  router.push(`/workspace/${id}`);
  // 同步更新狀態
  // 載入對應 Widgets
  // 顯示切換調試信息
}
```

### Widget 管理
```typescript
// 模組化 Widget 系統
<WidgetRenderer 
  widgets={widgets}
  onWidgetUpdate={handleUpdate}
  onWidgetRemove={handleRemove}
/>
```

## 🧪 測試與開發

### 開發工具
- **調試覆蓋層** - 實時顯示應用狀態
- **API 測試選單** - 內建 API 端點測試
- **熱重載開發** - 即時代碼更新
- **TypeScript 檢查** - 編譯時類型驗證

### 建置命令
```bash
# 類型檢查
npm run type-check

# 代碼檢查 
npm run lint

# 建置優化
npm run build

# 部署預覽
npm run start
```

## 🌟 亮點功能

### 🎯 智能交互
- StatusBar 可在螢幕頂部和底部之間拖拉切換
- 工作區按鈕點擊即時跳轉對應頁面
- Widget 支援即時編輯和數據更新

### 🎨 視覺設計
- 遵循 Android Material Design 3.0 設計規範
- 流暢的 60fps 動畫效果
- 響應式布局適配各種螢幕尺寸

### 💻 開發體驗
- TypeScript 嚴格模式保證代碼品質
- 模組化架構便於功能擴展
- 完整的錯誤處理和載入狀態

## 🚧 開發路線圖

### v1.1 計劃功能
- [ ] **Widget 自定義位置** - 拖拉排列 Widgets
- [ ] **主題系統** - 深色/淺色模式切換
- [ ] **快捷鍵支援** - 鍵盤操作優化
- [ ] **數據持久化** - 雲端同步功能

### v1.2 規劃功能  
- [ ] **更多 Widget 類型** - 時鐘、天氣、計算器
- [ ] **工作區自定義** - 用戶可創建/刪除工作區
- [ ] **插件系統** - 第三方 Widget 支援
- [ ] **協作功能** - 多用戶共享工作區

## 🤝 貢獻指南

歡迎貢獻代碼、回報問題或提出建議！

### 開發流程
1. **Fork** 這個倉庫
2. **創建** 功能分支 (`git checkout -b feature/amazing-feature`)
3. **提交** 變更 (`git commit -m 'Add amazing feature'`)
4. **推送** 到分支 (`git push origin feature/amazing-feature`)
5. **開啟** Pull Request

### 代碼規範
- 使用 TypeScript 嚴格模式
- 遵循 React 最佳實踐
- 組件使用 PascalCase 命名
- 函數使用 camelCase 命名
- 添加適當的類型註解

## 📝 更新日誌

### v1.0.0 (2024-XX-XX)
- 🎉 **初始發布** - CloudDesk OS 核心功能上線
- ✨ **StatusBar 系統** - 可拖拉狀態列實現
- 📊 **工作區系統** - 三個獨立工作空間
- 🧩 **Widget 系統** - 模組化組件架構
- 🎨 **Material Design** - Android 風格界面

## 📄 授權條款

本項目採用 **MIT License** 授權 - 詳見 [LICENSE](./LICENSE) 文件

## 🙏 致謝

- **Next.js 團隊** - 優秀的 React 框架
- **Material Design** - 精美的設計規範  
- **TypeScript** - 強大的類型系統
- **React 社群** - 豐富的生態系統

---

<div align="center">

**⭐ 如果這個項目對你有幫助，請給一個 Star！**

Made with ❤️ by [woolkingx](https://github.com/woolkingx)

[🌟 Star this repo](https://github.com/woolkingx/cloudesk/stargazers) • [🐛 Report Bug](https://github.com/woolkingx/cloudesk/issues) • [💡 Request Feature](https://github.com/woolkingx/cloudesk/issues)

</div>