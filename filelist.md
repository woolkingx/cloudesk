# 專案文件列表

## 根目錄
- .gitignore
- checklist.md
- components.json
- Dockerfile
- filelist.md
- LICENSE
- next-env.d.ts
- next.config.js
- notes.md
- package-lock.json
- package.json
- postcss.config.js
- README.md
- tailwind.config.js
- todolist.md
- tsconfig.json
- tsconfig.tsbuildinfo
- vercel.json

## app/
- app/globals.css
- app/layout.tsx
- app/page.tsx

### app/api/mcp/generate/
- app/api/mcp/generate/route.ts

### app/api/test/
- app/api/test/route.ts

#### app/api/test/ai/
- app/api/test/ai/route.ts

#### app/api/test/db/
- app/api/test/db/route.ts

#### app/api/test/health/
- app/api/test/health/route.ts

#### app/api/test/widgets/
- app/api/test/widgets/route.ts

### app/api/widgets/
- app/api/widgets/route.ts

### app/test/
- app/test/page.tsx

### app/workspace/
- app/workspace/page.tsx

#### app/workspace/[id]/
- app/workspace/[id]/page.tsx

## components/
- components/android-card.tsx
- components/DebugOverlay.tsx
- components/popup-menu.tsx
- components/StatusBar.tsx
- components/widget-renderer.tsx

### components/layout/
- components/layout/AppLayout.tsx
- components/layout/ErrorState.tsx
- components/layout/LoadingState.tsx

### components/ui/
- components/ui/card.tsx
- components/ui/dropdown-menu.tsx

### components/widgets/
- components/widgets/chart-widget.tsx
- components/widgets/error-handle-widget.tsx
- components/widgets/note-widget.tsx
- components/widgets/todo-widget.tsx

## data/
- data/init-data.json

## hooks/
- hooks/useApiTesting.ts
- hooks/useDebugInfo.ts
- hooks/useWidgets.ts
- hooks/useWorksheet.ts

## lib/
- lib/ai-controller.ts
- lib/ai-generator.ts
- lib/utils.ts
- lib/voice-input.ts

### lib/db/
- lib/db/connection.ts
- lib/db/init.ts
- lib/db/queries.ts
- lib/db/schema.sql

## store/
- store/status.ts

## tests/
- tests/api.spec.ts
- tests/db.spec.ts
- tests/frontend.spec.ts
- tests/integration.spec.ts
- tests/state-dump.spec.ts