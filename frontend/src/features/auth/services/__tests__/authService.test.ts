import { beforeEach, describe, expect, it, vi } from 'vitest';
import { api } from '@utils';
import { loginService, registerService } from '../authService';

vi.mock('@utils', () => ({
  api: {
    post: vi.fn(),
  },
}));

describe('authService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('calls login endpoint with expected payload', async () => {
    const response = { result: { token: 'jwt-token' } };
    vi.mocked(api.post).mockResolvedValueOnce(response);

    const result = await loginService('user@email.com', '123456');

    expect(api.post).toHaveBeenCalledWith(
      '/user/auth',
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
});
