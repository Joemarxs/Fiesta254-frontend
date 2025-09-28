import React from 'react';
import { Link } from 'react-router-dom';
import { eventCategories } from '../data/mockData';
import { ChevronRight } from 'lucide-react';
import { Music, Laptop, Wine, Heart, Briefcase, Palette, Trophy, Theater } from 'lucide-react';
const CategoriesPage = () => {
  // Map category names to Lucide icons
  const getIcon = (name: string, size = 32) => {
    switch (name) {
      case 'Music':
        return <Music size={size} className="text-indigo-600" />;
      case 'Technology':
        return <Laptop size={size} className="text-indigo-600" />;
      case 'Food & Drink':
        return <Wine size={size} className="text-indigo-600" />;
      case 'Wellness':
        return <Heart size={size} className="text-indigo-600" />;
      case 'Business':
        return <Briefcase size={size} className="text-indigo-600" />;
      case 'Art':
        return <Palette size={size} className="text-indigo-600" />;
      case 'Sports':
        return <Trophy size={size} className="text-indigo-600" />;
      case 'Entertainment':
        return <Theater size={size} className="text-indigo-600" />;
      default:
        return <div className="text-3xl">{name.charAt(0)}</div>;
    }
  };
  return <div className="bg-gray-50 min-h-screen">
      <div className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Event Categories</h1>
          <p className="text-indigo-200 max-w-2xl">
            Browse events by category to find experiences that match your
            interests. From music concerts to tech workshops, we have something
            for everyone.
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {eventCategories.map(category => <Link key={category.id} to={`/events?category=${category.name}`} className="bg-white rounded-lg shadow-sm p-6 transition-all duration-300 hover:shadow-md hover:-translate-y-1">
              <div className="flex items-center mb-4">
                <div className="bg-gray-100 rounded-full p-4 mr-4">
                  {getIcon(category.name)}
                </div>
                <h2 className="text-xl font-semibold text-gray-800">
                  {category.name}
                </h2>
              </div>
              <p className="text-gray-600 mb-4">
                Discover the best {category.name.toLowerCase()} events happening
                near you
              </p>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">120+ events</span>
                <span className="text-indigo-600 flex items-center">
                  Explore <ChevronRight size={16} className="ml-1" />
                </span>
              </div>
            </Link>)}
        </div>
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">
            Popular Categories This Month
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-gradient-to-r from-purple-500 to-indigo-600 rounded-lg shadow-md overflow-hidden text-white">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Music Festivals</h3>
                <p className="mb-4 opacity-90">
                  Experience the best live music performances from top artists
                </p>
                <Link to="/events?category=Music" className="inline-flex items-center bg-white text-indigo-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View Events <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-lg shadow-md overflow-hidden text-white">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Tech Conferences</h3>
                <p className="mb-4 opacity-90">
                  Stay updated with the latest technology trends and innovations
                </p>
                <Link to="/events?category=Technology" className="inline-flex items-center bg-white text-blue-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View Events <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
            <div className="bg-gradient-to-r from-amber-500 to-orange-600 rounded-lg shadow-md overflow-hidden text-white">
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Food & Wine</h3>
                <p className="mb-4 opacity-90">
                  Indulge in culinary experiences and wine tasting events
                </p>
                <Link to="/events?category=Food & Drink" className="inline-flex items-center bg-white text-orange-600 px-4 py-2 rounded-lg font-medium hover:bg-gray-100 transition-colors">
                  View Events <ChevronRight size={16} className="ml-1" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default CategoriesPage;