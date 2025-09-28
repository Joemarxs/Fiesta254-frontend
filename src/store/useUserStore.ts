import { useState, useEffect } from 'react';
import { useAppSelector, useAppDispatch } from './hooks';
// Mock user data for development
const mockCurrentUser = {
  id: '1',
  name: 'John Doe',
  email: 'john@example.com',
  profileImage: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
  isHost: true
};
const useUserStore = () => {
  // In a real app, this would interact with the Redux store
  // For now, we'll use local state with mock data
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState(mockCurrentUser);
  const [error, setError] = useState<string | null>(null);
  const login = (email: string, password: string) => {
    // Mock login logic
    if (email && password) {
      setIsAuthenticated(true);
      setCurrentUser(mockCurrentUser);
      setError(null);
      return true;
    } else {
      setError('Invalid credentials');
      return false;
    }
  };
  const signup = (name: string, email: string, password: string) => {
    // Mock signup logic
    if (name && email && password) {
      setIsAuthenticated(true);
      setCurrentUser({
        ...mockCurrentUser,
        name,
        email
      });
      setError(null);
      return true;
    } else {
      setError('Failed to create account');
      return false;
    }
  };
  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null as any);
  };
  return {
    isAuthenticated,
    currentUser,
    error,
    login,
    signup,
    logout
  };
};
export default useUserStore;