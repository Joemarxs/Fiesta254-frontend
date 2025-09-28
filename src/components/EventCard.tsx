import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, MapPin, Heart, Users } from 'lucide-react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { toggleLike } from '../store/slices/likesSlice';
interface EventCardProps {
  event: {
    id: string;
    title: string;
    date: string;
    location: string;
    price: number;
    image: string;
    category: string;
    attendees: number;
    capacity: number;
  };
}
const EventCard = ({
  event
}: EventCardProps) => {
  const dispatch = useAppDispatch();
  const likedEvents = useAppSelector(state => state.likes.likedEvents);
  const handleLikeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleLike(event.id));
  };
  const isLiked = likedEvents.includes(event.id);
  const availabilityPercentage = event.attendees / event.capacity * 100;
  let availabilityColor = 'bg-green-500';
  let availabilityText = 'Plenty available';
  if (availabilityPercentage >= 90) {
    availabilityColor = 'bg-red-500';
    availabilityText = 'Almost sold out';
  } else if (availabilityPercentage >= 75) {
    availabilityColor = 'bg-yellow-500';
    availabilityText = 'Selling fast';
  }
  return <Link to={`/events/${event.id}`} className="group block">
      <div className="overflow-hidden rounded-xl bg-white shadow-md transition-all duration-300 hover:shadow-lg h-full flex flex-col">
        <div className="relative">
          <img src={event.image} alt={event.title} className="h-48 w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <button onClick={handleLikeClick} className="absolute right-3 top-3 rounded-full bg-white p-2 shadow-md transition-colors z-10" aria-label={isLiked ? 'Remove from favorites' : 'Add to favorites'}>
            <Heart size={20} className={`${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-600'}`} />
          </button>
          <div className="absolute top-3 left-3">
            <span className="inline-block rounded-full bg-indigo-600 px-3 py-1 text-xs font-medium text-white shadow-md">
              {event.category}
            </span>
          </div>
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <div className="flex items-center text-white text-xs">
              <Users size={14} className="mr-1" />
              <div className="flex items-center">
                <div className="w-24 h-1.5 bg-gray-300 rounded-full overflow-hidden mr-2">
                  <div className={`h-full ${availabilityColor} rounded-full`} style={{
                  width: `${availabilityPercentage}%`
                }}></div>
                </div>
                <span>{availabilityText}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 flex-1 flex flex-col">
          <h3 className="mb-2 text-lg font-semibold text-gray-800 line-clamp-2 group-hover:text-indigo-600 transition-colors">
            {event.title}
          </h3>
          <div className="mb-2 flex items-center text-gray-600">
            <Calendar size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm">
              {new Date(event.date).toLocaleDateString('en-US', {
              month: 'short',
              day: 'numeric',
              year: 'numeric'
            })}
            </span>
          </div>
          <div className="mb-4 flex items-center text-gray-600">
            <MapPin size={16} className="mr-2 flex-shrink-0" />
            <span className="text-sm line-clamp-1">{event.location}</span>
          </div>
          <div className="mt-auto flex items-center justify-between">
            <span className="text-lg font-bold text-indigo-600">
              ${event.price.toFixed(2)}
            </span>
            <span className="rounded-full bg-indigo-100 px-3 py-1 text-xs font-medium text-indigo-800 group-hover:bg-indigo-200 transition-colors">
              View Details
            </span>
          </div>
        </div>
      </div>
    </Link>;
};
export default EventCard;