import React from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { mockEvents } from '../data/mockData';
import { ChevronRight } from 'lucide-react';
const FeaturedEvents = () => {
  // Get only the first 8 events for featured section
  const featuredEvents = mockEvents.slice(0, 8);
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-10 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Featured Events
            </h2>
            <p className="text-gray-600 max-w-2xl">
              Discover the most exciting and popular events happening near you.
              Don't miss out on these unforgettable experiences.
            </p>
          </div>
          <Link to="/events" className="inline-flex items-center text-indigo-600 font-medium mt-4 md:mt-0 hover:text-indigo-800 transition-colors">
            View all events
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredEvents.map(event => <EventCard key={event.id} event={event} />)}
        </div>
        <div className="mt-12 text-center">
          <Link to="/events" className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300">
            Explore All Events
            <ChevronRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>;
};
export default FeaturedEvents;