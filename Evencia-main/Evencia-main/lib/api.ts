const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5001/api';

// Generic API call function
async function apiCall(endpoint: string, options: RequestInit = {}) {
  const url = `${API_BASE_URL}${endpoint}`;
  
  const defaultOptions: RequestInit = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const response = await fetch(url, { ...defaultOptions, ...options });
  
  if (!response.ok) {
    throw new Error(`API call failed: ${response.statusText}`);
  }
  
  return response.json();
}

// User API calls
export const userAPI = {
  getById: (userId: string) => apiCall(`/users/${userId}`),
  getByClerkId: (clerkId: string) => apiCall(`/users/clerk/${clerkId}`),
  create: (userData: any) => apiCall('/users', {
    method: 'POST',
    body: JSON.stringify(userData),
  }),
  update: (userId: string, userData: any) => apiCall(`/users/${userId}`, {
    method: 'PUT',
    body: JSON.stringify(userData),
  }),
  delete: (userId: string) => apiCall(`/users/${userId}`, {
    method: 'DELETE',
  }),
};

// Event API calls
export const eventAPI = {
  getAll: (params: { query?: string; category?: string; limit?: number; page?: number } = {}) => {
    const searchParams = new URLSearchParams();
    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined) {
        searchParams.append(key, value.toString());
      }
    });
    return apiCall(`/events?${searchParams.toString()}`);
  },
  getById: (eventId: string) => apiCall(`/events/${eventId}`),
  create: (eventData: any) => apiCall('/events', {
    method: 'POST',
    body: JSON.stringify(eventData),
  }),
  update: (eventId: string, eventData: any) => apiCall(`/events/${eventId}`, {
    method: 'PUT',
    body: JSON.stringify(eventData),
  }),
  delete: (eventId: string) => apiCall(`/events/${eventId}`, {
    method: 'DELETE',
  }),
};

// Category API calls
export const categoryAPI = {
  getAll: () => apiCall('/categories'),
  create: (categoryData: any) => apiCall('/categories', {
    method: 'POST',
    body: JSON.stringify(categoryData),
  }),
};

