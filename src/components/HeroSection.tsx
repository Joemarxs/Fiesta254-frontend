import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Calendar, MapPin, ArrowRight } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
const HeroSection = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [location, setLocation] = useState('');
  const [date, setDate] = useState('');
  const {
    currentUser,
    isAuthenticated
  } = useAppSelector(state => state.users);
  const isHost = currentUser?.isHost || false;
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Search for:', {
      searchQuery,
      location,
      date
    });
    // In a real app, this would navigate to search results
  };
  return <div className="relative bg-gradient-to-r from-indigo-900 to-purple-800 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M0 40L40 0M20 40L40 20M0 20L20 0" fill="none" stroke="currentColor" strokeWidth="1" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
      </div>
      {/* Hero content */}
      <div className="relative container mx-auto px-4 py-16 md:py-28 lg:py-32">
        <div className="max-w-3xl mx-auto text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
            Discover <span className="text-yellow-400">Unforgettable</span>{' '}
            Events Near You
          </h1>
          <p className="text-lg md:text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            Find and book tickets to the most exciting concerts, workshops,
            conferences, and more. Join thousands of people discovering new
            experiences every day.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link to="/events" className="rounded-lg bg-indigo-600 px-6 py-3 font-medium hover:bg-indigo-700 transition duration-300 flex items-center">
              Explore Events
              <ArrowRight size={18} className="ml-2" />
            </Link>
            <Link to={isHost ? '/create-event' : '/become-host'} className="rounded-lg bg-white px-6 py-3 font-medium text-indigo-900 hover:bg-gray-100 transition duration-300">
              {isHost ? 'Host an Event' : 'Become a Host'}
            </Link>
          </div>
        </div>
        {/* Search form */}
        <div className="bg-white rounded-lg shadow-xl p-2 md:p-4 max-w-4xl mx-auto">
          <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Search events..." className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
            </div>
            <div className="flex-1 relative">
              <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="text" placeholder="Location" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={location} onChange={e => setLocation(e.target.value)} />
            </div>
            <div className="flex-1 relative">
              <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
              <input type="date" placeholder="Date" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={date} onChange={e => setDate(e.target.value)} />
            </div>
            <button type="submit" className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 whitespace-nowrap">
              Find Events
            </button>
          </form>
        </div>
        {/* Stats */}
        <div className="mt-12 flex flex-wrap justify-center gap-8 md:gap-16">
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">10,000+</p>
            <p className="text-indigo-200">Events</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">50,000+</p>
            <p className="text-indigo-200">Users</p>
          </div>
          <div className="text-center">
            <p className="text-3xl md:text-4xl font-bold">1,000+</p>
            <p className="text-indigo-200">Hosts</p>
          </div>
        </div>
      </div>
      {/* Wave divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 120" className="w-full h-auto">
          <path fill="#F9FAFB" fillOpacity="1" d="M0,64L60,80C120,96,240,128,360,122.7C480,117,600,75,720,64C840,53,960,75,1080,80C1200,85,1320,75,1380,69.3L1440,64L1440,320L1380,320C1320,320,1200,320,1080,320C960,320,840,320,720,320C600,320,480,320,360,320C240,320,120,320,60,320L0,320Z"></path>
        </svg>
      </div>
    </div>;
};
export default HeroSection;