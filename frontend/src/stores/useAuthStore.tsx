import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      token: null,
      user: null,

      login: async (email: string, password: string) => {
        try {
          const response = await fetch(`${API_URL}/user/auth`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            throw new Error('Credenciais inválidas');
          }

          const data = await response.json();
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
          const response = await fetch(`${API_URL}/user`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, email, password }),
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.error || 'Erro ao criar conta');
          }
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
