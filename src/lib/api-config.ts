// API Configuration for MongoDB Backend
// Change this to your backend URL when deploying.
// You can set VITE_API_BASE_URL in a `.env` file in the project root.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const API_ENDPOINTS = {
  // Auth
  AUTH_REGISTER: `${API_BASE_URL}/auth/register`,
  AUTH_LOGIN: `${API_BASE_URL}/auth/login`,
  AUTH_PROFILE: `${API_BASE_URL}/auth/profile`,
  
  // Machines
  MACHINES: `${API_BASE_URL}/machines`,
  MACHINES_SEARCH: `${API_BASE_URL}/machines/search`,
  MACHINE_BOOK: `${API_BASE_URL}/machines/book`,
  MY_BOOKINGS: `${API_BASE_URL}/machines/bookings`,
  
  // Schemes
  SCHEMES: `${API_BASE_URL}/schemes`,
  
  // FAQs
  FAQs: `${API_BASE_URL}/faqs`,
  
  // Fertilizers
  FERTILIZERS: `${API_BASE_URL}/fertilizers`,
  
  // Diseases
  DISEASES: `${API_BASE_URL}/diseases`,
};

export default API_BASE_URL;
