import React from 'react';
import { Bell, Calendar, User, MessageCircle, Clock, CheckCircle, AlertTriangle } from 'lucide-react';
const NotificationsPage = () => {
  // Mock notifications data
  const notifications = [{
    id: '1',
    type: 'reminder',
    title: 'Event Reminder',
    message: 'Your event "Summer Music Festival" starts tomorrow at 12:00 PM',
    date: '2023-07-14',
    time: '09:00 AM',
    read: false
  }, {
    id: '2',
    type: 'booking',
    title: 'New Booking',
    message: 'Sarah Williams has booked 1 ticket for your "Tech Conference 2023"',
    date: '2023-07-13',
    time: '02:34 PM',
    read: false
  }, {
    id: '3',
    type: 'review',
    title: 'New Review',
    message: 'Michael Johnson left a 5-star review on your "Summer Music Festival"',
    date: '2023-07-12',
    time: '11:20 AM',
    read: true
  }, {
    id: '4',
    type: 'payment',
    title: 'Payment Received',
    message: 'You received a payment of $149.99 for "Cooking Masterclass"',
    date: '2023-07-10',
    time: '03:45 PM',
    read: true
  }, {
    id: '5',
    type: 'system',
    title: 'Account Security',
    message: "Your password was changed successfully. If this wasn't you, please contact support.",
    date: '2023-07-08',
    time: '09:12 AM',
    read: true
  }];
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'reminder':
        return <Calendar size={20} className="text-indigo-500" />;
      case 'booking':
        return <User size={20} className="text-green-500" />;
      case 'review':
        return <MessageCircle size={20} className="text-yellow-500" />;
      case 'payment':
        return <CheckCircle size={20} className="text-blue-500" />;
      case 'system':
        return <AlertTriangle size={20} className="text-red-500" />;
      default:
        return <Bell size={20} className="text-gray-500" />;
    }
  };
  return <div className="bg-gray-50 min-h-screen">
      <div className="bg-indigo-900 text-white py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl font-bold mb-2">Notifications</h1>
          <p className="text-indigo-200">
            Stay updated with your event bookings, reminders, and account
            activity
          </p>
        </div>
      </div>
      <div className="container mx-auto px-4 py-12">
        <div className="bg-white rounded-lg shadow-sm overflow-hidden">
          <div className="flex items-center justify-between bg-gray-50 px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-800">
              Recent Notifications
            </h2>
            <div className="flex space-x-2">
              <button className="text-sm text-indigo-600 hover:text-indigo-800 font-medium">
                Mark all as read
              </button>
              <span className="text-gray-300">|</span>
              <button className="text-sm text-gray-600 hover:text-gray-800 font-medium">
                Settings
              </button>
            </div>
          </div>
          <div className="divide-y divide-gray-200">
            {notifications.map(notification => <div key={notification.id} className={`px-6 py-4 hover:bg-gray-50 transition-colors ${!notification.read ? 'bg-indigo-50' : ''}`}>
                <div className="flex items-start">
                  <div className="mr-4 mt-1">
                    {getNotificationIcon(notification.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className={`font-medium ${!notification.read ? 'text-indigo-700' : 'text-gray-800'}`}>
                        {notification.title}
                      </h3>
                      <div className="flex items-center text-sm text-gray-500">
                        <Clock size={14} className="mr-1" />
                        <span>{notification.time}</span>
                      </div>
                    </div>
                    <p className="text-gray-600">{notification.message}</p>
                    <div className="mt-2 flex justify-between items-center">
                      <span className="text-sm text-gray-500">
                        {notification.date}
                      </span>
                      {!notification.read && <span className="inline-block w-2 h-2 bg-indigo-600 rounded-full"></span>}
                    </div>
                  </div>
                </div>
              </div>)}
          </div>
          {notifications.length === 0 && <div className="py-12 text-center">
              <Bell size={48} className="mx-auto text-gray-300 mb-4" />
              <h3 className="text-lg font-medium text-gray-700 mb-2">
                No notifications yet
              </h3>
              <p className="text-gray-500">
                When you get notifications, they'll show up here
              </p>
            </div>}
          <div className="bg-gray-50 px-6 py-4 text-center">
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">
              View All Notifications
            </button>
          </div>
        </div>
      </div>
    </div>;
};
export default NotificationsPage;