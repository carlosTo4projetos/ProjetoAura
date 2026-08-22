import React from 'react';
import { Header } from './Header';

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div style={layoutContainerStyle}>
      <Header />
      <main className="predictable-layout">
        {children}
      </main>
    </div>
  );
}

const layoutContainerStyle: React.CSSProperties = {
  width: '100%',
  minHeight: '100vh',
  backgroundColor: 'var(--background)',
  display: 'flex',
  flexDirection: 'column'
};
