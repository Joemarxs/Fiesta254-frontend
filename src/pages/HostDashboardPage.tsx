import React, { useState } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { Calendar, Users, MessageSquare, DollarSign, PlusCircle, Home as HomeIcon } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import HostEvents from '../components/dashboard/HostEvents';
import HostBookings from '../components/dashboard/HostBookings';
import HostReviews from '../components/dashboard/HostReviews';
import HostPayments from '../components/dashboard/HostPayments';
const HostDashboardPage = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('events');
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };
  return <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <aside className="w-full md:w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6">
              <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80" alt="Host Profile" className="h-12 w-12 rounded-full object-cover mr-3" />
              <div>
                <h3 className="font-medium text-gray-800">John Smith</h3>
                <p className="text-sm text-gray-500">Event Host</p>
              </div>
            </div>
            <nav className="space-y-1">
              <button onClick={() => handleTabClick('events')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'events' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Calendar size={18} className="mr-3" />
                My Events
              </button>
              <button onClick={() => handleTabClick('bookings')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'bookings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <Users size={18} className="mr-3" />
                Bookings
              </button>
              <button onClick={() => handleTabClick('reviews')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'reviews' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <MessageSquare size={18} className="mr-3" />
                Reviews
              </button>
              <button onClick={() => handleTabClick('payments')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'payments' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                <DollarSign size={18} className="mr-3" />
                Payments
              </button>
            </nav>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <Link to="/create-event" className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                <PlusCircle size={18} className="mr-2" />
                Create New Event
              </Link>
              <Link to="/" className="flex items-center justify-center w-full mt-2 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300">
                <HomeIcon size={18} className="mr-2" />
                Back to Home
              </Link>
            </div>
          </aside>
          {/* Main Content */}
          <main className="flex-1">
            {activeTab === 'events' && <HostEvents />}
            {activeTab === 'bookings' && <HostBookings />}
            {activeTab === 'reviews' && <HostReviews />}
            {activeTab === 'payments' && <HostPayments />}
          </main>
        </div>
      </div>
    </div>;
};
export default HostDashboardPage;