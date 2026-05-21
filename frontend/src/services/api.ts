import { mockService } from './mockService';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

type RequestOptions = {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  body?: any;
  headers?: Record<string, string>;
  requireAuth?: boolean;
};

// Mapeamento de endpoints para funcoes mock
const mockHandlers: Record<string, any> = {
  'POST:/api/auth/login': async ({ body }: { body: any }) => {
    await mockService.login(body.email, body.password);
    const account = await mockService.getAccount();

    return {
      result: {
        user: account.result.user,
      },
    };
  },

  'POST:/api/user': ({ body }: { body: any }) =>
    mockService.register(body.username, body.email),

  'GET:/api/account': () => mockService.getAccount(),

  'GET:/api/transactions': ({ endpoint }: { endpoint: string }) => {
    const url = new URL(`http://dummy${endpoint}`);
    const page = parseInt(url.searchParams.get('page') || '0');
    const limit = parseInt(url.searchParams.get('limit') || '10');
    return mockService.getTransactions(page, limit);
  },

  'POST:/api/transactions': ({ body }: { body: any }) => {
    if (body instanceof FormData) {
      const attachment = body.get('attachment') as File | null;
      const transaction = {
        type: body.get('type') as string,
        amount: parseFloat(body.get('amount') as string),
        description: body.get('description') as string,
        date: body.get('date') as string,
        ...(attachment && { attachment }),
      };
      return mockService.addTransaction(transaction);
    }
    return mockService.addTransaction(body);
  },

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
        '^' + pattern.replace(':id', '\\d+').replace(':', '') + '$',
      );
      const testKey = `${method}${endpointWithoutQuery}`;
      if (regex.test(testKey)) {
        return mockHandlers[pattern];
      }
    }
  }

  return null;
};

const isSameOriginEndpoint = (endpoint: string) => endpoint.startsWith('/api/');

const resolveRequestUrl = (endpoint: string) =>
  isSameOriginEndpoint(endpoint) ? endpoint : `${API_URL}${endpoint}`;

export const apiClient = async <T = any>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  const { method = 'GET', body, headers = {} } = options;

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

    console.warn(`⚠️ Mock nao encontrado para: ${method} ${endpoint}`);
  }

  const config: RequestInit = {
    method,
    credentials: isSameOriginEndpoint(endpoint) ? 'include' : undefined,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  const response = await fetch(resolveRequestUrl(endpoint), config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(
      error.message || `Erro na requisicao: ${response.statusText}`,
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
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => apiClient<T>(endpoint, { ...options, body, method: 'POST' }),

  postFormData: async <T = any>(
    endpoint: string,
    formData: FormData,
  ): Promise<T> => {
    // Se estiver usando mock, intercepta FormData
    if (USE_MOCK) {
      console.log(`🎭 Mock Mode (FormData): POST ${endpoint}`);

      const handler = findMockHandler('POST', endpoint);

      if (handler) {
        try {
          return await handler({ endpoint, body: formData, method: 'POST' });
        } catch (error: any) {
          throw new Error(error.message || 'Erro no mock');
        }
      }

      console.warn(`⚠️ Mock nao encontrado para: POST ${endpoint}`);
    }

    const response = await fetch(resolveRequestUrl(endpoint), {
      method: 'POST',
      credentials: isSameOriginEndpoint(endpoint) ? 'include' : undefined,
      body: formData,
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(
        error.message || `Erro na requisicao: ${response.statusText}`,
      );
    }

    return response.json();
  },

  put: <T = any>(
    endpoint: string,
    body?: any,
    options?: Omit<RequestOptions, 'method' | 'body'>,
  ) => apiClient<T>(endpoint, { ...options, body, method: 'PUT' }),

  delete: <T = any>(
    endpoint: string,
    options?: Omit<RequestOptions, 'method'>,
  ) => apiClient<T>(endpoint, { ...options, method: 'DELETE' }),
};
