import apiClient from './apiClient';
import { User } from '../store/slices/usersSlice';

// Base URL for your backend
const BASE_URL = '/user_profile';

// Register new user
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
  password_confirm: string;
}) => {
  const response = await apiClient.post(`${BASE_URL}/register`, userData);
  return response.data;
};

// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  const response = await apiClient.post(`${BASE_URL}/login`, credentials);

  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token);
  }

  return response.data;
};

// Logout user
export const logoutUser = async () => {
  localStorage.removeItem('authToken');
  const response = await apiClient.post(`${BASE_URL}/logout`);
  return response.data;
};

// Get current user profile
export const getCurrentUser = async () => {
  const response = await apiClient.get(`${BASE_URL}/me`);
  return response.data;
};

// Update user profile
export const updateUserProfile = async (userData: Partial<User>) => {
  const response = await apiClient.put(`${BASE_URL}/me`, userData);
  return response.data;
};

// Become a host
export const becomeHost = async () => {
  const response = await apiClient.post(`${BASE_URL}/become-host`);
  return response.data;
};
