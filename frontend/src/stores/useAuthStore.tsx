import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import {
  loginService,
  logoutService,
  registerService,
} from '@features/auth/services';

type AuthUser = {
  id: string;
  username: string;
  email: string;
};

type AuthStore = {
  user: AuthUser | null;
  login: (email: string, password: string) => Promise<void>;
  register: (
    username: string,
    email: string,
    password: string
  ) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: () => boolean;
};

const formatUsername = (username: string) =>
  username
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,

      login: async (email: string, password: string) => {
        try {
          const data = await loginService(email, password);
          const user = data.result.user;

          set({
            user: {
              id: user.id,
              username: formatUsername(user.username),
              email: user.email,
            },
          });
        } catch (error) {
          console.error('Erro no login:', error);
          throw error;
        }
      },

      register: async (username: string, email: string, password: string) => {
        try {
          await registerService(username, email, password);
        } catch (error) {
          console.error('Erro no registro:', error);
          throw error;
        }
      },

      logout: async () => {
        try {
          await logoutService();
        } finally {
          set({ user: null });
        }
      },

      isAuthenticated: () => {
        return !!get().user;
      },
    }),
    {
      name: 'AuthStorage',
      partialize: (state) => ({ user: state.user }),
    }
  )
);
