'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside style={{
      width: '200px',
      minHeight: '100vh',
      background: '#ffffff',
      borderRight: '1px solid #ddd',
      padding: '20px',
      fontWeight:'bold'
    }}>
      <nav>
        <ul>
          <li><Link href="/dashboard">🏠 Dashboard</Link></li>
          <li><Link href="/tasks">📋 All Tasks</Link></li>
          <li><button style={{ width: '80%' }} onClick={logout}>🚪 Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
}
