import { create } from 'zustand';
export const useStatusStore = create((set) => ({
  status: 'idle',
  setStatus: (s) => set({ status: s }),
}));