export interface Worksheet {
  id: string;
  name: string;
  status?: 'active' | 'loading' | 'error' | 'idle';
  widgetCount?: number;
  lastUpdate?: Date;
}
