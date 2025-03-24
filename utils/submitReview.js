export const submitReview = async (method, reviewData, reviewId = null) => {
  try {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;

    // Create an endpoint depending on the method and reviewId
    let url = `${API_URL}/reviews`;
    if (reviewId && (method === 'PUT' || method === 'DELETE')) {
      url = `${url}/${reviewId}`;
    }

    const options = {
      method: method, // HTTP method (GET, POST, PUT, DELETE)
      headers: {
        'Content-Type': 'application/json',
      },
      body: method === 'POST' || method === 'PUT' ? JSON.stringify(reviewData) : null, // Only include body for POST and PUT
    };

    const response = await fetch(url, options);

    // If response is not OK, throw an error with the message
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Request failed');
    }

    // Parse the response data (in case of POST, PUT or DELETE)
    const data = await response.json();
    console.log('Operation successful:', data);
    return data;

  } catch (error) {
    console.error('Error performing operation:', error);
    throw error;
  }
};
