import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Heart } from 'lucide-react';
import useEventStore from '../../store/useEventStore';
// Mock liked events data
const mockLikedEvents = [{
  id: '1',
  title: 'Summer Music Festival',
  date: '2023-07-15',
  location: 'Central Park, New York',
  price: 149.99,
  image: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
}, {
  id: '3',
  title: 'Cooking Masterclass',
  date: '2023-08-05',
  location: 'Culinary Institute, Chicago',
  price: 89.99,
  image: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
}, {
  id: '5',
  title: 'Business Networking Mixer',
  date: '2023-08-18',
  location: 'Grand Hotel, Boston',
  price: 25.0,
  image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1198&q=80'
}, {
  id: '8',
  title: 'Comedy Night Special',
  date: '2023-08-25',
  location: 'Laugh Factory, Austin',
  price: 35.0,
  image: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80'
}, {
  id: '6',
  title: 'Art Exhibition Opening Night',
  date: '2023-09-08',
  location: 'Modern Art Gallery, Los Angeles',
  price: 15.0,
  image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
}];
const LikedEvents = () => {
  const {
    events,
    likedEvents,
    toggleLike
  } = useEventStore();
  // For demo purposes, we'll use our mock data instead of filtering from the store
  const likedEventsList = mockLikedEvents;
  const handleUnlike = (eventId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleLike(eventId);
  };
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">
        Your Liked Events
      </h2>
      {likedEventsList.length > 0 ? <div className="space-y-6">
          {likedEventsList.map(event => <div key={event.id} className="border-b border-gray-200 pb-6 last:border-b-0 last:pb-0">
              <div className="flex flex-col md:flex-row gap-4">
                <img src={event.image} alt={event.title} className="w-full md:w-48 h-32 object-cover rounded-lg" />
                <div className="flex-1">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-2">
                    <h3 className="text-lg font-medium text-gray-800">
                      {event.title}
                    </h3>
                    <button onClick={e => handleUnlike(event.id, e)} className="flex items-center space-x-1 text-red-600 mt-2 md:mt-0">
                      <Heart size={16} className="fill-red-500" />
                      <span className="text-sm font-medium">Liked</span>
                    </button>
                  </div>
                  <div className="flex items-center mb-2 text-gray-600">
                    <Calendar size={16} className="mr-2" />
                    <span className="text-sm">
                      {new Date(event.date).toLocaleDateString('en-US', {
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric'
                })}
                    </span>
                  </div>
                  <div className="flex items-center mb-3 text-gray-600">
                    <MapPin size={16} className="mr-2" />
                    <span className="text-sm">{event.location}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-indigo-600">
                      ${event.price.toFixed(2)}
                    </span>
                    <div className="flex space-x-3">
                      <Link to={`/events/${event.id}`} className="text-indigo-600 hover:text-indigo-800 text-sm font-medium">
                        View Details
                      </Link>
                      <Link to={`/booking/${event.id}`} className="bg-indigo-600 text-white px-3 py-1 rounded-lg text-sm font-medium hover:bg-indigo-700 transition duration-300">
                        Book Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>)}
        </div> : <div className="text-center py-12">
          <p className="text-gray-500 mb-4">You haven't liked any events yet</p>
          <Link to="/events" className="inline-flex bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Explore Events
          </Link>
        </div>}
    </div>;
};
export default LikedEvents;