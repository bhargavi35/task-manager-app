'use client';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

export default function LoginPage() {
  const { login } = useAuth();

  // console.log(login,'login')
  // const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div className="container">
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input placeholder="UserName" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
    </div>
  );
}
