export async function POST(request) {
  try {
    const requestData = await request.json();

    console.log('QA Request:', requestData);

    if (!requestData.vector_db || !requestData.question) {
      return new Response(
        JSON.stringify({ 
          error: 'Missing required fields: vector_db and question are required' 
        }), 
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' },
        }
      );
    }

    const BACKEND_URL = process.env.BACKEND_URL || 'http://localhost:5000';

    const backendResponse = await fetch(`${BACKEND_URL}/qa`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    if (!backendResponse.ok) {
      const errorText = await backendResponse.text();
      console.error(`Backend API error (${backendResponse.status}):`, errorText);
      throw new Error(`Backend API error: ${backendResponse.status}`);
    }

    const data = await backendResponse.json();

    console.log('QA Response:', data);

    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.error('Error in QA API route:', error);

    return new Response(JSON.stringify({ 
      error: error.message,
      answer: "Sorry, I couldn't process your question at this time. Please try again later."
    }), {
      status: error.name === 'AbortError' ? 504 : 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}
