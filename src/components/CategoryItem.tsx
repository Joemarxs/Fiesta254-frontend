import React from 'react';
import { Link } from 'react-router-dom';
interface CategoryItemProps {
  category: {
    id: string;
    name: string;
    icon: string;
    color: string;
  };
}
const CategoryItem = ({
  category
}: CategoryItemProps) => {
  return <Link to={`/events?category=${category.name}`} className="flex-shrink-0 transition-transform hover:scale-105">
      <div className={`flex flex-col items-center justify-center rounded-lg ${category.color} p-4 w-24 h-24 md:w-28 md:h-28`}>
        <span className="text-3xl mb-2">{category.icon}</span>
        <span className="text-sm font-medium text-white text-center">
          {category.name}
        </span>
      </div>
    </Link>;
};
export default CategoryItem;