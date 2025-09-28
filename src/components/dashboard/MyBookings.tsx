import React from 'react';
import { Calendar, MapPin, ChevronRight, CheckCircle, XCircle, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
const MyBookings = () => {
  // Mock bookings data for the user
  const myBookings = [{
    id: '1',
    eventId: '1',
    eventTitle: 'Summer Music Festival',
    eventImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: '2023-07-15',
    location: 'Central Park, New York',
    tickets: 2,
    ticketType: 'Standard',
    totalAmount: 299.98,
    status: 'completed',
    bookingDate: '2023-06-28'
  }, {
    id: '2',
    eventId: '3',
    eventTitle: 'Cooking Masterclass',
    eventImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: '2023-08-05',
    location: 'Culinary Institute, Chicago',
    tickets: 1,
    ticketType: 'VIP',
    totalAmount: 129.99,
    status: 'upcoming',
    bookingDate: '2023-07-15'
  }, {
    id: '3',
    eventId: '8',
    eventTitle: 'Comedy Night Special',
    eventImage: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
    date: '2023-08-25',
    location: 'Laugh Factory, Austin',
    tickets: 2,
    ticketType: 'Standard',
    totalAmount: 70.0,
    status: 'upcoming',
    bookingDate: '2023-07-20'
  }, {
    id: '4',
    eventId: '6',
    eventTitle: 'Art Exhibition Opening Night',
    eventImage: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    date: '2023-06-08',
    location: 'Modern Art Gallery, Los Angeles',
    tickets: 1,
    ticketType: 'Standard',
    totalAmount: 15.0,
    status: 'completed',
    bookingDate: '2023-06-01'
  }, {
    id: '5',
    eventId: '5',
    eventTitle: 'Business Networking Mixer',
    eventImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1198&q=80',
    date: '2023-07-18',
    location: 'Grand Hotel, Boston',
    tickets: 1,
    ticketType: 'Standard',
    totalAmount: 25.0,
    status: 'completed',
    bookingDate: '2023-07-10'
  }];
  // Filter bookings by status
  const upcomingBookings = myBookings.filter(booking => booking.status === 'upcoming');
  const pastBookings = myBookings.filter(booking => booking.status === 'completed');
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'upcoming':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            <Clock size={12} className="mr-1" />
            Upcoming
          </span>;
      case 'completed':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
            <CheckCircle size={12} className="mr-1" />
            Completed
          </span>;
      case 'cancelled':
        return <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-red-100 text-red-800">
            <XCircle size={12} className="mr-1" />
            Cancelled
          </span>;
      default:
        return null;
    }
  };
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">My Bookings</h2>
      {myBookings.length === 0 ? <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            You haven't booked any events yet
          </p>
          <Link to="/events" className="inline-flex bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Explore Events
          </Link>
        </div> : <div>
          {/* Upcoming Bookings */}
          <div className="mb-8">
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Upcoming Events
            </h3>
            {upcomingBookings.length === 0 ? <p className="text-gray-500 text-sm">No upcoming bookings</p> : <div className="space-y-4">
                {upcomingBookings.map(booking => <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4">
                        <img src={booking.eventImage} alt={booking.eventTitle} className="h-full w-full object-cover" />
                      </div>
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {booking.eventTitle}
                          </h4>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar size={16} className="mr-2" />
                          <span className="text-sm">
                            {formatDate(booking.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin size={16} className="mr-2" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                          <div>
                            <span className="text-gray-500">Tickets:</span>
                            <span className="ml-1 font-medium text-gray-800">
                              {booking.tickets}x {booking.ticketType}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Total:</span>
                            <span className="ml-1 font-medium text-gray-800">
                              ${booking.totalAmount.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Booked on:</span>
                            <span className="ml-1 font-medium text-gray-800">
                              {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end">
                          <Link to={`/events/${booking.eventId}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                            View Event
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
          {/* Past Bookings */}
          <div>
            <h3 className="text-lg font-medium text-gray-800 mb-4">
              Past Events
            </h3>
            {pastBookings.length === 0 ? <p className="text-gray-500 text-sm">No past bookings</p> : <div className="space-y-4">
                {pastBookings.map(booking => <div key={booking.id} className="border border-gray-200 rounded-lg overflow-hidden bg-gray-50">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-1/4">
                        <img src={booking.eventImage} alt={booking.eventTitle} className="h-full w-full object-cover opacity-90" />
                      </div>
                      <div className="p-4 md:p-6 flex-1">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="text-lg font-semibold text-gray-800">
                            {booking.eventTitle}
                          </h4>
                          {getStatusBadge(booking.status)}
                        </div>
                        <div className="flex items-center text-gray-600 mb-2">
                          <Calendar size={16} className="mr-2" />
                          <span className="text-sm">
                            {formatDate(booking.date)}
                          </span>
                        </div>
                        <div className="flex items-center text-gray-600 mb-4">
                          <MapPin size={16} className="mr-2" />
                          <span className="text-sm">{booking.location}</span>
                        </div>
                        <div className="flex flex-wrap gap-y-2 gap-x-4 text-sm">
                          <div>
                            <span className="text-gray-500">Tickets:</span>
                            <span className="ml-1 font-medium text-gray-800">
                              {booking.tickets}x {booking.ticketType}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Total:</span>
                            <span className="ml-1 font-medium text-gray-800">
                              ${booking.totalAmount.toFixed(2)}
                            </span>
                          </div>
                          <div>
                            <span className="text-gray-500">Booked on:</span>
                            <span className="ml-1 font-medium text-gray-800">
                              {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric'
                      })}
                            </span>
                          </div>
                        </div>
                        <div className="mt-4 flex justify-end space-x-4">
                          <Link to={`/review/${booking.eventId}`} className="inline-flex items-center text-indigo-600 hover:text-indigo-800 font-medium">
                            Leave Review
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                          <Link to={`/events/${booking.eventId}`} className="inline-flex items-center text-gray-600 hover:text-gray-800 font-medium">
                            View Event
                            <ChevronRight size={16} className="ml-1" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>)}
              </div>}
          </div>
        </div>}
    </div>;
};
export default MyBookings;