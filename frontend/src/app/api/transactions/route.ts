import { NextRequest, NextResponse } from 'next/server';

const getAuthHeaders = (request: NextRequest): Record<string, string> => {
  const token = request.cookies.get('token')?.value;

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '0';
  const limit = searchParams.get('limit') || '10';

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  try {
    const response = await fetch(
      `${backendUrl}/api/transactions?page=${page}&limit=${limit}`,
      {
        headers: {
          ...getAuthHeaders(request),
        },
      }
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch transactions' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  try {
    const formData = await request.formData();
    const response = await fetch(`${backendUrl}/api/transactions`, {
      method: 'POST',
      headers: {
        ...getAuthHeaders(request),
      },
      body: formData,
    });
    const data = await response.json();

    return NextResponse.json(data, { status: response.status });
  } catch (error) {
    console.error('Error posting to backend:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
