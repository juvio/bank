import { NextRequest, NextResponse } from 'next/server';
import { mockService } from '@services';

const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';
const USE_MOCK = process.env.NEXT_PUBLIC_USE_MOCK === 'true';

type TokenPayload = {
  id: string;
  username: string;
  email: string;
  exp?: number;
};

type LoginBackendResponse = {
  result?: {
    token?: string;
  };
  message?: string;
};

const decodeTokenPayload = (token: string): TokenPayload => {
  const payload = token.split('.')[1];

  if (!payload) {
    throw new Error('Token payload is missing');
  }

  const normalizedPayload = payload.replace(/-/g, '+').replace(/_/g, '/');
  const decodedPayload = Buffer.from(normalizedPayload, 'base64').toString(
    'utf-8',
  );

  return JSON.parse(decodedPayload) as TokenPayload;
};

const resolveMaxAge = (exp?: number) => {
  if (!exp) {
    return 60 * 60 * 24;
  }

  const expirationInSeconds =
    exp > 10_000_000_000 ? Math.floor(exp / 1000) : exp;
  const secondsUntilExpiration =
    expirationInSeconds - Math.floor(Date.now() / 1000);

  return Math.max(secondsUntilExpiration, 0);
};

const authenticate = async (
  email: string,
  password: string,
): Promise<LoginBackendResponse> => {
  if (USE_MOCK) {
    return mockService.login(email, password);
  }

  const response = await fetch(`${BACKEND_URL}/user/auth`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });

  const data = (await response
    .json()
    .catch(() => ({}))) as LoginBackendResponse;

  if (!response.ok) {
    return {
      message: data.message || 'Invalid credentials',
    };
  }

  return data;
};

export async function POST(request: NextRequest) {
  try {
    const { email, password } = await request.json();
    const data = await authenticate(email, password);
    const token = data.result?.token;
    console.log('Authentication result:', data);

    if (!token) {
      return NextResponse.json(
        { message: data.message || 'Invalid credentials' },
        { status: 401 },
      );
    }

    const payload = decodeTokenPayload(token);
    const response = NextResponse.json({
      result: {
        user: {
          id: payload.id,
          username: payload.username,
          email: payload.email,
        },
      },
    });

    response.cookies.set({
      name: 'token',
      value: token,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/',
      maxAge: resolveMaxAge(payload.exp),
    });

    return response;
  } catch (error) {
    console.error('Error authenticating user:', error);
    return NextResponse.json(
      { message: 'Invalid credentials' },
      { status: 401 },
    );
  }
}
