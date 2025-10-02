import { useAppSelector, useAppDispatch } from './hooks';
import { RootState } from './index';
import { toggleLike as toggleLikeAction } from './slices/likesSlice';
import { Event } from './slices/events/eventsSlice';
import { mockEvents } from '../data/mockData';
const useEventStore = () => {
  const dispatch = useAppDispatch();
  const events = useAppSelector((state: RootState) => state.events.events);
  const likedEvents = useAppSelector((state: RootState) => state.likes.likedEvents);
  const getEventById = (id: string) => {
    // First try to find in Redux store
    const event = events.find(event => event.id === id);
    // If not found in store, fallback to mock data
    if (!event) {
      return mockEvents.find(event => event.id === id);
    }
    return event;
  };
  const toggleLike = (eventId: string) => {
    dispatch(toggleLikeAction(eventId));
  };
  return {
    events,
    likedEvents,
    getEventById,
    toggleLike
  };
};
export default useEventStore;