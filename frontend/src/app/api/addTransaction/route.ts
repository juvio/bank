import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  const token = request.cookies.get('token')?.value;

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  try {
    const response = await fetch(`${backendUrl}/account/transaction`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: await request.json(),
    });
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error posting to backend:', error);
    return NextResponse.json(
      { error: 'Failed to create transaction' },
      { status: 500 }
    );
  }
}
