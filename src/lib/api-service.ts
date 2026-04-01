import { API_ENDPOINTS } from './api-config';

// Helper function to get auth token
const getAuthToken = (): string | null => {
  return localStorage.getItem('agroEase_token');
};

// Helper function for API requests
const apiRequest = async (
  endpoint: string,
  method: string = 'GET',
  body?: any,
  requiresAuth: boolean = false
): Promise<any> => {
  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  if (requiresAuth) {
    const token = getAuthToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const options: RequestInit = {
    method,
    headers,
  };

  if (body) {
    options.body = JSON.stringify(body);
  }

  try {
    console.log(`[API] Making ${method} request to: ${endpoint}`);
    if (body) {
      console.log('[API] Request body:', body);
    }
    
    const response = await fetch(endpoint, options);
    console.log(`[API] Response status: ${response.status}`);
    
    const data = await response.json();
    console.log('[API] Response data:', data);

    if (!response.ok) {
      throw new Error(data.message || data.error || 'Something went wrong');
    }

    return data;
  } catch (error) {
    console.error('[API] Error details:', error);
    if (error instanceof TypeError && error.message === 'Failed to fetch') {
      console.error('[API] Network error - Backend server might not be running');
      throw new Error('Cannot connect to server. Please ensure the backend server is running on port 5000.');
    }
    throw error;
  }
};

// Auth API
export const authAPI = {
  register: async (userData: {
    name: string;
    mobile: string;
    password: string;
    village?: string;
    district?: string;
    state?: string;
    farmSize?: string;
    cropTypes?: string[];
    preferredLanguage?: string;
  }) => {
    return apiRequest(API_ENDPOINTS.AUTH_REGISTER, 'POST', userData);
  },

  login: async (credentials: { mobile: string; password: string }) => {
    return apiRequest(API_ENDPOINTS.AUTH_LOGIN, 'POST', credentials);
  },

  getProfile: async () => {
    return apiRequest(API_ENDPOINTS.AUTH_PROFILE, 'GET', null, true);
  },
};

// Machines API
export const machinesAPI = {
  getAll: async () => {
    return apiRequest(API_ENDPOINTS.MACHINES);
  },

  getById: async (id: string) => {
    return apiRequest(`${API_ENDPOINTS.MACHINES}/${id}`);
  },

  search: async (query: { location?: string; type?: string; minPrice?: number; maxPrice?: number }) => {
    const params = new URLSearchParams();
    if (query.location) params.append('location', query.location);
    if (query.type) params.append('type', query.type);
    if (query.minPrice) params.append('minPrice', query.minPrice.toString());
    if (query.maxPrice) params.append('maxPrice', query.maxPrice.toString());
    
    return apiRequest(`${API_ENDPOINTS.MACHINES_SEARCH}?${params.toString()}`);
  },

  createBooking: async (bookingData: {
    machineId: string;
    date: string;
    timeSlot?: string;
    bookingType: 'hourly' | 'daily';
    hours?: number;
    totalPrice: number;
    notes?: string;
  }) => {
    return apiRequest(API_ENDPOINTS.MACHINE_BOOK, 'POST', bookingData, true);
  },

  getMyBookings: async () => {
    return apiRequest(API_ENDPOINTS.MY_BOOKINGS, 'GET', null, true);
  },
};

// Schemes API
export const schemesAPI = {
  getAll: async () => {
    return apiRequest(API_ENDPOINTS.SCHEMES);
  },
};

// FAQs API
export const faqsAPI = {
  getAll: async () => {
    return apiRequest(API_ENDPOINTS.FAQs);
  },
};

// Fertilizers API
export const fertilizersAPI = {
  getAll: async () => {
    return apiRequest(API_ENDPOINTS.FERTILIZERS);
  },
};

// Diseases API
export const diseasesAPI = {
  getAll: async () => {
    return apiRequest(API_ENDPOINTS.DISEASES);
  },
};

export default {
  auth: authAPI,
  machines: machinesAPI,
  schemes: schemesAPI,
  faqs: faqsAPI,
  fertilizers: fertilizersAPI,
  diseases: diseasesAPI,
};
