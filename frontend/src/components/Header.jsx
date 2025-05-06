'use client';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user } = useAuth();

  return (
    <header style={{
      padding: '15px 20px',
      background: '#343a40',
      color: 'white',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center'
    }}>
      <h1 style={{ margin: 0 }}>Task Manager</h1>
      {user && <p style={{ margin: 0 }}>Logged in as: <strong>{user.username}</strong></p>}
    </header>
  );
}
