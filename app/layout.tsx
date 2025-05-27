'use client';
import { PopupMenu } from '../components/popup-menu.js';

export default function RootLayout({ children, onFetch }: { children: React.ReactNode; onFetch: (url: string) => void }) {
  return (
    <html lang="en">
      <body>
        {children}
        <PopupMenu onFetch={onFetch} />
      </body>
    </html>
  );
}