'use client';

import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/stores/useAuthStore';

export const useLogin = () => {
  const { login } = useAuthStore();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError('');
      setIsLoading(true);

      try {
        await login(email, password);
        router.push('/home');
      } catch {
        setError('Email ou senha inválidos');
      } finally {
        setIsLoading(false);
      }
    },
    [email, login, password, router]
  );

  const goToRegister = useCallback(() => {
    router.push('/register');
  }, [router]);

  return {
    email,
    password,
    error,
    isLoading,
    setEmail,
    setPassword,
    handleLogin,
    goToRegister,
  };
};
