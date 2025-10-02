import React, { useEffect, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Search as SearchIcon, 
  Menu as MenuIcon, 
  X as CloseIcon, 
  Calendar, 
  MapPin, 
  Bell, 
  LogOut, 
  LayoutDashboard 
} from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logoutUserAsync, getCurrentUserAsync } from '../store/slices/usersSlice';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { currentUser, isAuthenticated, hasFetchedUser } = useAppSelector((state) => state.users);

  // Scroll shadow effect
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close menus on route change
  useEffect(() => {
    setIsMenuOpen(false);
    setIsSearchExpanded(false);
    setIsProfileDropdownOpen(false);
  }, [location.pathname]);

  // On mount, fetch current user if token exists and not fetched yet
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token && !hasFetchedUser) {
      const timer = setTimeout(() => {
        dispatch(getCurrentUserAsync());
      }, 300); // small delay for token
      return () => clearTimeout(timer);
    }
  }, [dispatch, hasFetchedUser]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
    setIsSearchExpanded(false);
  };

  const handleLogout = async () => {
    await dispatch(logoutUserAsync());
    navigate('/');
  };

  return (
    <header className={`sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'bg-white shadow-md' : 'bg-white shadow-sm'}`}>
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <Calendar className="h-8 w-8 text-indigo-600 mr-2" />
            <span className="text-2xl font-bold text-indigo-600">Fiesta254</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative">
              <div className="relative flex items-center">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="pl-10 pr-4 py-2 w-64 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-300"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              </div>
            </form>

            {/* Navigation Links */}
            <nav className="flex items-center space-x-6">
              <Link
                to="/events"
                className={`text-gray-700 hover:text-indigo-600 font-medium transition-colors ${location.pathname === '/events' ? 'text-indigo-600' : ''}`}
              >
                Explore
              </Link>
              <Link
                to="/categories"
                className={`text-gray-700 hover:text-indigo-600 font-medium transition-colors ${location.pathname === '/categories' ? 'text-indigo-600' : ''}`}
              >
                Categories
              </Link>

              {/* Host Events */}
              <Link
                to="/become-host"
                className={`text-gray-700 hover:text-indigo-600 font-medium transition-colors ${location.pathname === '/become-host' ? 'text-indigo-600' : ''}`}
              >
                Host Events
              </Link>

              {/* Authenticated user dropdown */}
              {isAuthenticated && currentUser ? (
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <button onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)} className="flex items-center space-x-2">
                      <img
                        src={currentUser.profileImage || '/default-avatar.png'}
                        alt={currentUser.name}
                        className="h-8 w-8 rounded-full object-cover border-2 border-indigo-100"
                      />
                      <span className="text-gray-700 font-medium">{currentUser.name.split(' ')[0]}</span>
                    </button>

                    {isProfileDropdownOpen && (
                      <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                        <Link to="/dashboard" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <LayoutDashboard size={16} className="mr-2" /> Dashboard
                        </Link>
                        {currentUser.isHost && (
                          <Link to="/create-event" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                            <Calendar size={16} className="mr-2" /> Create Event
                          </Link>
                        )}
                        <Link to="/notifications" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <Bell size={16} className="mr-2" /> Notifications
                        </Link>
                        <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center">
                          <LogOut size={16} className="mr-2" /> Sign Out
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="flex items-center space-x-2">
                  <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">Sign Up</Link>
                  <Link to="/login" className="text-gray-700 hover:text-indigo-600 font-medium transition-colors">Login</Link>
                </div>
              )}
            </nav>
          </div>

          {/* Mobile Navigation */}
          <div className="flex items-center md:hidden">
            {!isSearchExpanded ? (
              <>
                <button onClick={() => setIsSearchExpanded(true)} className="p-2 mr-2 text-gray-700">
                  <SearchIcon className="h-6 w-6" />
                </button>
                <button onClick={toggleMenu} className="p-2 text-gray-700">
                  {isMenuOpen ? <CloseIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
                </button>
              </>
            ) : (
              <form onSubmit={handleSearch} className="flex-1 flex items-center">
                <input
                  type="text"
                  placeholder="Search events..."
                  className="flex-1 pl-3 pr-10 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  autoFocus
                />
                <button type="button" onClick={() => setIsSearchExpanded(false)} className="ml-2">
                  <CloseIcon className="h-6 w-6 text-gray-500" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden mt-3 py-3 border-t border-gray-200">
            <nav className="flex flex-col space-y-3">
              <Link to="/events" className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2">
                <Calendar size={18} className="mr-3" /> Explore Events
              </Link>
              <Link to="/categories" className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2">
                <MapPin size={18} className="mr-3" /> Categories
              </Link>
              <Link to="/become-host" className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2">
                <Calendar size={18} className="mr-3" /> Become a Host
              </Link>

              {isAuthenticated && currentUser ? (
                <>
                  <div className="flex items-center py-2">
                    <img src={currentUser.profileImage || '/default-avatar.png'} alt={currentUser.name} className="h-8 w-8 rounded-full object-cover mr-3" />
                    <span className="font-medium">{currentUser.name}</span>
                  </div>
                  <Link to="/dashboard" className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2">
                    <LayoutDashboard size={18} className="mr-3" /> Dashboard
                  </Link>
                  {currentUser.isHost && (
                    <Link to="/create-event" className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2">
                      <Calendar size={18} className="mr-3" /> Create Event
                    </Link>
                  )}
                  <Link to="/notifications" className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2">
                    <Bell size={18} className="mr-3" /> Notifications
                  </Link>
                  <button onClick={handleLogout} className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2">
                    <LogOut size={18} className="mr-3" /> Sign Out
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login" className="flex items-center text-gray-700 hover:text-indigo-600 font-medium py-2">
                    <Calendar size={18} className="mr-3" /> Login
                  </Link>
                  <Link to="/signup" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300 text-center mt-2">
                    Sign Up
                  </Link>
                </>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
