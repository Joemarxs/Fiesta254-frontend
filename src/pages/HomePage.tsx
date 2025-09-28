import React from 'react';
import HeroSection from '../components/HeroSection';
import CategoriesSection from '../components/CategoriesSection';
import FeaturedEvents from '../components/FeaturedEvents';
import HowItWorksSection from '../components/HowItWorksSection';
import TestimonialsSection from '../components/TestimonialsSection';
import UpcomingEventsSection from '../components/UpcomingEventsSection';
import NewsletterSection from '../components/NewsletterSection';
const HomePage = () => {
  return <div className="bg-gray-50">
      <HeroSection />
      <CategoriesSection />
      <HowItWorksSection />
      <FeaturedEvents />
      <UpcomingEventsSection />
      <TestimonialsSection />
      <NewsletterSection />
    </div>;
};
export default HomePage;