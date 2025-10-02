import apiClient from './apiClient';
import { Event } from '../store/slices/events/eventsSlice';
import { CreateEventPayload } from '../store/slices/events/hostSlice';
import { store  } from '../store';

// Base URL for events
const EVENTS_URL = '/events';

// Get all events with pagination
export const getAllEvents = async (page: number = 1): Promise<any> => {
  try {
    const response = await apiClient.get("/events/event-card", {
      params: { page, page_size: 20 } // DRF will respect these
    });
    return response.data; // returns { count, next, previous, results }
  } catch (err) {
    console.error('Failed to fetch events:', err);
    throw err;
  }
};


// Get featured events
export const getFeaturedEvents = async (): Promise<Event[]> => {
  try {
    const response = await apiClient.get('/events/featured-event-card');
    return response.data.results; // <-- extract results
  } catch (err) {
    console.error('Failed to fetch featured events:', err);
    throw err;
  }
};


// Get event by ID
export const getEventById = async (id: string): Promise<Event | null> => {
  try {
    // Use query parameter `id=<id>` instead of URL param
    const response = await apiClient.get(`${EVENTS_URL}/id=${id}`);
    // If the backend returns an array, take the first item
    return Array.isArray(response.data) ? response.data[0] || null : response.data;
  } catch (err) {
    console.error(`Failed to fetch event with id ${id}:`, err);
    return null; // return null if not found or error
  }
};


// Create new event
export const createEvent = async (event: CreateEventPayload): Promise<Event> => {
  try {
    // Get token from localStorage (or your user store)
    const token = store.getState().users.token;
    
    const response = await apiClient.post(
      `${EVENTS_URL}/create`,
      event,
      {
        headers: {
          Authorization: `Bearer ${token}`, // attach JWT
        },
      }
    )
    
    return response.data
  } catch (err) {
    console.error('Failed to create event:', err)
    throw err
  }
}


// Update event
export const updateEvent = async (id: string, event: Partial<Event>): Promise<Event> => {
  try {
    const response = await apiClient.put(`${EVENTS_URL}/id=${id}/update`, event);
    return response.data;
  } catch (err) {
    console.error(`Failed to update event with id ${id}:`, err);
    throw err;
  }
};

// Delete event
export const deleteEvent = async (id: string): Promise<{ success: boolean }> => {
  try {
    const response = await apiClient.delete(`${EVENTS_URL}/id=${id}/delete`);
    return response.data;
  } catch (err) {
    console.error(`Failed to delete event with id ${id}:`, err);
    throw err;
  }
};

// Toggle event like (POST to like, DELETE to unlike)
export const toggleLike = async (id: string, like: boolean): Promise<Event> => {
  try {
    const method = like ? 'post' : 'delete';
    const response = await apiClient.request({
      url: `${EVENTS_URL}/id=${id}/like`,
      method
    });
    return response.data;
  } catch (err) {
    console.error(`Failed to ${like ? 'like' : 'unlike'} event with id ${id}:`, err);
    throw err;
  }
};


// Increment event attendees
export const incrementAttendees = async (id: string): Promise<Event> => {
  try {
    // Backend handles the complex logic, just call the endpoint
    const response = await apiClient.patch(`${EVENTS_URL}/${id}/increment-attendees`);
    return response.data;
  } catch (err) {
    console.error(`Failed to increment attendees for event with id ${id}:`, err);
    throw err;
  }
};
