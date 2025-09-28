import React, { useEffect, useState, Component } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { login } from '../store/slices/usersSlice';
const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const {
    isAuthenticated,
    error
  } = useAppSelector(state => state.users);
  // Get the redirect URL from query parameters
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/';
  useEffect(() => {
    // If already authenticated, redirect to the specified URL or home
    if (isAuthenticated) {
      navigate(redirectUrl);
    }
    // Display error from store if present
    if (error) {
      setErrorMessage(error);
    }
  }, [isAuthenticated, error, navigate, redirectUrl]);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    if (!email || !password) {
      setErrorMessage('Please enter both email and password');
      return;
    }
    dispatch(login({
      email,
      password
    }));
  };
  return <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Sign In to EventHub
            </h1>
            <p className="text-gray-600">
              Welcome back! Please enter your details
            </p>
          </div>
          {errorMessage && <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg">
              {errorMessage}
            </div>}
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-700 font-medium mb-2">
                Email Address
              </label>
              <input type="email" id="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <div className="mb-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-gray-700 font-medium">
                  Password
                </label>
                <a href="#" className="text-indigo-600 text-sm hover:underline">
                  Forgot password?
                </a>
              </div>
              <input type="password" id="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
            </div>
            <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-indigo-700 transition duration-300 mb-4">
              Sign In
            </button>
            <div className="text-center">
              <p className="text-gray-600">
                Don't have an account?{' '}
                <Link to={`/signup?redirect=${encodeURIComponent(redirectUrl)}`} className="text-indigo-600 hover:text-indigo-800">
                  Sign up
                </Link>
              </p>
            </div>
          </form>
          <div className="mt-6 pt-6 border-t border-gray-200">
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition duration-300 mb-3">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05" />
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" />
              </svg>
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-center border border-gray-300 rounded-lg px-4 py-2 font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
              </svg>
              Continue with Facebook
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default LoginPage;