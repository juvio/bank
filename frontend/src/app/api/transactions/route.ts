import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const page = searchParams.get('page') || '0';
  const limit = searchParams.get('limit') || '10';
  
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  
  try {
    const response = await fetch(`${backendUrl}/api/transactions?page=${page}&limit=${limit}`);
    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('Error fetching from backend:', error);
    return NextResponse.json({ error: 'Failed to fetch transactions' }, { status: 500 });
  }
}
