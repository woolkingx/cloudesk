// types/widget.ts

export interface WidgetBase {
  id: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  workspaceId?: string;
}

export interface Widget extends WidgetBase {
  type: WidgetType;
  data: unknown;
}

export type WidgetType =
  | 'todo'
  | 'note'
  | 'chart'
  | 'error'
  | 'info'
  | 'loading'
  | 'success'
  | 'warning';

export interface WidgetRendererProps {
  widgets: Widget[];
  onWidgetUpdate?: (id: string, data: unknown) => void;
  onWidgetRemove?: (id: string) => void;
}

// 詳細型別（僅在需要細分時使用，主邏輯仍用 Widget 即可）
export interface WidgetErrorDetails extends WidgetBase {
  type: 'error';
  data: { message: string; stack?: string };
}

export interface WidgetLoadingDetails extends WidgetBase {
  type: 'loading';
  data: { message: string };
}

export interface WidgetSuccessDetails extends WidgetBase {
  type: 'success';
  data: { message: string };
}

export interface WidgetWarningDetails extends WidgetBase {
  type: 'warning';
  data: { message: string };
}

export interface WidgetInfoDetails extends WidgetBase {
  type: 'info';
  data: { message: string };
}

export interface WidgetTodoDetails extends WidgetBase {
  type: 'todo';
  data: { items: { id: string; title: string; completed: boolean }[] };
}

export interface WidgetNoteDetails extends WidgetBase {
  type: 'note';
  data: { content: string };
}

export interface WidgetChartDetails extends WidgetBase {
  type: 'chart';
  data: { chartType: 'bar' | 'line' | 'pie'; data: any[]; options?: Record<string, any> };
}

export interface WidgetWorkspace {
  id: string;
  name: string;
  widgets: Widget[];
  createdAt: string;
  updatedAt: string;
}

export interface WidgetDebugDetails extends WidgetBase {
  type: 'debug';
  data: { message: string; details?: any };
}





// ⚠ 注意：這裡只定義型別，不直接匯出組件
// 請在 components/widget-renderer.tsx 中自行加上：
// export default WidgetRenderer;
// 這樣可以避免循環依賴問題，並保持組件邏輯與型別定義分離