'use client';
import { useState, useEffect } from 'react';

export function useDebugInfo() {
  const [isVisible, setIsVisible] = useState(false);
  const [lastWorksheet, setLastWorksheet] = useState<string>('');

  // 觸發顯示的函數
  const triggerShow = (currentWorksheet: string) => {
    // 只有在 worksheet 真正改變時才顯示
    if (currentWorksheet !== lastWorksheet && lastWorksheet !== '') {
      setIsVisible(true);
      setLastWorksheet(currentWorksheet);
      
      // 1秒後自動隱藏
      setTimeout(() => {
        setIsVisible(false);
      }, 1000);
    } else if (lastWorksheet === '') {
      // 初次設定，不顯示
      setLastWorksheet(currentWorksheet);
    }
  };

  const hide = () => {
    setIsVisible(false);
  };

  const show = () => {
    setIsVisible(true);
  };

  const toggle = () => {
    setIsVisible(!isVisible);
  };

  return {
    isVisible,
    triggerShow,
    hide,
    show,
    toggle
  };
}