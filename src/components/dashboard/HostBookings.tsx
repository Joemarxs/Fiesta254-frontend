import React from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';
const HostBookings = () => {
  // Mock bookings data
  const bookings = [{
    id: '1',
    eventId: '1',
    eventTitle: 'Summer Music Festival',
    attendeeName: 'Michael Johnson',
    attendeeEmail: 'michael@example.com',
    tickets: 2,
    totalAmount: 299.98,
    paymentStatus: 'paid',
    bookingDate: '2023-06-28'
  }, {
    id: '2',
    eventId: '1',
    eventTitle: 'Summer Music Festival',
    attendeeName: 'Sarah Williams',
    attendeeEmail: 'sarah@example.com',
    tickets: 1,
    totalAmount: 149.99,
    paymentStatus: 'paid',
    bookingDate: '2023-06-29'
  }, {
    id: '3',
    eventId: '2',
    eventTitle: 'Tech Conference 2023',
    attendeeName: 'David Brown',
    attendeeEmail: 'david@example.com',
    tickets: 3,
    totalAmount: 899.97,
    paymentStatus: 'pending',
    bookingDate: '2023-07-02'
  }, {
    id: '4',
    eventId: '3',
    eventTitle: 'Cooking Masterclass',
    attendeeName: 'Emily Davis',
    attendeeEmail: 'emily@example.com',
    tickets: 2,
    totalAmount: 179.98,
    paymentStatus: 'failed',
    bookingDate: '2023-07-01'
  }];
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid':
        return <CheckCircle size={16} className="text-green-500" />;
      case 'pending':
        return <AlertCircle size={16} className="text-yellow-500" />;
      case 'failed':
        return <XCircle size={16} className="text-red-500" />;
      default:
        return null;
    }
  };
  const getStatusClass = (status: string) => {
    switch (status) {
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'failed':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Bookings</h2>
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Attendee
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Event
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Tickets
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Booking Date
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {bookings.map(booking => <tr key={booking.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="font-medium text-gray-800">
                    {booking.attendeeName}
                  </div>
                  <div className="text-sm text-gray-500">
                    {booking.attendeeEmail}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.eventTitle}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {booking.tickets}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${booking.totalAmount.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full items-center ${getStatusClass(booking.paymentStatus)}`}>
                    {getStatusIcon(booking.paymentStatus)}
                    <span className="ml-1 capitalize">
                      {booking.paymentStatus}
                    </span>
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(booking.bookingDate).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
                </td>
              </tr>)}
          </tbody>
        </table>
      </div>
    </div>;
};
export default HostBookings;