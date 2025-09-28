import apiClient from './apiClient';
import { User } from '../store/slices/usersSlice';
// Define the API endpoints for users
const USERS_URL = '/users';
const AUTH_URL = '/auth';
// Register new user
export const registerUser = async (userData: {
  name: string;
  email: string;
  password: string;
}) => {
  /*
  const response = await apiClient.post(`${AUTH_URL}/register`, userData)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};
// Login user
export const loginUser = async (credentials: {
  email: string;
  password: string;
}) => {
  /*
  const response = await apiClient.post(`${AUTH_URL}/login`, credentials)
  // Store token in localStorage
  if (response.data.token) {
    localStorage.setItem('authToken', response.data.token)
  }
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};
// Logout user
export const logoutUser = () => {
  /*
  // Remove token from localStorage
  localStorage.removeItem('authToken')
  // You might want to call an API endpoint to invalidate the token on the server
  // await apiClient.post(`${AUTH_URL}/logout`)
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve();
};
// Get current user profile
export const getCurrentUser = async () => {
  /*
  const response = await apiClient.get(`${USERS_URL}/me`)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve(null);
};
// Update user profile
export const updateUserProfile = async (userData: Partial<User>) => {
  /*
  const response = await apiClient.put(`${USERS_URL}/me`, userData)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};
// Become a host
export const becomeHost = async () => {
  /*
  const response = await apiClient.post(`${USERS_URL}/become-host`)
  return response.data
  */
  // Mock implementation - replace with actual API call
  return Promise.resolve({});
};