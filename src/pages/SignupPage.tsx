import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { registerUserAsync, loginUserAsync } from '../store/slices/usersSlice';

const SignupPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const { isAuthenticated, error, isLoading } = useAppSelector(
    (state) => state.users
  );

  // redirect URL from query string (or home by default)
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get('redirect') || '/';

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl);
    }
    if (error) {
      setErrorMessage(error);
    }
  }, [isAuthenticated, error, navigate, redirectUrl]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name || !email || !password || !confirmPassword) {
      setErrorMessage('Please fill in all fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage('Passwords do not match');
      return;
    }
    if (password.length < 8) {
      setErrorMessage('Password must be at least 8 characters long');
      return;
    }

    try {
      // 1. Register the user
      const resultAction = await dispatch(
        registerUserAsync({
          name,
          email,
          password,
          password_confirm: confirmPassword,
        })
      );

      if (registerUserAsync.fulfilled.match(resultAction)) {
        // 2. Auto-login after successful signup
        await dispatch(loginUserAsync({ email, password }));
      } else {
        setErrorMessage('Signup failed. Please try again.');
      }
    } catch (err: any) {
      setErrorMessage('An error occurred during signup');
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Create an Account
            </h1>
            <p className="text-gray-600">
              Join EventHub to discover and book amazing events
            </p>
          </div>

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <label
                htmlFor="name"
                className="block text-gray-700 font-medium mb-2"
              >
                Full Name
              </label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="email"
                className="block text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            <div className="mb-6">
              <label
                htmlFor="password"
                className="block text-gray-700 font-medium mb-2"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
              <p className="mt-2 text-sm text-gray-500">
                Password must be at least 8 characters long
              </p>
            </div>

            <div className="mb-6">
              <label
                htmlFor="confirmPassword"
                className="block text-gray-700 font-medium mb-2"
              >
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Submit button with hidden state + loader */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center rounded-lg px-4 py-3 font-medium transition duration-300 mb-4 disabled:opacity-70 
                ${isLoading ? 'bg-gray-50 text-gray-50 cursor-default' : 'bg-indigo-600 text-white hover:bg-indigo-700'}
              `}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex space-x-3 items-center justify-center">
                  <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-5 h-5 bg-indigo-600 rounded-full animate-bounce"></div>
                </div>
              ) : (
                'Sign Up'
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Already have an account?{' '}
                <Link
                  to={`/login?redirect=${encodeURIComponent(redirectUrl)}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Sign in
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;
