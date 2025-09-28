import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Mail, Phone, MapPin, Facebook, Instagram, Twitter } from 'lucide-react';
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-4 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Brand Column */}
          <div>
            <div className="flex items-center mb-4">
              <Calendar className="h-8 w-8 text-indigo-400 mr-2" />
              <span className="text-2xl font-bold text-white">Fiesta254</span>
            </div>
            <p className="text-gray-400 mb-6">
              Discover and book amazing events happening around you. Join
              thousands of people finding new experiences every day.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="bg-gray-800 hover:bg-indigo-600 p-2 rounded-full transition-colors">
                <Facebook size={18} className="text-gray-300 hover:text-white" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="bg-gray-800 hover:bg-indigo-600 p-2 rounded-full transition-colors">
                <Instagram size={18} className="text-gray-300 hover:text-white" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="bg-gray-800 hover:bg-indigo-600 p-2 rounded-full transition-colors">
                <Twitter size={18} className="text-gray-300 hover:text-white" />
                <span className="sr-only">Twitter</span>
              </a>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>Home
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>Explore Events
                </Link>
              </li>
              <li>
                <Link to="/categories" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>Categories
                </Link>
              </li>
              <li>
                <Link to="/become-host" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>Host an Event
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>About Us
                </Link>
              </li>
            </ul>
          </div>
          {/* Support */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/help" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>Help Center
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>Contact Us
                </Link>
              </li>
              <li>
                <Link to="/faq" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>FAQs
                </Link>
              </li>
              <li>
                <Link to="/refunds" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>Refund Policy
                </Link>
              </li>
              <li>
                <Link to="/trust" className="text-gray-400 hover:text-indigo-400 transition-colors flex items-center">
                  <span className="mr-2">•</span>Trust & Safety
                </Link>
              </li>
            </ul>
          </div>
          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white border-b border-gray-700 pb-2">
              Contact Us
            </h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <MapPin size={18} className="text-indigo-400 mr-2 mt-1 flex-shrink-0" />
                <span className="text-gray-400">
                  123 Event Street, San Francisco, CA 94103, USA
                </span>
              </li>
              <li className="flex items-center">
                <Phone size={18} className="text-indigo-400 mr-2 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-center">
                <Mail size={18} className="text-indigo-400 mr-2 flex-shrink-0" />
                <a href="mailto:support@eventhub.com" className="text-gray-400 hover:text-indigo-400 transition-colors">
                  support@eventhub.com
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* Newsletter */}
        <div className="border-t border-gray-800 pt-8 pb-8">
          <div className="max-w-md mx-auto md:mx-0">
            <h3 className="text-lg font-semibold mb-3">
              Subscribe to Our Newsletter
            </h3>
            <p className="text-gray-400 mb-4">
              Stay updated with the latest events and offers
            </p>
            <form className="flex">
              <input type="email" placeholder="Your email address" className="flex-grow px-4 py-2 rounded-l-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500" required />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-r-lg transition-colors">
                Subscribe
              </button>
            </form>
          </div>
        </div>
        {/* Bottom Footer */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm mb-4 md:mb-0">
            © {currentYear} EventHub. All rights reserved.
          </p>
          <div className="flex flex-wrap gap-4 text-sm">
            <Link to="/terms" className="text-gray-400 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="text-gray-400 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link to="/cookies" className="text-gray-400 hover:text-white transition-colors">
              Cookie Policy
            </Link>
            <Link to="/accessibility" className="text-gray-400 hover:text-white transition-colors">
              Accessibility
            </Link>
          </div>
        </div>
      </div>
    </footer>;
};
export default Footer;