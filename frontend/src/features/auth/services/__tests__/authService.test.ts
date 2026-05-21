import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '@services';
import { loginService, logoutService, registerService } from '../authService';

vi.mock('@services', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls login endpoint with expected payload', async () => {
    const response = {
      result: {
        user: {
          id: '1',
          username: 'Carol',
          email: 'user@email.com',
        },
      },
    };
    vi.mocked(api.post).mockResolvedValueOnce(response);

    const result = await loginService('user@email.com', '123456');

    expect(api.post).toHaveBeenCalledWith(
      '/api/auth/login',
      { email: 'user@email.com', password: '123456' },
      { requireAuth: false }
    );
    expect(result).toEqual(response);
  });

  it('calls register endpoint with expected payload', async () => {
    vi.mocked(api.post).mockResolvedValueOnce(undefined);

    await registerService('Carol', 'carol@email.com', '123456');

    expect(api.post).toHaveBeenCalledWith(
      '/user',
      { username: 'Carol', email: 'carol@email.com', password: '123456' },
      { requireAuth: false }
    );
  });

  it('calls logout endpoint without exposing the token to the client', async () => {
    const response = { success: true };
    vi.mocked(api.post).mockResolvedValueOnce(response);

    const result = await logoutService();

    expect(api.post).toHaveBeenCalledWith('/api/auth/logout', undefined, {
      requireAuth: false,
    });
    expect(result).toEqual(response);
  });
});
