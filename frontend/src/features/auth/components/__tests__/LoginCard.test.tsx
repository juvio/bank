import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import LoginCard from '../LoginCard';

const { useLoginMock } = vi.hoisted(() => ({
  useLoginMock: vi.fn(),
}));

vi.mock('@features/auth/hooks', () => ({
  useLogin: useLoginMock,
}));

describe('LoginCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useLoginMock.mockReturnValue({
      email: '',
      password: '',
      error: '',
      isLoading: false,
      setEmail: vi.fn(),
      setPassword: vi.fn(),
      handleLogin: vi.fn((event?: Event) => event?.preventDefault?.()),
      goToRegister: vi.fn(),
    });
  });

  it('renders form fields and buttons', () => {
    render(<LoginCard />);

    expect(screen.getByRole('heading', { name: /login/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();
    expect(screen.getByLabelText(/senha/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrar/i })).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /criar nova conta/i })
    ).toBeInTheDocument();
  });

  it('wires input changes and actions', () => {
    const setEmail = vi.fn();
    const setPassword = vi.fn();
    const handleLogin = vi.fn((event?: Event) => event?.preventDefault?.());
    const goToRegister = vi.fn();

    useLoginMock.mockReturnValue({
      email: '',
      password: '',
      error: '',
      isLoading: false,
      setEmail,
      setPassword,
      handleLogin,
      goToRegister,
    });

    const { container } = render(<LoginCard />);

    fireEvent.change(screen.getByRole('textbox', { name: /email/i }), {
      target: { value: 'user@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/senha/i), {
      target: { value: '123456' },
    });

    const form = container.querySelector('form');
    expect(form).not.toBeNull();
    fireEvent.submit(form as HTMLFormElement);

    fireEvent.click(screen.getByRole('button', { name: /criar nova conta/i }));

    expect(setEmail).toHaveBeenCalledWith('user@email.com');
    expect(setPassword).toHaveBeenCalledWith('123456');
    expect(handleLogin).toHaveBeenCalledTimes(1);
    expect(goToRegister).toHaveBeenCalledTimes(1);
  });

  it('shows loading and error state', () => {
    useLoginMock.mockReturnValue({
      email: 'user@email.com',
      password: '123456',
      error: 'Falha no login',
      isLoading: true,
      setEmail: vi.fn(),
      setPassword: vi.fn(),
      handleLogin: vi.fn(),
      goToRegister: vi.fn(),
    });

    render(<LoginCard />);

    expect(screen.getByText('Falha no login')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /entrando/i })).toBeDisabled();
    expect(
      screen.getByRole('button', { name: /criar nova conta/i })
    ).toBeDisabled();
  });
});
