import React, { useEffect, useState, useMemo, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import EventCard from '../components/EventCard';
import { Search, Calendar, MapPin, Filter, ChevronDown } from 'lucide-react';
import { fetchEvents } from '../store/slices/events/eventsSlice';

// Small reusable loader dots component
const LoadingDots: React.FC = () => {
  return (
    <div className="flex space-x-1">
      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce"></span>
      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
      <span className="w-2 h-2 bg-indigo-600 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
    </div>
  );
};

const EventsPage = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { events, isLoading, error, hasFetched, nextPage } = useAppSelector(
    state => state.events
  );

  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [date, setDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');

  const loaderRef = useRef<HTMLDivElement | null>(null);

  // Parse category query parameter
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    setCategoryFilter(category || '');
  }, [location.search]);

  // Initial fetch → always start with page 1
  useEffect(() => {
    if (!hasFetched) {
      dispatch(fetchEvents(1)); // ✅ explicitly page 1
    }
  }, [dispatch, hasFetched]);

  // IntersectionObserver for infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        const target = entries[0];
        if (target.isIntersecting && !isLoading && nextPage) {
          dispatch(fetchEvents(nextPage)); //  fetch the NEXT page
        }
      },
      { threshold: 1 }
    );

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }

    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, [dispatch, isLoading, nextPage]);

  // Filter events using useMemo for performance
  const filteredEvents = useMemo(() => {
    return events
      .filter(event => (categoryFilter ? event.category === categoryFilter : true))
      .filter(event =>
        searchQuery
          ? event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase())
          : true
      )
      .filter(event =>
        locationFilter ? event.location.toLowerCase().includes(locationFilter.toLowerCase()) : true
      )
      .filter(event => (date ? event.date >= date : true));
  }, [events, categoryFilter, searchQuery, locationFilter, date]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Filtering is already reactive via useMemo
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header & search */}
      <div className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {categoryFilter ? `${categoryFilter} Events` : 'Explore Events'}
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 max-w-4xl">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search events..."
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>
              {/* Location */}
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Location"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={locationFilter}
                  onChange={e => setLocationFilter(e.target.value)}
                />
              </div>
              {/* Date */}
              <div className="flex-1 relative">
                <Calendar className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input
                  type="date"
                  placeholder="Date"
                  className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  value={date}
                  onChange={e => setDate(e.target.value)}
                />
              </div>
              <button
                type="submit"
                className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 whitespace-nowrap"
              >
                Find Events
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Filters & event list */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-2">
              {categoryFilter ? `${categoryFilter} Events` : 'All Events'}
            </h2>
            <p className="text-gray-600">
              {filteredEvents.length} events found
              {categoryFilter && ` in ${categoryFilter}`}
            </p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown size={16} className={showFilters ? 'transform rotate-180' : ''} />
            </button>
          </div>
        </div>

        {showFilters && (
          <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            {/* Additional filter controls */}
          </div>
        )}

        {isLoading && events.length === 0 ? (
          <div className="text-center py-12 flex justify-center">
            <LoadingDots />
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : filteredEvents.length > 0 ? (
          <>
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              {filteredEvents.map(event => (
                <EventCard key={event.id} event={event} />
              ))}
            </div>
            {/* Loader trigger */}
            <div ref={loaderRef} className="h-12 flex justify-center items-center">
              {isLoading && <LoadingDots />}
              {!nextPage && !isLoading && (
                <span className="text-gray-400">No more events</span>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No events found matching your criteria. Try adjusting your filters.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
