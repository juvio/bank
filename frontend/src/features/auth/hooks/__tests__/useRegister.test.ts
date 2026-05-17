import { act, renderHook } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { useRegister } from '../useRegister';

const pushMock = vi.fn();
const registerMock = vi.fn();

vi.mock('next/navigation', () => ({
  useRouter: () => ({
    push: pushMock,
  }),
}));

vi.mock('@/stores/useAuthStore', () => ({
  useAuthStore: (selector?: (state: { register: typeof registerMock }) => unknown) => {
    const state = { register: registerMock };
    return selector ? selector(state) : state;
  },
}));

describe('useRegister', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('validates required fields', async () => {
    const preventDefault = vi.fn();
    const { result } = renderHook(() => useRegister());

    await act(async () => {
      await result.current.handleRegister({ preventDefault } as never);
    });

    expect(result.current.error).toBe('Todos os campos são obrigatórios');
    expect(registerMock).not.toHaveBeenCalled();
  });

  it('validates password confirmation', async () => {
    const preventDefault = vi.fn();
    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.setUsername('Carol');
      result.current.setEmail('carol@email.com');
      result.current.setPassword('123456');
      result.current.setConfirmPassword('654321');
    });

    await act(async () => {
      await result.current.handleRegister({ preventDefault } as never);
    });

    expect(result.current.error).toBe('As senhas não coincidem');
    expect(registerMock).not.toHaveBeenCalled();
  });

  it('validates minimum password length', async () => {
    const preventDefault = vi.fn();
    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.setUsername('Carol');
      result.current.setEmail('carol@email.com');
      result.current.setPassword('12345');
      result.current.setConfirmPassword('12345');
    });

    await act(async () => {
      await result.current.handleRegister({ preventDefault } as never);
    });

    expect(result.current.error).toBe('A senha deve ter no mínimo 6 caracteres');
    expect(registerMock).not.toHaveBeenCalled();
  });

  it('registers and redirects to login on success', async () => {
    registerMock.mockResolvedValueOnce(undefined);
    const preventDefault = vi.fn();
    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.setUsername('Carol');
      result.current.setEmail('carol@email.com');
      result.current.setPassword('123456');
      result.current.setConfirmPassword('123456');
    });

    await act(async () => {
      await result.current.handleRegister({ preventDefault } as never);
    });

    expect(registerMock).toHaveBeenCalledWith('Carol', 'carol@email.com', '123456');
    expect(pushMock).toHaveBeenCalledWith('/login');
    expect(result.current.error).toBe('');
    expect(result.current.isLoading).toBe(false);
  });

  it('shows service error message when available', async () => {
    registerMock.mockRejectedValueOnce(new Error('Email já cadastrado'));
    const preventDefault = vi.fn();
    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.setUsername('Carol');
      result.current.setEmail('carol@email.com');
      result.current.setPassword('123456');
      result.current.setConfirmPassword('123456');
    });

    await act(async () => {
      await result.current.handleRegister({ preventDefault } as never);
    });

    expect(result.current.error).toBe('Email já cadastrado');
    expect(result.current.isLoading).toBe(false);
  });

  it('shows fallback error when service throws unknown', async () => {
    registerMock.mockRejectedValueOnce('unexpected');
    const preventDefault = vi.fn();
    const { result } = renderHook(() => useRegister());

    act(() => {
      result.current.setUsername('Carol');
      result.current.setEmail('carol@email.com');
      result.current.setPassword('123456');
      result.current.setConfirmPassword('123456');
    });

    await act(async () => {
      await result.current.handleRegister({ preventDefault } as never);
    });

    expect(result.current.error).toBe('Erro ao criar conta');
    expect(result.current.isLoading).toBe(false);
  });
});
