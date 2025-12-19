import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  try {
    const response = await fetch(`${backendUrl}/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    );
  }
}
