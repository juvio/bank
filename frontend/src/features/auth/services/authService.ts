import { api } from '@services';

type AuthUser = {
  id: string;
  username: string;
  email: string;
};

type LoginApiResponse = {
  result: {
    user: AuthUser;
  };
};

type LogoutApiResponse = {
  success: boolean;
};

export const loginService = async (
  email: string,
  password: string
): Promise<LoginApiResponse> => {
  return api.post('/api/auth/login', { email, password }, { requireAuth: false });
};

export const registerService = async (
  username: string,
  email: string,
  password: string
): Promise<void> => {
  await api.post('/user', { username, email, password }, { requireAuth: false });
};

export const logoutService = async (): Promise<LogoutApiResponse> => {
  return api.post('/api/auth/logout', undefined, { requireAuth: false });
};
