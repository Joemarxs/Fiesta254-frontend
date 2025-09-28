import React, { useState } from 'react';
import { MailIcon, Check } from 'lucide-react';
const NewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      // In a real app, this would send the email to a server
      console.log('Subscribing email:', email);
      setSubscribed(true);
      setEmail('');
    }
  };
  return <section className="py-16 bg-indigo-900 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <MailIcon size={40} className="mx-auto mb-4 text-indigo-300" />
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Stay Updated on Events
          </h2>
          <p className="text-indigo-200 mb-8">
            Subscribe to our newsletter and be the first to know about upcoming
            events, exclusive offers, and more.
          </p>
          {subscribed ? <div className="bg-indigo-800 rounded-lg p-6 inline-flex items-center">
              <Check size={24} className="text-green-400 mr-3" />
              <span>
                Thank you for subscribing! Check your email for confirmation.
              </span>
            </div> : <form onSubmit={handleSubmit} className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto">
              <input type="email" placeholder="Enter your email address" className="flex-grow px-4 py-3 rounded-lg text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-300" value={email} onChange={e => setEmail(e.target.value)} required />
              <button type="submit" className="bg-indigo-600 hover:bg-indigo-700 px-6 py-3 rounded-lg font-medium transition-colors">
                Subscribe
              </button>
            </form>}
          <p className="text-sm text-indigo-300 mt-4">
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>;
};
export default NewsletterSection;