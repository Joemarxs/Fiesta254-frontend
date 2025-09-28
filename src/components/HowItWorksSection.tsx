import React from 'react';
import { Search, Calendar, Ticket, Star } from 'lucide-react';
const HowItWorksSection = () => {
  const steps = [{
    icon: <Search size={32} className="text-indigo-600" />,
    title: 'Find Events',
    description: 'Search for events by category, location, or date that match your interests.'
  }, {
    icon: <Calendar size={32} className="text-indigo-600" />,
    title: 'Book Tickets',
    description: 'Select the number of tickets and complete your booking in just a few clicks.'
  }, {
    icon: <Ticket size={32} className="text-indigo-600" />,
    title: 'Attend & Enjoy',
    description: 'Receive your e-tickets instantly and get ready for an amazing experience.'
  }, {
    icon: <Star size={32} className="text-indigo-600" />,
    title: 'Share & Review',
    description: 'Share your experience and leave reviews to help others discover great events.'
  }];
  return <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            How EventHub Works
          </h2>
          <p className="text-gray-600">
            Discover and attend events in just a few simple steps. Our platform
            makes finding and booking tickets easier than ever.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => <div key={index} className="bg-gray-50 rounded-xl p-6 text-center transition-transform hover:-translate-y-2 duration-300 shadow-sm hover:shadow-md">
              <div className="bg-indigo-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-3 text-gray-800">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.description}</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default HowItWorksSection;