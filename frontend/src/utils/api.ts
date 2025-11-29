import { useAuthStore } from '@/stores/useAuthStore';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
};

export const apiClient = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {}, requireAuth = true } = options;

  const token = useAuthStore.getState().token;

  const config: RequestInit = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(requireAuth && token ? { Authorization: `Bearer ${token}` } : {}),
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(`${API_URL}${endpoint}`, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `Erro na requisição: ${response.statusText}`
    );
  }

  return response.json();
};

export const api = {
  get: <T = any>(endpoint: string, options?: Omit<RequestOptions, 'method'>) =>
    apiClient<T>(endpoint, { ...options, method: 'GET' }),

  post: <T = any>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) => apiClient<T>(endpoint, { ...options, body, method: 'POST' }),

  put: <T = any>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>
  ) => apiClient<T>(endpoint, { ...options, body, method: 'PUT' }),

  delete: <T = any>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method'>
  ) => apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
