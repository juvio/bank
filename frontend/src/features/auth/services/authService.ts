import { api } from '@utils';

type LoginApiResponse = {
  result: {
    token: string;
  };
};

export const loginService = async (
  email: string,
  password: string
): Promise<LoginApiResponse> => {
  return api.post('/user/auth', { email, password }, { requireAuth: false });
};

export const registerService = async (
  username: string,
  email: string,
  password: string
): Promise<void> => {
  await api.post('/user', { username, email, password }, { requireAuth: false });
};
