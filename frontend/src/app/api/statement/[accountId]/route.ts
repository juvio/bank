import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  ctx: RouteContext<'/api/statement/[accountId]'>
) {
  const { accountId } = await ctx.params;
  const token = request.cookies.get('token')?.value;

  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';

  try {
    const response = await fetch(
      `${backendUrl}/account/${accountId}/statement`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch account' },
      { status: 500 }
    );
  }
}
