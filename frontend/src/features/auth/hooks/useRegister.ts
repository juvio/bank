'use client';

import { useCallback, useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@stores';

export const useRegister = () => {
  const router = useRouter();
  const register = useAuthStore((state) => state.register);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = useCallback(
    async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      setError('');

      if (!username || !email || !password || !confirmPassword) {
        setError('Todos os campos são obrigatórios');
        return;
      }

      if (password !== confirmPassword) {
        setError('As senhas não coincidem');
        return;
      }

      if (password.length < 6) {
        setError('A senha deve ter no mínimo 6 caracteres');
        return;
      }

      setIsLoading(true);

      try {
        await register(username, email, password);
        router.push('/login');
      } catch (error: unknown) {
        if (error instanceof Error && error.message) {
          setError(error.message);
        } else {
          setError('Erro ao criar conta');
        }
      } finally {
        setIsLoading(false);
      }
    },
    [confirmPassword, email, password, register, router, username]
  );

  return {
    username,
    email,
    password,
    confirmPassword,
    error,
    isLoading,
    setUsername,
    setEmail,
    setPassword,
    setConfirmPassword,
    handleRegister,
  };
};
