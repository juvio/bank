import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';
import RegisterCard from '../RegisterCard';

const { useRegisterMock } = vi.hoisted(() => ({
  useRegisterMock: vi.fn(),
}));

vi.mock('@features/auth/hooks', () => ({
  useRegister: useRegisterMock,
}));

describe('RegisterCard', () => {
  beforeEach(() => {
    vi.clearAllMocks();

    useRegisterMock.mockReturnValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      isLoading: false,
      setUsername: vi.fn(),
      setEmail: vi.fn(),
      setPassword: vi.fn(),
      setConfirmPassword: vi.fn(),
      handleRegister: vi.fn((event?: Event) => event?.preventDefault?.()),
    });
  });

  it('renders form fields and submit button', () => {
    const { container } = render(<RegisterCard />);

    expect(screen.getByRole('heading', { name: /criar conta/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /nome de usu/i })).toBeInTheDocument();
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument();

    const passwordInputs = container.querySelectorAll('input[type="password"]');
    expect(passwordInputs).toHaveLength(2);

    expect(screen.getByRole('button', { name: /^criar conta$/i })).toBeInTheDocument();
  });

  it('wires input changes and submit', () => {
    const setUsername = vi.fn();
    const setEmail = vi.fn();
    const setPassword = vi.fn();
    const setConfirmPassword = vi.fn();
    const handleRegister = vi.fn((event?: Event) => event?.preventDefault?.());

    useRegisterMock.mockReturnValue({
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
      error: '',
      isLoading: false,
      setUsername,
      setEmail,
      setPassword,
      setConfirmPassword,
      handleRegister,
    });

    const { container } = render(<RegisterCard />);

    const usernameInput = screen.getByRole('textbox', { name: /nome de usu/i });
    const emailInput = screen.getByRole('textbox', { name: /email/i });
    const passwordInputs = container.querySelectorAll('input[type="password"]');
    const form = container.querySelector('form');

    expect(passwordInputs).toHaveLength(2);
    expect(form).not.toBeNull();

    fireEvent.change(usernameInput, { target: { value: 'Carol' } });
    fireEvent.change(emailInput, { target: { value: 'carol@email.com' } });
    fireEvent.change(passwordInputs[0] as HTMLInputElement, {
      target: { value: '123456' },
    });
    fireEvent.change(passwordInputs[1] as HTMLInputElement, {
      target: { value: '123456' },
    });

    fireEvent.submit(form as HTMLFormElement);

    expect(setUsername).toHaveBeenCalledWith('Carol');
    expect(setEmail).toHaveBeenCalledWith('carol@email.com');
    expect(setPassword).toHaveBeenCalledWith('123456');
    expect(setConfirmPassword).toHaveBeenCalledWith('123456');
    expect(handleRegister).toHaveBeenCalledTimes(1);
  });

  it('shows loading and error state', () => {
    useRegisterMock.mockReturnValue({
      username: 'Carol',
      email: 'carol@email.com',
      password: '123456',
      confirmPassword: '123456',
      error: 'Erro ao criar conta',
      isLoading: true,
      setUsername: vi.fn(),
      setEmail: vi.fn(),
      setPassword: vi.fn(),
      setConfirmPassword: vi.fn(),
      handleRegister: vi.fn(),
    });

    render(<RegisterCard />);

    expect(screen.getByText('Erro ao criar conta')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /criando conta/i })).toBeDisabled();
  });
});
