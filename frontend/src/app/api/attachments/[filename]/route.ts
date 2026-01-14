import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  request: NextRequest,
  { params }: RouteContext<'/api/attachments/[filename]'>
) {
  const token = request.cookies.get('token')?.value;
  const backendUrl = process.env.BACKEND_URL || 'http://localhost:5000';
  const { filename } = await params;

  try {
    const response = await fetch(`${backendUrl}/uploads/${filename}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { error: 'File not found' },
        { status: response.status }
      );
    }

    // Pega o buffer do arquivo
    const blob = await response.blob();

    // Retorna com os headers corretos
    return new NextResponse(blob, {
      headers: {
        'Content-Type':
          response.headers.get('Content-Type') || 'application/octet-stream',
        'Content-Disposition': `inline; filename="${filename}"`,
      },
    });
  } catch (error) {
    console.error('Error fetching from backend:', error);
    return NextResponse.json(
      { error: 'Failed to fetch attachment' },
      { status: 500 }
    );
  }
}
