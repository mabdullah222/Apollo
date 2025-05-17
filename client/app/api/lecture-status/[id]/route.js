import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
  const param = await params;
  const id = param?.id;
  try {
    // Replace with your actual backend API URL
    const BACKEND_API_URL = process.env.BACKEND_API_URL || 'http://localhost:5000';
    
    const response = await fetch(`${BACKEND_API_URL}/lecture-status/${id}`, {
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Don't cache the API response
    });
    
    if (!response.ok) {
      throw new Error(`Backend returned ${response.status}`);
    }
    
    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('API route error:', error);
    return NextResponse.json(
      { message: 'Error fetching lecture data', error: error.message },
      { status: 500 }
    );
  }
}