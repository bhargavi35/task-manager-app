'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
const API_BASE_URL = process.env.BACKEND_URL

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.replace(`${API_BASE_URL}/register`);
  }, []);
  return null;
}
