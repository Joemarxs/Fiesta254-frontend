import axios from 'axios';

// Create an axios instance with default config
const apiClient = axios.create({
  baseURL: 'http://127.0.0.1:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor for adding auth token
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('authToken');

    // Skip adding Authorization header for register & login
    const isAuthFreeEndpoint =
      config.url?.includes('/register') || config.url?.includes('/login');

    if (token && !isAuthFreeEndpoint) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for handling common errors
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response) {
      if (error.response.status === 401) {
        console.warn('Unauthorized - maybe token expired or missing.');
        // TODO: Optionally trigger logout or token refresh here
        // Example: store.dispatch(logoutUserAsync());
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;
