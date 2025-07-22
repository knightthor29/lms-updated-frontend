// API base configuration
const API_BASE_URL = 'http://localhost:8080/api'; // Replace with your Spring Boot backend URL

// Generic API function
async function apiCall<T>(endpoint: string, options?: RequestInit): Promise<T> {
  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
      ...options,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API call failed for ${endpoint}:`, error);
    throw error;
  }
}

// Books API
export const booksApi = {
  getAll: () => apiCall<any[]>('/books'),
  getById: (id: string) => apiCall<any>(`/books/${id}`),
  create: (book: any) => apiCall<any>('/books', { method: 'POST', body: JSON.stringify(book) }),
  update: (id: string, book: any) => apiCall<any>(`/books/${id}`, { method: 'PUT', body: JSON.stringify(book) }),
  delete: (id: string) => apiCall<void>(`/books/${id}`, { method: 'DELETE' }),
  search: (query: string) => apiCall<any[]>(`/books/search?q=${encodeURIComponent(query)}`),
  getByCategory: (category: string) => apiCall<any[]>(`/books/category/${category}`),
};

// Members API
export const membersApi = {
  getAll: () => apiCall<any[]>('/members'),
  getById: (id: string) => apiCall<any>(`/members/${id}`),
  create: (member: any) => apiCall<any>('/members', { method: 'POST', body: JSON.stringify(member) }),
  update: (id: string, member: any) => apiCall<any>(`/members/${id}`, { method: 'PUT', body: JSON.stringify(member) }),
  delete: (id: string) => apiCall<void>(`/members/${id}`, { method: 'DELETE' }),
  search: (query: string) => apiCall<any[]>(`/members/search?q=${encodeURIComponent(query)}`),
};

// Issues API
export const issuesApi = {
  getAll: () => apiCall<any[]>('/issues'),
  getById: (id: string) => apiCall<any>(`/issues/${id}`),
  issueBook: (bookId: string, memberId: string) => 
    apiCall<any>('/issues', { method: 'POST', body: JSON.stringify({ bookId, memberId }) }),
  returnBook: (issueId: string) => 
    apiCall<any>(`/issues/${issueId}/return`, { method: 'PUT' }),
  getByMember: (memberId: string) => apiCall<any[]>(`/issues/member/${memberId}`),
  getOverdue: () => apiCall<any[]>('/issues/overdue'),
};

// Categories API
export const categoriesApi = {
  getAll: () => apiCall<any[]>('/categories'),
  create: (category: any) => apiCall<any>('/categories', { method: 'POST', body: JSON.stringify(category) }),
  update: (id: string, category: any) => apiCall<any>(`/categories/${id}`, { method: 'PUT', body: JSON.stringify(category) }),
  delete: (id: string) => apiCall<void>(`/categories/${id}`, { method: 'DELETE' }),
};

// Dashboard API
export const dashboardApi = {
  getStats: () => apiCall<any>('/dashboard/stats'),
  getRecentActivities: () => apiCall<any[]>('/dashboard/activities'),
};