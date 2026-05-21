import { NextRequest, NextResponse } from 'next/server';

const getAuthHeaders = (request: NextRequest): Record<string, string> => {
  const token = request.cookies.get('token')?.value;

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function GET(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  try {
    const response = await fetch(`${backendUrl}/account`, {
      headers: {
        ...getAuthHeaders(request),
      },
    });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error fetching from backend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account' },
      { status: 500 },
    );
  }
}
