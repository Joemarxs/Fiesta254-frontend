import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { mockEvents } from '../data/mockData';
import EventCard from '../components/EventCard';
import { Search, Calendar, MapPin, Filter, ChevronDown } from 'lucide-react';
const EventsPage = () => {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [date, setDate] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('');
  const [filteredEvents, setFilteredEvents] = useState(mockEvents);
  // Parse query parameters
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const category = queryParams.get('category');
    if (category) {
      setCategoryFilter(category);
    } else {
      setCategoryFilter('');
    }
  }, [location.search]);
  // Filter events based on category and other filters
  useEffect(() => {
    let events = [...mockEvents];
    if (categoryFilter) {
      events = events.filter(event => event.category === categoryFilter);
    }
    if (searchQuery) {
      events = events.filter(event => event.title.toLowerCase().includes(searchQuery.toLowerCase()) || event.description.toLowerCase().includes(searchQuery.toLowerCase()));
    }
    if (locationFilter) {
      events = events.filter(event => event.location.toLowerCase().includes(locationFilter.toLowerCase()));
    }
    if (date) {
      events = events.filter(event => event.date >= date);
    }
    setFilteredEvents(events);
  }, [categoryFilter, searchQuery, locationFilter, date]);
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // The filtering is already handled by the useEffect
  };
  return <div className="bg-gray-50 min-h-screen">
      <div className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-6">
            {categoryFilter ? `${categoryFilter} Events` : 'Explore Events'}
          </h1>
          <div className="bg-white rounded-lg shadow-lg p-2 md:p-4 max-w-4xl">
            <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-2">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Search events..." className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
              </div>
              <div className="flex-1 relative">
                <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                <input type="text" placeholder="Location" className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent" value={locationFilter} onChange={e => setLocationFilter(e.target.value)} />
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
        </div>
      </div>
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
            <button onClick={() => setShowFilters(!showFilters)} className="flex items-center space-x-2 bg-white px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50 transition-colors">
              <Filter size={18} />
              <span>Filters</span>
              <ChevronDown size={16} className={showFilters ? 'transform rotate-180' : ''} />
            </button>
          </div>
        </div>
        {showFilters && <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Event Type
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-2" value={categoryFilter} onChange={e => setCategoryFilter(e.target.value)}>
                  <option value="">All Types</option>
                  <option value="Music">Music</option>
                  <option value="Technology">Technology</option>
                  <option value="Food & Drink">Food & Drink</option>
                  <option value="Wellness">Wellness</option>
                  <option value="Business">Business</option>
                  <option value="Art">Art</option>
                  <option value="Sports">Sports</option>
                  <option value="Entertainment">Entertainment</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price Range
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-2">
                  <option value="">Any Price</option>
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                  <option value="0-50">$0 - $50</option>
                  <option value="50-100">$50 - $100</option>
                  <option value="100+">$100+</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Sort By
                </label>
                <select className="w-full border border-gray-300 rounded-lg p-2">
                  <option value="date">Date (Soonest)</option>
                  <option value="price-low">Price (Low to High)</option>
                  <option value="price-high">Price (High to Low)</option>
                  <option value="popularity">Popularity</option>
                </select>
              </div>
            </div>
          </div>}
        {filteredEvents.length > 0 ? <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filteredEvents.map(event => <EventCard key={event.id} event={event} />)}
          </div> : <div className="text-center py-12">
            <p className="text-lg text-gray-600">
              No events found matching your criteria. Try adjusting your
              filters.
            </p>
          </div>}
        {filteredEvents.length > 0 && <div className="mt-12 flex justify-center">
            <nav className="inline-flex rounded-md shadow">
              <button className="px-4 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Previous
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 bg-indigo-50 text-sm font-medium text-indigo-600">
                1
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                2
              </button>
              <button className="px-4 py-2 border-t border-b border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                3
              </button>
              <button className="px-4 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50">
                Next
              </button>
            </nav>
          </div>}
      </div>
    </div>;
};
export default EventsPage;