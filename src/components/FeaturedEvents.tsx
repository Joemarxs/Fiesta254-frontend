import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import EventCard from './EventCard';
import { ChevronRight } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFeaturedEvents, Event } from '../store/slices/events/eventsSlice';
import { RootState, AppDispatch } from '../store';

const FeaturedEvents = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { featuredEvents, isLoading, error } = useSelector(
    (state: RootState) => state.events
  );

  useEffect(() => {
    if (!featuredEvents || featuredEvents.length === 0) {
      dispatch(fetchFeaturedEvents());
    }
  }, [dispatch, featuredEvents]);

  // Early returns for loading and error states
  if (isLoading) return <p className="text-center py-16">Loading events...</p>;
  if (error) return <p className="text-center py-16 text-red-600">{error}</p>;
  if (!featuredEvents || featuredEvents.length === 0)
    return (
      <div className="flex justify-center items-center py-16 space-x-2">
        <span className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"></span>
        <span
          className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
          style={{ animationDelay: '0.2s' }}
        ></span>
        <span
          className="w-3 h-3 bg-indigo-600 rounded-full animate-bounce"
          style={{ animationDelay: '0.4s' }}
        ></span>
      </div>
    );

  return (
    <section className="py-16 bg-gray-50">
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
          <Link
            to="/events"
            className="inline-flex items-center text-indigo-600 font-medium mt-4 md:mt-0 hover:text-indigo-800 transition-colors"
          >
            View all events
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-8">
          {featuredEvents.map((event: Event) => (
            <EventCard key={event.id} event={event} />
          ))}
        </div>
        <div className="mt-12 text-center">
          <Link
            to="/events"
            className="inline-flex items-center justify-center px-6 py-3 bg-indigo-600 text-white font-medium rounded-lg hover:bg-indigo-700 transition duration-300"
          >
            Explore All Events
            <ChevronRight size={16} className="ml-2" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedEvents;
