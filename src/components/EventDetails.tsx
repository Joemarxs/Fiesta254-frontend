import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Clock, MapPin, Users, Heart, Share2, Star, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleLike } from '../store/slices/likesSlice';
import ReviewSection from './ReviewSection';
interface EventDetailsProps {
  eventId: string;
}
interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  available: number;
}
const EventDetails = ({
  eventId
}: EventDetailsProps) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const event = useAppSelector(state => state.events.events.find(event => event.id === eventId));
  const likedEvents = useAppSelector(state => state.likes.likedEvents);
  const isAuthenticated = useAppSelector(state => state.users.isAuthenticated);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showTicketTypes, setShowTicketTypes] = useState(true);
  const [selectedTicketType, setSelectedTicketType] = useState<string | null>(null);
  const [ticketCount, setTicketCount] = useState(1);
  // Mock ticket types - in a real app, this would come from the API
  const ticketTypes: TicketType[] = [{
    id: 'standard',
    name: 'Standard',
    price: event?.price || 0,
    description: 'Regular admission ticket',
    available: event ? event.capacity - event.attendees : 0
  }, {
    id: 'vip',
    name: 'VIP',
    price: event ? event.price * 2 : 0,
    description: 'Premium seating and complimentary drinks',
    available: 25
  }, {
    id: 'early-bird',
    name: 'Early Bird',
    price: event ? event.price * 0.8 : 0,
    description: 'Limited availability discount tickets',
    available: 10
  }];
  if (!event) {
    return <div className="text-center py-12">Event not found</div>;
  }
  const isLiked = likedEvents.includes(event.id);
  const handleLikeClick = () => {
    dispatch(toggleLike(event.id));
  };
  const handleShareClick = () => {
    setShowShareOptions(!showShareOptions);
  };
  const handleContactHost = () => {
    if (!isAuthenticated) {
      navigate(`/login?redirect=/chat/${event.host.id}`);
    } else {
      navigate(`/chat/${event.host.id}`);
    }
  };
  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  const selectTicketType = (ticketTypeId: string) => {
    if (selectedTicketType === ticketTypeId) {
      setSelectedTicketType(null);
      setTicketCount(1);
    } else {
      setSelectedTicketType(ticketTypeId);
      setTicketCount(1);
    }
  };
  const incrementTicket = () => {
    if (!selectedTicketType) return;
    const selectedTicket = ticketTypes.find(ticket => ticket.id === selectedTicketType);
    if (selectedTicket && ticketCount < selectedTicket.available) {
      setTicketCount(ticketCount + 1);
    }
  };
  const decrementTicket = () => {
    if (ticketCount > 1) {
      setTicketCount(ticketCount - 1);
    }
  };
  const handleProceedToBooking = () => {
    if (!selectedTicketType) return;
    const selectedTicket = ticketTypes.find(ticket => ticket.id === selectedTicketType);
    if (selectedTicket) {
      navigate(`/booking/${event.id}`, {
        state: {
          event,
          ticketType: selectedTicket,
          ticketCount,
          totalPrice: selectedTicket.price * ticketCount
        }
      });
    }
  };
  // Calculate the actual total price for the selected ticket
  const calculateTotalPrice = () => {
    if (!selectedTicketType) return 0;
    const selectedTicket = ticketTypes.find(ticket => ticket.id === selectedTicketType);
    return selectedTicket ? selectedTicket.price * ticketCount : 0;
  };
  return <div className="bg-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Event Details */}
          <div className="md:col-span-2">
            {/* Event Header */}
            <div className="flex items-center justify-between mb-4">
              <span className="inline-block rounded-full bg-indigo-100 px-3 py-1 text-sm font-medium text-indigo-800">
                {event.category}
              </span>
              <div className="flex space-x-2">
                <button onClick={handleLikeClick} className={`flex items-center space-x-1 rounded-full px-3 py-1 ${isLiked ? 'bg-red-100 text-red-600' : 'bg-gray-100 text-gray-600'}`}>
                  <Heart size={16} className={isLiked ? 'fill-red-500' : ''} />
                  <span>{event.likes + (isLiked ? 1 : 0)}</span>
                </button>
                <div className="relative">
                  <button onClick={handleShareClick} className="flex items-center space-x-1 rounded-full bg-gray-100 px-3 py-1 text-gray-600">
                    <Share2 size={16} />
                    <span>Share</span>
                  </button>
                  {showShareOptions && <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg z-10">
                      <div className="py-1">
                        <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Copy link
                        </button>
                        <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          WhatsApp
                        </button>
                        <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Twitter/X
                        </button>
                        <button className="flex w-full items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                          Facebook
                        </button>
                      </div>
                    </div>}
                </div>
              </div>
            </div>
            <h1 className="mb-4 text-3xl font-bold text-gray-800">
              {event.title}
            </h1>
            {/* Event Image - Now in a better container */}
            <div className="mb-6 rounded-lg overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-auto object-cover rounded-lg" style={{
              maxHeight: '500px'
            }} />
            </div>
            <div className="mb-6 flex flex-wrap gap-y-4">
              <div className="mr-6 flex items-center text-gray-600">
                <Calendar size={18} className="mr-2" />
                <span>{formatDate(event.date)}</span>
              </div>
              <div className="mr-6 flex items-center text-gray-600">
                <Clock size={18} className="mr-2" />
                <span>
                  {event.time} - {event.endTime}
                </span>
              </div>
              <div className="mr-6 flex items-center text-gray-600">
                <MapPin size={18} className="mr-2" />
                <span>{event.location}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users size={18} className="mr-2" />
                <span>{event.attendees} attending</span>
              </div>
            </div>
            <div className="mb-8">
              <h2 className="mb-3 text-xl font-semibold text-gray-800">
                About This Event
              </h2>
              <p className="text-gray-600">{event.description}</p>
            </div>
            <ReviewSection eventId={eventId} />
          </div>
          {/* Booking Card & Host Info */}
          <div className="space-y-6">
            {/* Ticket Selection Card */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <div className="mb-4 flex items-baseline justify-between">
                <h3 className="text-xl font-semibold text-gray-800">Tickets</h3>
                <div className="flex items-center">
                  <Star className="mr-1 h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600">
                    {event.rating} (32 reviews)
                  </span>
                </div>
              </div>
              <div className="mb-4">
                <button onClick={() => setShowTicketTypes(!showTicketTypes)} className="flex w-full items-center justify-between text-left text-gray-700 font-medium">
                  <span>Available Ticket Types</span>
                  {showTicketTypes ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
                </button>
              </div>
              {showTicketTypes && <div className="space-y-3 mb-4">
                  {ticketTypes.map(ticket => <div key={ticket.id} className={`border rounded-lg p-3 cursor-pointer transition-all ${selectedTicketType === ticket.id ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => selectTicketType(ticket.id)}>
                      <div className="flex justify-between items-center mb-1">
                        <h4 className="font-medium">{ticket.name}</h4>
                        <span className="font-semibold text-indigo-600">
                          ${ticket.price.toFixed(2)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-500 mb-1">
                        {ticket.description}
                      </p>
                      <p className="text-xs text-gray-400">
                        {ticket.available} available
                      </p>
                      {selectedTicketType === ticket.id && <div className="mt-3 pt-3 border-t border-gray-200">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium">
                              Quantity:
                            </span>
                            <div className="flex items-center">
                              <button onClick={e => {
                        e.stopPropagation();
                        decrementTicket();
                      }} disabled={ticketCount <= 1} className={`p-1 rounded-full ${ticketCount <= 1 ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <Minus size={16} />
                              </button>
                              <span className="mx-3 w-8 text-center">
                                {ticketCount}
                              </span>
                              <button onClick={e => {
                        e.stopPropagation();
                        incrementTicket();
                      }} disabled={ticketCount >= ticket.available} className={`p-1 rounded-full ${ticketCount >= ticket.available ? 'text-gray-300' : 'text-gray-600 hover:bg-gray-100'}`}>
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        </div>}
                    </div>)}
                </div>}
              <div className="mt-6">
                <button onClick={handleProceedToBooking} disabled={!selectedTicketType} className={`w-full rounded-lg px-4 py-3 text-center font-medium text-white transition duration-300 ${selectedTicketType ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-gray-300 cursor-not-allowed'}`}>
                  {selectedTicketType ? `Book Now - $${calculateTotalPrice().toFixed(2)}` : 'Select a Ticket Type'}
                </button>
              </div>
            </div>
            {/* Host Profile */}
            <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-gray-800">
                Event Host
              </h3>
              <div className="flex items-center">
                <img src={event.host.image} alt={event.host.name} className="h-12 w-12 rounded-full object-cover mr-4" />
                <div>
                  <h4 className="font-medium text-gray-800">
                    {event.host.name}
                  </h4>
                  <div className="flex items-center text-sm text-gray-600">
                    <Star className="mr-1 h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>
                      {event.host.rating} · {event.host.eventsHosted} events
                    </span>
                  </div>
                </div>
              </div>
              <p className="mt-4 text-sm text-gray-600">{event.host.bio}</p>
              <button onClick={handleContactHost} className="mt-4 w-full rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition duration-300">
                Contact Host
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default EventDetails;