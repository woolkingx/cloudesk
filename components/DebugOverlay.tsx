import React from 'react';

interface DebugOverlayProps {
  children: React.ReactNode;
  onHide: () => void;
}

export function DebugOverlay({ children, onHide }: DebugOverlayProps) {
  return (
    <div className="fixed top-0 right-0 m-4 p-4 bg-gray-800 text-white rounded shadow-lg">
      <button
        className="absolute top-2 right-2 text-sm bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
        onClick={onHide}
      >
        Hide
      </button>
      <div className="mt-6">
        {children}
      </div>
    </div>
  );
}