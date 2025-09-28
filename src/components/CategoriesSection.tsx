import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { eventCategories } from '../data/mockData';
import { Link } from 'react-router-dom';
import { Music, Laptop, Wine, Heart, Briefcase, Palette, Trophy, Theater } from 'lucide-react';
const CategoryItem = ({
  category
}: {
  category: any;
}) => {
  // Map category names to Lucide icons
  const getIcon = (name: string) => {
    switch (name) {
      case 'Music':
        return <Music size={24} className="text-indigo-600" />;
      case 'Technology':
        return <Laptop size={24} className="text-indigo-600" />;
      case 'Food & Drink':
        return <Wine size={24} className="text-indigo-600" />;
      case 'Wellness':
        return <Heart size={24} className="text-indigo-600" />;
      case 'Business':
        return <Briefcase size={24} className="text-indigo-600" />;
      case 'Art':
        return <Palette size={24} className="text-indigo-600" />;
      case 'Sports':
        return <Trophy size={24} className="text-indigo-600" />;
      case 'Entertainment':
        return <Theater size={24} className="text-indigo-600" />;
      default:
        return <div className="text-2xl">{category.icon}</div>;
    }
  };
  return <Link to={`/events?category=${category.name}`} className="flex-shrink-0 transition-transform hover:scale-105 hover:-translate-y-1 duration-300">
      <div className="flex flex-col items-center justify-center p-4">
        <div className="bg-gray-100 rounded-full p-4 mb-3">
          {getIcon(category.name)}
        </div>
        <span className="text-sm font-medium text-gray-800 text-center">
          {category.name}
        </span>
      </div>
    </Link>;
};
const CategoriesSection = () => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 300;
      const currentScroll = scrollContainerRef.current.scrollLeft;
      scrollContainerRef.current.scrollTo({
        left: direction === 'left' ? currentScroll - scrollAmount : currentScroll + scrollAmount,
        behavior: 'smooth'
      });
    }
  };
  return <section className="py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="mb-8 flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">
              Browse by Category
            </h2>
            <p className="text-gray-600">
              Find the perfect event that matches your interests
            </p>
          </div>
          <div className="flex space-x-2 mt-4 md:mt-0">
            <button onClick={() => scroll('left')} className="rounded-full p-3 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-300" aria-label="Scroll left">
              <ChevronLeft size={20} />
            </button>
            <button onClick={() => scroll('right')} className="rounded-full p-3 text-gray-600 hover:bg-gray-200 transition-colors border border-gray-300" aria-label="Scroll right">
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
        <div ref={scrollContainerRef} className="flex space-x-6 overflow-x-auto pb-6 scrollbar-hide snap-x snap-mandatory" style={{
        scrollbarWidth: 'none',
        msOverflowStyle: 'none'
      }}>
          {eventCategories.map(category => <div key={category.id} className="snap-start">
              <CategoryItem category={category} />
            </div>)}
        </div>
        <div className="mt-8 text-center">
          <Link to="/categories" className="inline-flex items-center text-indigo-600 font-medium hover:text-indigo-800 transition-colors">
            View all categories
            <ChevronRight size={16} className="ml-1" />
          </Link>
        </div>
      </div>
    </section>;
};
export default CategoriesSection;