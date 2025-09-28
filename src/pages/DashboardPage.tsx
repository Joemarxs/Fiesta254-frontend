import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, Users, MessageSquare, DollarSign, PlusCircle, Home as HomeIcon, Heart, Clock, X, Menu, ChevronDown, ChevronRight, Ticket, User, Settings, Layers } from 'lucide-react';
import { mockEvents } from '../data/mockData';
import useUserStore from '../store/useUserStore';
import HostEvents from '../components/dashboard/HostEvents';
import HostBookings from '../components/dashboard/HostBookings';
import HostReviews from '../components/dashboard/HostReviews';
import HostPayments from '../components/dashboard/HostPayments';
import AttendedEvents from '../components/dashboard/AttendedEvents';
import LikedEvents from '../components/dashboard/LikedEvents';
import MyBookings from '../components/dashboard/MyBookings';
import ProfileSection from '../components/dashboard/ProfileSection';
const DashboardPage = () => {
  const navigate = useNavigate();
  const {
    currentUser,
    isAuthenticated
  } = useUserStore();
  const [activeTab, setActiveTab] = useState('events');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      if (window.innerWidth >= 768) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  if (!isAuthenticated) {
    // Redirect to login if not authenticated
    navigate('/login');
    return null;
  }
  const isHost = currentUser?.isHost || false;
  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    setMobileMenuOpen(false);
  };
  return <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Mobile Menu Header */}
        <div className="md:hidden flex items-center justify-between mb-4">
          <div className="flex items-center">
            <img src={currentUser?.profileImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'} alt="User Profile" className="h-10 w-10 rounded-full object-cover mr-3" />
            <div>
              <h2 className="font-semibold text-lg">
                {currentUser?.name || 'User'}
              </h2>
              <p className="text-sm text-gray-500">
                {isHost ? 'Event Host' : 'Attendee'}
              </p>
            </div>
          </div>
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="p-2 rounded-md bg-white shadow-sm">
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
        {/* Main Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar - Desktop */}
          <aside className="hidden md:block w-64 bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center mb-6 cursor-pointer" onClick={() => handleTabClick('profile')}>
              <img src={currentUser?.profileImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'} alt="User Profile" className="h-12 w-12 rounded-full object-cover mr-3 border-2 border-gray-100 hover:border-indigo-300 transition-colors" />
              <div>
                <h3 className="font-medium text-gray-800">
                  {currentUser?.name || 'User'}
                </h3>
                <p className="text-sm text-gray-500">
                  {isHost ? 'Event Host' : 'Attendee'}
                </p>
              </div>
            </div>
            <nav className="space-y-4">
              {/* My Events Section */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2 px-4">
                  My Events
                </h4>
                <div className="space-y-1">
                  <button onClick={() => handleTabClick('mybookings')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'mybookings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <Ticket size={18} className="mr-3" />
                    My Bookings
                  </button>
                  <button onClick={() => handleTabClick('attended')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'attended' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <Clock size={18} className="mr-3" />
                    Events Attended
                  </button>
                  <button onClick={() => handleTabClick('liked')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'liked' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <Heart size={18} className="mr-3" />
                    Liked Events
                  </button>
                </div>
              </div>
              {/* Host Dashboard Section (only shown for hosts) */}
              {isHost && <div>
                  <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2 px-4">
                    Host Dashboard
                  </h4>
                  <div className="space-y-1">
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
                  </div>
                </div>}
              {/* Account Section */}
              <div>
                <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2 px-4">
                  Account
                </h4>
                <div className="space-y-1">
                  <button onClick={() => handleTabClick('profile')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <User size={18} className="mr-3" />
                    My Profile
                  </button>
                  <button onClick={() => handleTabClick('settings')} className={`flex items-center w-full px-4 py-2 text-sm font-medium rounded-lg ${activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-700 hover:bg-gray-100'}`}>
                    <Settings size={18} className="mr-3" />
                    Settings
                  </button>
                </div>
              </div>
            </nav>
            <div className="mt-6 pt-6 border-t border-gray-200">
              {isHost && <Link to="/create-event" className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 mb-2">
                  <PlusCircle size={18} className="mr-2" />
                  Create New Event
                </Link>}
              {!isHost && <Link to="/become-host" className="flex items-center justify-center w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300 mb-2">
                  <PlusCircle size={18} className="mr-2" />
                  Become a Host
                </Link>}
              <Link to="/" className="flex items-center justify-center w-full px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300">
                <HomeIcon size={18} className="mr-2" />
                Back to Home
              </Link>
            </div>
          </aside>
          {/* Mobile Menu */}
          {mobileMenuOpen && <div className="fixed inset-0 z-50 bg-white">
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <h2 className="text-xl font-bold">Dashboard Menu</h2>
                  <button onClick={() => setMobileMenuOpen(false)} className="p-2 rounded-full hover:bg-gray-100">
                    <X size={24} />
                  </button>
                </div>
                <div className="flex-grow overflow-y-auto">
                  <div className="p-4">
                    <div className="flex items-center p-3 mb-4 bg-gray-50 rounded-lg" onClick={() => handleTabClick('profile')}>
                      <img src={currentUser?.profileImage || 'https://images.unsplash.com/photo-1560250097-0b93528c311a'} alt="User Profile" className="h-14 w-14 rounded-full object-cover mr-4" />
                      <div>
                        <h3 className="font-semibold text-lg">
                          {currentUser?.name || 'User'}
                        </h3>
                        <p className="text-gray-500">
                          {isHost ? 'Event Host' : 'Attendee'}
                        </p>
                      </div>
                    </div>
                    <nav className="space-y-4">
                      {/* My Events Section */}
                      <div>
                        <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2 px-1">
                          My Events
                        </h4>
                        <div className="space-y-1">
                          <button onClick={() => handleTabClick('mybookings')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'mybookings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                              <Ticket size={20} className="mr-3" />
                              <span>My Bookings</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                          </button>
                          <button onClick={() => handleTabClick('attended')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'attended' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                              <Clock size={20} className="mr-3" />
                              <span>Events Attended</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                          </button>
                          <button onClick={() => handleTabClick('liked')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'liked' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                              <Heart size={20} className="mr-3" />
                              <span>Liked Events</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                      {/* Host Dashboard Section (only shown for hosts) */}
                      {isHost && <div>
                          <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2 px-1">
                            Host Dashboard
                          </h4>
                          <div className="space-y-1">
                            <button onClick={() => handleTabClick('events')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'events' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                              <div className="flex items-center">
                                <Calendar size={20} className="mr-3" />
                                <span>My Events</span>
                              </div>
                              <ChevronRight size={20} className="text-gray-400" />
                            </button>
                            <button onClick={() => handleTabClick('bookings')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'bookings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                              <div className="flex items-center">
                                <Users size={20} className="mr-3" />
                                <span>Bookings</span>
                              </div>
                              <ChevronRight size={20} className="text-gray-400" />
                            </button>
                            <button onClick={() => handleTabClick('reviews')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'reviews' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                              <div className="flex items-center">
                                <MessageSquare size={20} className="mr-3" />
                                <span>Reviews</span>
                              </div>
                              <ChevronRight size={20} className="text-gray-400" />
                            </button>
                            <button onClick={() => handleTabClick('payments')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'payments' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                              <div className="flex items-center">
                                <DollarSign size={20} className="mr-3" />
                                <span>Payments</span>
                              </div>
                              <ChevronRight size={20} className="text-gray-400" />
                            </button>
                          </div>
                        </div>}
                      {/* Account Section */}
                      <div>
                        <h4 className="text-xs uppercase font-semibold text-gray-500 tracking-wider mb-2 px-1">
                          Account
                        </h4>
                        <div className="space-y-1">
                          <button onClick={() => handleTabClick('profile')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'profile' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                              <User size={20} className="mr-3" />
                              <span>My Profile</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                          </button>
                          <button onClick={() => handleTabClick('settings')} className={`flex items-center justify-between w-full px-4 py-3 text-base font-medium rounded-lg ${activeTab === 'settings' ? 'bg-indigo-100 text-indigo-700' : 'text-gray-800 hover:bg-gray-50'}`}>
                            <div className="flex items-center">
                              <Settings size={20} className="mr-3" />
                              <span>Settings</span>
                            </div>
                            <ChevronRight size={20} className="text-gray-400" />
                          </button>
                        </div>
                      </div>
                    </nav>
                    <div className="mt-6 pt-6 border-t border-gray-200 space-y-3">
                      {isHost ? <Link to="/create-event" className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                          <PlusCircle size={20} className="mr-2" />
                          Create New Event
                        </Link> : <Link to="/become-host" className="flex items-center justify-center w-full px-4 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300">
                          <PlusCircle size={20} className="mr-2" />
                          Become a Host
                        </Link>}
                      <Link to="/" className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition duration-300">
                        <HomeIcon size={20} className="mr-2" />
                        Back to Home
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
          {/* Main Content Area */}
          <main className="flex-1">
            {/* Host Dashboard Tabs */}
            {isHost && activeTab === 'events' && <HostEvents />}
            {isHost && activeTab === 'bookings' && <HostBookings />}
            {isHost && activeTab === 'reviews' && <HostReviews />}
            {isHost && activeTab === 'payments' && <HostPayments />}
            {/* User Event Tabs */}
            {activeTab === 'mybookings' && <MyBookings />}
            {activeTab === 'attended' && <AttendedEvents />}
            {activeTab === 'liked' && <LikedEvents />}
            {/* Account Tabs */}
            {activeTab === 'profile' && <ProfileSection />}
            {activeTab === 'settings' && <div className="bg-white rounded-lg shadow-sm p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">
                  Account Settings
                </h2>
                <p className="text-gray-600">
                  Account settings coming soon. Here you'll be able to manage
                  notifications, privacy, and security settings.
                </p>
              </div>}
          </main>
        </div>
      </div>
    </div>;
};
export default DashboardPage;