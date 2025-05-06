// components/Layout.js
'use client';
import Header from './Header';
import Sidebar from './Sidebar';

export default function Layout({ children }) {
  return (
    <div>
      <Header />
      <div style={{ display: 'flex' }}>
        <Sidebar />
        <main style={{ padding: '30px', flexGrow: 1 }}>
          {children}
        </main>
      </div>
    </div>
  );
}
