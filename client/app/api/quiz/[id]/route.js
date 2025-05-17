import { NextResponse } from 'next/server';

export async function GET(request, { params }) {

  const id = await params?.id;
  
  if (!id) {
    return NextResponse.json(
      { message: 'Quiz ID is required' },
      { status: 400 }
    );
  }

  try {
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000';

    const response = await fetch(`${BACKEND_API_URL}/quiz/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Backend returned status ${response.status}`);
    }

    const data = await response.json();
    
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: 'Error fetching quiz data', error: error.message },
      { status: 500 }
    );
  }
}