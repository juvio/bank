import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { api } from '@/utils/api';

type AuthStore = {
  token: string | null;
  user: {
    id: string;
    username: string;
    email: string;
  } | null;
  login: (email: string, password: string) => Promise<string>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => void;
  isAuthenticated: () => boolean;
};

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      login: async (email: string, password: string) => {
        try {
          const data = await api.post(
            '/user/auth',
            { email, password },
            { requireAuth: false }
          );

          const token = data.result.token;

          const payload = JSON.parse(atob(token.split('.')[1]));

          const formattedUsername = payload.username
            .split(' ')
            .map(
              (word: string) =>
                word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
            )
            .join(' ');

          set({
            token,
            user: {
              id: payload.id,
              username: formattedUsername,
              email: payload.email,
            },
          });

          return token;
        } catch (error) {
          console.error('Erro no login:', error);
          throw error;
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          await api.post(
            '/user',
            { username, email, password },
            { requireAuth: false }
          );
        } catch (error) {
          console.error('Erro no registro:', error);
          throw error;
        }
      },

      logout: () => {
        set({ token: null, user: null });
      },

      isAuthenticated: () => {
        return !!get().token;
      },
    }),
    {
      name: 'AuthStorage',
    }
  )
);
