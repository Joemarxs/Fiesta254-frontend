import axios from 'axios';
// Create an axios instance with default config
const apiClient = axios.create({
  // Replace with your actual API base URL
  baseURL: 'https://your-api-base-url.com/api',
  headers: {
    'Content-Type': 'application/json'
  }
});
// Request interceptor for adding auth token
apiClient.interceptors.request.use(config => {
  // Get token from localStorage or other storage
  const token = localStorage.getItem('authToken');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, error => {
  return Promise.reject(error);
});
// Response interceptor for handling common errors
apiClient.interceptors.response.use(response => {
  return response;
}, error => {
  // Handle common errors (401, 403, etc.)
  if (error.response) {
    if (error.response.status === 401) {
      // Unauthorized - redirect to login or refresh token
      // Example: store.dispatch(logout())
    }
  }
  return Promise.reject(error);
});
export default apiClient;