import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import EventDetailPage from './pages/EventDetailPage';
import BookingPage from './pages/BookingPage';
import CheckoutPage from './pages/CheckoutPage';
import ConfirmationPage from './pages/ConfirmationPage';
import DashboardPage from './pages/DashboardPage';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import BecomeHostPage from './pages/BecomeHostPage';
import CreateEventPage from './pages/CreateEventPage';
import EditEventPage from './pages/EditEventPage';
import EventsPage from './pages/EventsPage';
import CategoriesPage from './pages/CategoriesPage';
import NotificationsPage from './pages/NotificationsPage';
import ChatPage from './pages/ChatPage';
export function App() {
  return <Provider store={store}>
      <Router>
        <div className="flex flex-col min-h-screen bg-gray-50">
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              <Route path="/events/:id" element={<EventDetailPage />} />
              <Route path="/booking/:id" element={<BookingPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/confirmation" element={<ConfirmationPage />} />
              <Route path="/dashboard/*" element={<DashboardPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/signup" element={<SignupPage />} />
              <Route path="/become-host" element={<BecomeHostPage />} />
              <Route path="/create-event" element={<CreateEventPage />} />
              <Route path="/edit-event/:id" element={<EditEventPage />} />
              <Route path="/categories" element={<CategoriesPage />} />
              <Route path="/notifications" element={<NotificationsPage />} />
              <Route path="/chat/:hostId" element={<ChatPage />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </Provider>;
}