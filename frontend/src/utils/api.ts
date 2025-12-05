import { useAuthStore } from '@/stores/useAuthStore';
import { mockService } from '@/services/mockService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
};

// Mapeamento de endpoints para funções mock
const mockHandlers: Record<string, any> = {
  'POST:/user/auth': ({ body }: { body: any }) =>
    mockService.login(body.email, body.password),

  'POST:/user': ({ body }: { body: any }) =>
    mockService.register(body.username, body.email, body.password),

  'GET:/account': () => mockService.getAccount(),

  'GET:/api/transactions': ({ endpoint }: { endpoint: string }) => {
    const url = new URL(`http://dummy${endpoint}`);
    const page = parseInt(url.searchParams.get('page') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    return mockService.getTransactions(page, limit);
  },

  'POST:/api/transactions': ({ body }: { body: any }) =>
    mockService.addTransaction(body),

  'PUT:/api/transactions/:id': ({
    endpoint,
    body,
  }: {
    endpoint: string;
    body: any;
  }) => {
    const id = parseInt(endpoint.split('/').pop() || '0');
    return mockService.editTransaction(id, body);
  },

  'DELETE:/api/transactions/:id': ({ endpoint }: { endpoint: string }) => {
    const id = parseInt(endpoint.split('/').pop() || '0');
    return mockService.deleteTransaction(id);
  },
};

const findMockHandler = (method: string, endpoint: string) => {
  const endpointWithoutQuery = endpoint.split('?')[0];
  const key = `${method}:${endpointWithoutQuery}`;

  if (mockHandlers[key]) {
    return mockHandlers[key];
  }

  for (const pattern in mockHandlers) {
    if (pattern.includes(':id')) {
      const regex = new RegExp(
        '^' + pattern.replace(':id', '\\d+').replace(':', '') + '$'
      );
      const testKey = `${method}${endpointWithoutQuery}`;
      if (regex.test(testKey)) {
        return mockHandlers[pattern];
      }
    }
  }

  return null;
};

export const apiClient = async <T = any>(
  endpoint: string,
  options: RequestOptions = {}
): Promise<T> => {
  const { method = 'GET', body, headers = {}, requireAuth = true } = options;

  if (USE_MOCK) {
    console.log(`🎭 Mock Mode: ${method} ${endpoint}`);

    const handler = findMockHandler(method, endpoint);

    if (handler) {
      try {
        return await handler({ endpoint, body, method });
      } catch (error: any) {
        throw new Error(error.message || 'Erro no mock');
      }
    }

    console.warn(`⚠️ Mock não encontrado para: ${method} ${endpoint}`);
  }

  // Chamada real para o backend
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

  postFormData: async <T = any>(
    endpoint: string,
    formData: FormData
  ): Promise<T> => {
    const token = useAuthStore.getState().token;
    
    const response = await fetch(`${API_URL}${endpoint}`, {
      method: 'POST',
      headers: {
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `Erro na requisição: ${response.statusText}`
      );
    }

    return response.json();
  },

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
