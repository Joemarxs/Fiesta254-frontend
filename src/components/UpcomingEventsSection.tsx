import React, { useState } from 'react';
import { mockEvents } from '../data/mockData';
import { Calendar as CalendarIcon, ChevronLeft, ChevronRight, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
const UpcomingEventsSection = () => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const nextMonth = () => {
    const next = new Date(currentMonth);
    next.setMonth(next.getMonth() + 1);
    setCurrentMonth(next);
  };
  const prevMonth = () => {
    const prev = new Date(currentMonth);
    prev.setMonth(prev.getMonth() - 1);
    setCurrentMonth(prev);
  };
  // Get events for the current month
  const monthEvents = mockEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getMonth() === currentMonth.getMonth() && eventDate.getFullYear() === currentMonth.getFullYear();
  }).slice(0, 4); // Limit to 4 events
  const monthName = currentMonth.toLocaleDateString('en-US', {
    month: 'long',
    year: 'numeric'
  });
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-10">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Upcoming Events
            </h2>
            <p className="text-gray-600">
              Plan ahead and book your next experience
            </p>
          </div>
          <div className="flex items-center mt-4 md:mt-0">
            <button onClick={prevMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Previous month">
              <ChevronLeft size={20} />
            </button>
            <div className="mx-4 flex items-center">
              <CalendarIcon size={18} className="mr-2 text-indigo-600" />
              <span className="font-medium">{monthName}</span>
            </div>
            <button onClick={nextMonth} className="p-2 rounded-full hover:bg-gray-100" aria-label="Next month">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        {monthEvents.length > 0 ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {monthEvents.map(event => <Link to={`/events/${event.id}`} key={event.id} className="bg-gray-50 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow group">
                <div className="p-4 border-l-4 border-indigo-600">
                  <div className="text-sm text-gray-500 mb-1">
                    {new Date(event.date).toLocaleDateString('en-US', {
                weekday: 'short',
                month: 'short',
                day: 'numeric'
              })}
                  </div>
                  <h3 className="font-semibold text-gray-800 mb-2 group-hover:text-indigo-600 transition-colors">
                    {event.title}
                  </h3>
                  <div className="flex items-center text-sm text-gray-600">
                    <MapPin size={14} className="mr-1" />
                    <span className="truncate">{event.location}</span>
                  </div>
                </div>
              </Link>)}
          </div> : <div className="text-center py-10 bg-gray-50 rounded-lg">
            <CalendarIcon size={48} className="mx-auto text-gray-400 mb-4" />
            <h3 className="text-xl font-medium text-gray-700 mb-2">
              No events this month
            </h3>
            <p className="text-gray-500 mb-6">
              Check out other months or browse all events
            </p>
            <Link to="/events" className="inline-flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
              Browse all events
            </Link>
          </div>}
      </div>
    </section>;
};
export default UpcomingEventsSection;