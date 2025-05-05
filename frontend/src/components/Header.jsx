'use client';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header style={{ padding: '10px', background: '#e3e3e3' }}>
      <h1>Task Manager</h1>
      {user && <p>Logged in as: {user.username}</p>}
    </header>
  );
}
