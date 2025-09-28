import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Edit, Trash2, Eye, Ticket } from 'lucide-react';
import { mockEvents } from '../../data/mockData';
// Mock ticket data based on the provided JSON structure
const mockTicketData = {
  'b0f02e6c-4476-4efd-ba21-6c90532d775b': {
    event_id: 'b0f02e6c-4476-4efd-ba21-6c90532d775b',
    event_title: 'Color Fest',
    total_paid_tickets: 3,
    total_revenue: 300.0,
    tickets_by_type: {
      'Early Bird': {
        ticket_type_id: '24d94ac9-2f2f-4957-9bb1-1dc653902dd9',
        quantity_sold: 3,
        price: 100.0,
        revenue: 300.0
      }
    }
  },
  '1': {
    event_id: '1',
    event_title: 'Summer Music Festival',
    total_paid_tickets: 325,
    total_revenue: 48745.0,
    tickets_by_type: {
      Standard: {
        ticket_type_id: 'std-123',
        quantity_sold: 275,
        price: 149.99,
        revenue: 41247.25
      },
      VIP: {
        ticket_type_id: 'vip-456',
        quantity_sold: 50,
        price: 149.95,
        revenue: 7497.5
      }
    }
  },
  '2': {
    event_id: '2',
    event_title: 'Tech Conference 2023',
    total_paid_tickets: 178,
    total_revenue: 53398.22,
    tickets_by_type: {
      Regular: {
        ticket_type_id: 'reg-789',
        quantity_sold: 150,
        price: 299.99,
        revenue: 44998.5
      },
      'Early Bird': {
        ticket_type_id: 'eb-101',
        quantity_sold: 28,
        price: 299.99,
        revenue: 8399.72
      }
    }
  },
  '3': {
    event_id: '3',
    event_title: 'Cooking Masterclass',
    total_paid_tickets: 28,
    total_revenue: 2519.72,
    tickets_by_type: {
      Standard: {
        ticket_type_id: 'std-202',
        quantity_sold: 28,
        price: 89.99,
        revenue: 2519.72
      }
    }
  },
  '4': {
    event_id: '4',
    event_title: 'Yoga Retreat Weekend',
    total_paid_tickets: 42,
    total_revenue: 16799.58,
    tickets_by_type: {
      'Full Package': {
        ticket_type_id: 'fp-303',
        quantity_sold: 42,
        price: 399.99,
        revenue: 16799.58
      }
    }
  }
};
const HostEvents = () => {
  // Filter events to show only those hosted by the current user
  // In a real app, this would be based on the logged-in user's ID
  const hostEvents = mockEvents.slice(0, 4); // Just showing first 4 events as examples
  const [selectedEventTickets, setSelectedEventTickets] = useState(null);
  const [showTicketModal, setShowTicketModal] = useState(false);
  const handleShowTickets = eventId => {
    const ticketData = mockTicketData[eventId] || null;
    setSelectedEventTickets(ticketData);
    setShowTicketModal(true);
  };
  const closeTicketModal = () => {
    setShowTicketModal(false);
    setSelectedEventTickets(null);
  };
  return <div className="bg-white rounded-lg shadow-sm p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-800">My Events</h2>
        <Link to="/create-event" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
          Create New Event
        </Link>
      </div>
      {hostEvents.length > 0 ? <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Event
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Attendees
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {hostEvents.map(event => <tr key={event.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <img src={event.image} alt={event.title} className="h-10 w-10 rounded-md object-cover mr-3" />
                      <div>
                        <div className="font-medium text-gray-800">
                          {event.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(event.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric'
              })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {event.attendees} / {event.capacity}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      Published
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex justify-end space-x-2">
                      <Link to={`/events/${event.id}`} className="text-gray-500 hover:text-gray-700" title="View">
                        <Eye size={18} />
                      </Link>
                      <button onClick={() => handleShowTickets(event.id)} className="text-blue-500 hover:text-blue-700" title="Tickets">
                        <Ticket size={18} />
                      </button>
                      <Link to={`/edit-event/${event.id}`} className="text-indigo-500 hover:text-indigo-700" title="Edit">
                        <Edit size={18} />
                      </Link>
                      <button className="text-red-500 hover:text-red-700" title="Delete">
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div> : <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            You haven't created any events yet
          </p>
          <Link to="/create-event" className="bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition duration-300">
            Create Your First Event
          </Link>
        </div>}
      {/* Ticket Modal */}
      {showTicketModal && selectedEventTickets && <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-gray-800">
                  Ticket Sales: {selectedEventTickets.event_title}
                </h3>
                <button onClick={closeTicketModal} className="text-gray-500 hover:text-gray-700">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-indigo-50 p-4 rounded-lg">
                    <p className="text-sm text-indigo-600 font-medium">
                      Total Tickets Sold
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      {selectedEventTickets.total_paid_tickets}
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <p className="text-sm text-green-600 font-medium">
                      Total Revenue
                    </p>
                    <p className="text-2xl font-bold text-gray-800">
                      ${selectedEventTickets.total_revenue.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <h4 className="font-medium text-gray-700 mb-3">
                Tickets by Type
              </h4>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Ticket Type
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Price
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Quantity
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        Revenue
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {Object.entries(selectedEventTickets.tickets_by_type).map(([typeName, typeData]) => <tr key={typeData.ticket_type_id}>
                          <td className="px-4 py-3 whitespace-nowrap text-sm font-medium text-gray-800">
                            {typeName}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            ${typeData.price.toFixed(2)}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            {typeData.quantity_sold}
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-600">
                            ${typeData.revenue.toFixed(2)}
                          </td>
                        </tr>)}
                  </tbody>
                </table>
              </div>
              <div className="mt-6 flex justify-end">
                <button onClick={closeTicketModal} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition duration-200">
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default HostEvents;