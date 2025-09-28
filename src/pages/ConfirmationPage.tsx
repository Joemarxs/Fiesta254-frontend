import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CheckCircle, Calendar, Clock, MapPin, Download, Share2, Ticket } from 'lucide-react';
const ConfirmationPage = () => {
  const location = useLocation();
  const {
    event,
    ticketType,
    ticketCount,
    finalTotal,
    paymentMethod
  } = location.state || {};
  if (!event) {
    return <div className="text-center py-12">No booking information found</div>;
  }
  // Generate a random booking reference
  const bookingReference = `EVT-${Math.floor(100000 + Math.random() * 900000)}`;
  return <div className="bg-gray-50 min-h-screen py-8">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          <div className="bg-white rounded-lg shadow-sm p-8 text-center mb-8">
            <CheckCircle size={64} className="mx-auto mb-4 text-green-500" />
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              Payment Successful!
            </h1>
            <p className="text-gray-600 mb-6">
              Your tickets have been booked successfully.
            </p>
            <div className="bg-gray-50 rounded-lg p-4 mb-6">
              <p className="text-sm text-gray-500 mb-2">Booking Reference</p>
              <p className="text-xl font-mono font-semibold">
                {bookingReference}
              </p>
            </div>
            <div className="flex justify-center space-x-4 mb-6">
              <button className="flex items-center rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition duration-300">
                <Download size={18} className="mr-2" />
                Download Tickets
              </button>
              <button className="flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-gray-700 hover:bg-gray-50 transition duration-300">
                <Share2 size={18} className="mr-2" />
                Share
              </button>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Event Details
            </h2>
            <div className="flex items-center mb-6 pb-6 border-b border-gray-200">
              <img src={event.image} alt={event.title} className="w-20 h-20 object-cover rounded-lg mr-4" />
              <div>
                <h3 className="font-medium text-gray-800">{event.title}</h3>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <Calendar size={14} className="mr-1" />
                  <span>
                    {new Date(event.date).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric'
                  })}
                  </span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <Clock size={14} className="mr-1" />
                  <span>{event.time}</span>
                </div>
                <div className="flex items-center text-gray-600 text-sm mt-1">
                  <MapPin size={14} className="mr-1" />
                  <span>{event.location}</span>
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-600">Ticket Type</span>
                <span className="text-gray-800">
                  {ticketType?.name || 'Standard'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Quantity</span>
                <span className="text-gray-800">{ticketCount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="text-gray-800">
                  {paymentMethod === 'card' ? 'Credit/Debit Card' : 'M-Pesa'}
                </span>
              </div>
              <div className="flex justify-between font-semibold pt-2 border-t border-gray-200">
                <span className="text-gray-800">Total Paid</span>
                <span className="text-indigo-600">
                  ${finalTotal.toFixed(2)}
                </span>
              </div>
            </div>
            <div className="bg-indigo-50 p-4 rounded-lg mb-6">
              <div className="flex items-start">
                <Ticket size={20} className="text-indigo-600 mr-3 mt-1" />
                <div>
                  <h4 className="font-medium text-gray-800 mb-1">
                    Ticket Collection
                  </h4>
                  <p className="text-sm text-gray-600">
                    Please show your booking reference or QR code at the event
                    entrance. You can access your tickets anytime from your
                    account dashboard.
                  </p>
                </div>
              </div>
            </div>
            <div className="text-center">
              <Link to="/" className="inline-block rounded-lg bg-indigo-600 px-6 py-3 font-medium text-white hover:bg-indigo-700 transition duration-300">
                Browse More Events
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default ConfirmationPage;