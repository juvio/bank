import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useLogin } from '../useLogin';

const pushMock = vi.fn();
const loginMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('@stores', () => ({
  useAuthStore: () => ({
    login: loginMock,
  }),
}));

describe('useLogin', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('initializes with default values', () => {
    const { result } = renderHook(() => useLogin());

    expect(result.current.email).toBe('');
    expect(result.current.password).toBe('');
    expect(result.current.error).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('logs in and redirects to home on success', async () => {
    loginMock.mockResolvedValueOnce(undefined);
    const preventDefault = vi.fn();
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.setEmail('user@email.com');
      result.current.setPassword('123456');
    });

    await act(async () => {
      await result.current.handleLogin({ preventDefault } as never);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(loginMock).toHaveBeenCalledWith('user@email.com', '123456');
    expect(pushMock).toHaveBeenCalledWith('/home');
    expect(result.current.error).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('sets error when login fails', async () => {
    loginMock.mockRejectedValueOnce(new Error('invalid credentials'));
    const preventDefault = vi.fn();
    const { result } = renderHook(() => useLogin());

    await act(async () => {
      await result.current.handleLogin({ preventDefault } as never);
    });

    expect(preventDefault).toHaveBeenCalledTimes(1);
    expect(pushMock).not.toHaveBeenCalled();
    expect(result.current.error).toBe('Email ou senha inválidos');
    expect(result.current.isLoading).toBe(false);
  });

  it('redirects to register page', () => {
    const { result } = renderHook(() => useLogin());

    act(() => {
      result.current.goToRegister();
    });

    expect(pushMock).toHaveBeenCalledWith('/register');
  });
});
