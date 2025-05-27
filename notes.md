# Qwen2.5-Coder-32B 優化工作指示 - CloudDesk OS

## 🎯 模型特性與優勢
Qwen2.5-Coder-32B-Instruct 專為代碼生成優化，具備：
- ✅ **高度一致性** - 不會隨意改動已有代碼結構
- ✅ **精確理解** - 能準確理解複雜的技術要求
- ✅ **穩定輸出** - 生成的代碼品質穩定可靠
- ✅ **上下文記憶** - 能很好地記住項目上下文

## 📋 針對 Qwen2.5-Coder 的指示原則

### 🎪 核心工作模式
```
任務分析 → 精確實現 → 一次完成 → 停止工作
```

**不要：**
- ❌ 反覆修改已完成的功能
- ❌ 過度優化正常工作的代碼
- ❌ 添加未要求的額外功能
- ❌ 改變已建立的代碼架構

## 🏗️ CloudDesk OS 項目架構

### 已完成並穩定的模組
```typescript
// ✅ 已完成 - 請勿修改
components/StatusBar.tsx           // 可拖拉狀態列
hooks/useWorksheet.ts             // Worksheet 狀態管理
hooks/useDebugInfo.ts             // 調試資訊管理
components/layout/AppLayout.tsx   // 應用佈局
components/DebugOverlay.tsx       // 調試覆蓋層
```

### 當前工作重點
```typescript
// 🎯 需要完善的部分
app/workspace/[id]/page.tsx       // 動態工作區頁面
app/workspace/page.tsx            // 工作區總覽頁面
components/widget-renderer.tsx    // Widget 渲染器
components/android-card.tsx       // Android 卡片組件
```

## 🔧 技術規範與約束

### Next.js 13+ App Router 規範
```typescript
// ✅ 客戶端組件標記
'use client';

// ✅ 正確的 Router 導入
import { useRouter } from 'next/navigation';

// ✅ 正確的路徑別名
import { Component } from '@/components/Component';

// ❌ 避免的錯誤模式
import { useRouter } from 'next/router';        // 錯誤
import Component from '../components/Component.js'; // 錯誤
```

### TypeScript 類型安全
```typescript
// ✅ 嚴格類型定義
interface WorksheetProps {
  id: string;
  name: string;
  status: 'active' | 'idle' | 'error' | 'loading';
  widgetCount: number;
  lastUpdate: Date;
}

// ✅ 正確的泛型使用
const [widgets, setWidgets] = useState<Widget[]>([]);

// ❌ 避免 any 類型
const [data, setData] = useState<any>({}); // 不推薦
```

## 🎯 具體任務指導

### 1. 修復問題時
**步驟：**
1. 識別具體錯誤類型（編譯/運行時/邏輯）
2. 定位問題根源（不要猜測）
3. 應用最小修改原則
4. 驗證修復效果
5. 確認沒有引入新問題

**範例：**
```bash
# 錯誤：Module not found: Can't resolve '@/hooks/useWorksheet'
# 原因：文件不存在或路徑錯誤
# 解決：檢查文件是否存在，修正導入路徑
# 驗證：npm run build 成功
```

### 2. 新增功能時
**檢查清單：**
- [ ] 功能需求明確定義
- [ ] 不與現有功能衝突
- [ ] 遵循項目代碼風格
- [ ] 添加適當的類型定義
- [ ] 錯誤處理完善
- [ ] 測試功能完整性

### 3. 重構代碼時
**原則：**
- 只有在明確改善時才重構
- 保持向後兼容性
- 不改變對外接口
- 分步驟進行，每步驗證

## 🧠 Qwen2.5-Coder 專用模式

### 理解上下文
你具備強大的上下文理解能力，請充分利用：
```
1. 分析整個對話歷史
2. 理解項目當前狀態
3. 識別真正需要解決的問題
4. 避免重複已經解決的問題
```

### 代碼生成策略
```typescript
// 優先模式：修改最少的代碼解決問題
// 次要模式：重寫有問題的模組
// 避免模式：大規模重構整個項目

// ✅ 好的修改
if (!widgets || widgets.length === 0) {
  // 添加防護邏輯
}

// ❌ 避免的修改
// 重寫整個組件來修復小問題
```

### 問題解決流程
```
1. 錯誤分析 → 確定根本原因
2. 方案設計 → 選擇最簡解決方案  
3. 代碼實現 → 精確實現，避免額外修改
4. 測試驗證 → 確保問題解決且無副作用
5. 完成報告 → 說明修改內容，標記完成
```

## 🎖️ 質量標準

### 代碼質量指標
- **可讀性** - 清晰的變量命名和結構
- **可維護性** - 模組化設計，單一職責
- **穩定性** - 充分的錯誤處理和邊界檢查
- **一致性** - 與項目現有風格保持一致

### 完成標準
```typescript
// 當滿足以下條件時，任務完成：
const taskCompleted = {
  functionalityWorks: true,     // 功能按預期工作
  noTypeScriptErrors: true,     // 無 TS 編譯錯誤
  noRuntimeErrors: true,        // 無運行時錯誤
  buildSuccessful: true,        // 建置成功
  codeQualityGood: true,        // 代碼質量良好
  requirementsMet: true         // 滿足所有需求
};

if (Object.values(taskCompleted).every(Boolean)) {
  console.log('✅ 任務完成，停止工作');
}
```

## 💡 最佳實踐模式

### 推薦的工作流程
```typescript
// 1. 分析階段
function analyzeTask(requirement: string) {
  // 理解需求
  // 評估影響範圍
  // 確定最佳方案
}

// 2. 實現階段  
function implementSolution() {
  // 最小化修改
  // 保持一致性
  // 添加必要註釋
}

// 3. 驗證階段
function validateSolution() {
  // 功能測試
  // 類型檢查
  // 建置驗證
}
```

### 溝通模式
```markdown
## 任務理解
我理解需要：[具體描述任務]

## 解決方案
我將：[說明具體步驟]

## 實現結果
已完成：[列出完成的內容]
驗證：[說明如何驗證]

## 完成狀態
✅ 任務完成，功能正常工作
```

## ⚡ 效率提升技巧

### 利用你的優勢
1. **代碼補全準確度高** - 一次性生成正確代碼
2. **上下文理解強** - 避免重複詢問相同問題
3. **技術文檔理解好** - 準確遵循框架約定
4. **錯誤診斷精確** - 快速定位問題根源

### 避免常見陷阱
```typescript
// ❌ 避免：過度工程化
function simpleTask() {
  // 不要為簡單任務創建複雜架構
}

// ❌ 避免：不必要的重構
// 如果代碼工作正常，不要重寫

// ❌ 避免：忽略現有約定
// 遵循項目已建立的模式和約定
```

---

## 🎯 當前 CloudDesk OS 狀態總結

### ✅ 已完成並穩定運行
- StatusBar 可拖拉功能
- 三個 Worksheet 狀態管理
- 基本的 Widget 系統
- 調試資訊系統
- 基礎的頁面路由

### 🔧 需要完善
- Workspace 頁面的完整功能
- Widget 的增刪改查
- API 整合優化
- 響應式設計完善

### 🚫 請避免修改
- 已經正常工作的 StatusBar
- 穩定的 hook 系統  
- 基礎的佈局組件

**記住：你的穩定性是最大優勢，請保持這個特質！** 🎉