import React from 'react';
import { Star, Quote } from 'lucide-react';
const TestimonialsSection = () => {
  const testimonials = [{
    id: 1,
    name: 'Sarah Johnson',
    role: 'Regular Attendee',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
    quote: "EventHub has completely changed how I discover events! I've attended amazing concerts and workshops I wouldn't have found otherwise.",
    rating: 5
  }, {
    id: 2,
    name: 'Michael Thompson',
    role: 'Event Host',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    quote: 'As an event organizer, EventHub has helped me reach a wider audience. The platform is intuitive and the support team is always helpful.',
    rating: 5
  }, {
    id: 3,
    name: 'Emily Davis',
    role: 'Music Lover',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80',
    quote: 'I found my favorite band through an EventHub recommendation! The booking process was smooth, and I received my tickets instantly.',
    rating: 4
  }];
  return <section className="py-16 bg-indigo-50">
      <div className="container mx-auto px-4">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
            What Our Users Say
          </h2>
          <p className="text-gray-600">
            Join thousands of satisfied users who discover and book amazing
            events through our platform
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map(testimonial => <div key={testimonial.id} className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow relative">
              <Quote size={40} className="absolute top-4 right-4 text-indigo-100" />
              <div className="flex items-center mb-4">
                <img src={testimonial.image} alt={testimonial.name} className="w-14 h-14 rounded-full object-cover mr-4 border-2 border-indigo-100" />
                <div>
                  <h3 className="font-semibold text-gray-800">
                    {testimonial.name}
                  </h3>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
              <div className="flex mb-4">
                {[...Array(5)].map((_, i) => <Star key={i} size={16} className={i < testimonial.rating ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'} />)}
              </div>
              <p className="text-gray-600 italic">"{testimonial.quote}"</p>
            </div>)}
        </div>
      </div>
    </section>;
};
export default TestimonialsSection;