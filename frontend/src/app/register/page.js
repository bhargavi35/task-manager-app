'use client';
import { useState } from 'react';
import API from '../../services/api';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({ name: '', username: '', email: '', password: '' });

  const handleRegister = async (e) => {
    e.preventDefault();
    await API.post('/auth/register', form);
    router.push('/login');
  };

  return (
    <form onSubmit={handleRegister}>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input
        placeholder="Username"
        onChange={e => setForm({ ...form, username: e.target.value })}
      />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button type="submit">Register</button>
    </form>
  );
}
