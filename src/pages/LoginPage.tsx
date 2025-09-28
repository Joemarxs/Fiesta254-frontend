import React, { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { loginUserAsync } from "../store/slices/usersSlice"; // async thunk

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const { isAuthenticated, error, isLoading } = useAppSelector(
    (state) => state.users
  );

  // Get redirect URL from query string (default to home if not provided)
  const queryParams = new URLSearchParams(location.search);
  const redirectUrl = queryParams.get("redirect") || "/";

  useEffect(() => {
    if (isAuthenticated) {
      navigate(redirectUrl);
    }
    if (error) {
      setErrorMessage(error);
    }
  }, [isAuthenticated, error, navigate, redirectUrl]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    if (!email || !password) {
      setErrorMessage("Please enter both email and password");
      return;
    }

    dispatch(loginUserAsync({ email, password }));
  };

  return (
    <div className="bg-gray-50 min-h-screen py-12">
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

          {errorMessage && (
            <div className="mb-4 p-3 bg-red-100 border border-red-200 text-red-700 rounded-lg">
              {errorMessage}
            </div>
          )}

          <form onSubmit={handleSubmit}>
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
              <div className="flex justify-between mb-2">
                <label
                  htmlFor="password"
                  className="text-gray-700 font-medium"
                >
                  Password
                </label>
                <a
                  href="#"
                  className="text-indigo-600 text-sm hover:underline"
                >
                  Forgot password?
                </a>
              </div>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                required
              />
            </div>

            {/* Submit button with hidden state + loader */}
            <button
              type="submit"
              className={`w-full flex items-center justify-center rounded-lg px-4 py-3 font-medium transition duration-300 mb-4 disabled:opacity-70 
                ${isLoading ? "bg-gray-50 text-gray-50 cursor-default" : "bg-indigo-600 text-white hover:bg-indigo-700"}
              `}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="flex space-x-3 items-center justify-center">
                  <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                  <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                  <div className="w-4 h-4 bg-indigo-600 rounded-full animate-bounce"></div>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center">
              <p className="text-gray-600">
                Don&apos;t have an account?{" "}
                <Link
                  to={`/signup?redirect=${encodeURIComponent(redirectUrl)}`}
                  className="text-indigo-600 hover:text-indigo-800"
                >
                  Sign up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
