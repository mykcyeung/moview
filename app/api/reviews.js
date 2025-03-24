export const fetchReviews = async () => {
  const API_URL = process.env.NEXT_PUBLIC_API_URL;

  try {
    // API URL
    const res = await fetch(`${API_URL}/reviews`);

    // Check if the response is ok
    if (!res.ok) {
      const errorData = await res.json(); // Get error message from the response body
      throw new Error(errorData.message || 'Failed to fetch reviews');
    }

    // Parse JSON data from the response
    const data = await res.json();
    
    return data;
  } catch (error) {
    // Handle fetch error or server response error
    console.error('Error fetching reviews:', error);
    // Optionally, you can display a user-friendly message
    throw new Error(error.message || 'An unexpected error occurred while fetching reviews.');
  }
};
