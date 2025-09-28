import React, { useEffect } from 'react';
import { Link, useParams, useNavigate, useLocation } from 'react-router-dom';
import { Calendar, Clock, MapPin, ArrowLeft } from 'lucide-react';
import { useAppSelector } from '../store/hooks';
const BookingPage = () => {
  const {
    id
  } = useParams<{
    id: string;
  }>();
  const navigate = useNavigate();
  const location = useLocation();
  const events = useAppSelector(state => state.events.events);
  const {
    isAuthenticated,
    currentUser
  } = useAppSelector(state => state.users);
  // Get event data either from location state (if coming from event details) or fetch by ID
  const passedData = location.state || {};
  const event = passedData.event || events.find(event => event.id === id);
  // Initialize ticket information from passed data or with defaults
  const ticketType = passedData.ticketType || {
    id: 'standard',
    name: 'Standard',
    price: event?.price || 0,
    description: 'Regular admission ticket'
  };
  const ticketCount = passedData.ticketCount || 1;
  useEffect(() => {
    // Redirect to login if not authenticated
    if (!isAuthenticated) {
      navigate(`/login?redirect=/booking/${id}`);
    }
  }, [isAuthenticated, navigate, id]);
  if (!event) {
    return <div className="text-center py-12">Event not found</div>;
  }
  const totalPrice = ticketType.price * ticketCount;
  const serviceFee = totalPrice * 0.1; // 10% service fee
  const finalTotal = totalPrice + serviceFee;
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send the booking data to the backend
    // For now, we'll just navigate to the checkout page
    navigate('/checkout', {
      state: {
        event,
        ticketType,
        ticketCount,
        totalPrice,
        serviceFee,
        finalTotal,
        customerInfo: {
          name: currentUser?.name || '',
          email: currentUser?.email || ''
        }
      }
    });
  };
  // If not authenticated, show a message and login button
  if (!isAuthenticated) {
    return <div className="bg-gray-50 min-h-screen py-12">
        <div className="container mx-auto px-4 max-w-md">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
              Sign In Required
            </h1>
            <p className="text-gray-600 mb-6">
              You need to be logged in to book tickets for this event.
            </p>
            <Link to={`/login?redirect=/booking/${id}`} className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition duration-300 mb-4">
              Sign In
            </Link>
            <p className="text-gray-500 text-sm">
              Don't have an account?{' '}
              <Link to="/signup" className="text-indigo-600 hover:text-indigo-800">
                Sign Up
              </Link>
            </p>
          </div>
        </div>
      </div>;
  }
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <Link to={`/events/${id}`} className="flex items-center text-indigo-600 mb-6">
          <ArrowLeft size={18} className="mr-2" />
          Back to event details
        </Link>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Booking Form */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">
                Complete Your Booking
              </h1>
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <div className="bg-indigo-50 p-4 rounded-lg mb-4">
                    <h3 className="font-medium text-gray-800 mb-2">
                      Ticket Details
                    </h3>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium text-gray-800">
                          {ticketType.name}
                        </p>
                        <p className="text-sm text-gray-600">
                          {ticketType.description}
                        </p>
                        <p className="text-sm text-gray-600 mt-1">
                          Quantity: {ticketCount}
                        </p>
                      </div>
                      <p className="font-semibold text-indigo-600">
                        ${ticketType.price.toFixed(2)} each
                      </p>
                    </div>
                  </div>
                  <div className="mb-6 bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-medium text-gray-700 mb-3">
                      Booking as:
                    </h3>
                    <div className="flex items-center">
                      <img src={currentUser?.profileImage} alt={currentUser?.name} className="h-10 w-10 rounded-full object-cover mr-3" />
                      <div>
                        <p className="font-medium text-gray-800">
                          {currentUser?.name}
                        </p>
                        <p className="text-gray-500 text-sm">
                          {currentUser?.email}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <button type="submit" className="w-full bg-indigo-600 text-white rounded-lg px-4 py-3 font-medium hover:bg-indigo-700 transition duration-300">
                  Proceed to Payment
                </button>
              </form>
            </div>
          </div>
          {/* Order Summary */}
          <div>
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">
                Order Summary
              </h2>
              <div className="mb-4 pb-4 border-b border-gray-200">
                <h3 className="font-medium text-gray-800 mb-2">
                  {event.title}
                </h3>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Calendar size={16} className="mr-2" />
                  <span>
                    {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mb-2">
                  <Clock size={16} className="mr-2" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm">
                  <MapPin size={16} className="mr-2" />
                  <span>{event.location}</span>
                </div>
              </div>
              <div className="space-y-3 mb-4 pb-4 border-b border-gray-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">
                    {ticketType.name} ({ticketCount})
                  </span>
                  <span className="text-gray-800">
                    ${(ticketType.price * ticketCount).toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Service Fee</span>
                  <span className="text-gray-800">
                    ${serviceFee.toFixed(2)}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center font-semibold">
                <span className="text-gray-800">Total</span>
                <span className="text-xl text-indigo-600">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default BookingPage;