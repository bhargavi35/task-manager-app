'use client';
import Link from 'next/link';
import { useAuth } from '../context/AuthContext';

export default function Sidebar() {
  const { logout } = useAuth();

  return (
    <aside style={{ width: '200px', padding: '10px', background: '#f4f4f4' }}>
      <nav>
        <ul>
          <li><Link href="/dashboard">Dashboard</Link></li>
          <li><Link href="/tasks">All Tasks</Link></li>
          <li><button onClick={logout}>Logout</button></li>
        </ul>
      </nav>
    </aside>
  );
}
