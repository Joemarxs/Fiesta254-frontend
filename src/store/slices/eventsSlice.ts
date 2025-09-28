import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockEvents } from '../../data/mockData';
import * as eventsService from '../../services/eventsService';
export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  endDate?: string;
  endTime: string;
  location: string;
  price: number;
  capacity: number;
  attendees: number;
  image: string;
  likes: number;
  rating: number;
  host: {
    id: string;
    name: string;
    image: string;
    bio: string;
    rating: number;
    eventsHosted: number;
  };
}
interface EventsState {
  events: Event[];
  isLoading: boolean;
  error: string | null;
}
// Async thunks for API calls
export const fetchEvents = createAsyncThunk('events/fetchEvents', async (_, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await eventsService.getAllEvents()
    // For now, return mock data
    return mockEvents;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const fetchEventById = createAsyncThunk('events/fetchEventById', async (id: string, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await eventsService.getEventById(id)
    // For now, return from mock data
    const event = mockEvents.find(event => event.id === id);
    if (!event) {
      throw new Error('Event not found');
    }
    return event;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const createNewEvent = createAsyncThunk('events/createEvent', async (eventData: Omit<Event, 'id'>, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await eventsService.createEvent(eventData)
    // Mock implementation
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      likes: 0,
      attendees: 0,
      rating: 0
    };
    return newEvent;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const updateExistingEvent = createAsyncThunk('events/updateEvent', async ({
  id,
  eventData
}: {
  id: string;
  eventData: Partial<Event>;
}, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await eventsService.updateEvent(id, eventData)
    // Mock implementation
    return {
      id,
      ...eventData
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const deleteExistingEvent = createAsyncThunk('events/deleteEvent', async (id: string, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // await eventsService.deleteEvent(id)
    // Mock implementation
    return id;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const incrementEventAttendees = createAsyncThunk('events/incrementAttendees', async (id: string, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await eventsService.incrementAttendees(id)
    // Mock implementation
    return {
      id
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
const initialState: EventsState = {
  events: mockEvents,
  isLoading: false,
  error: null
};
export const eventsSlice = createSlice({
  name: 'events',
  initialState,
  reducers: {
    setEvents: (state, action: PayloadAction<Event[]>) => {
      state.events = action.payload;
    },
    addEvent: (state, action: PayloadAction<Event>) => {
      state.events.push(action.payload);
    },
    updateEvent: (state, action: PayloadAction<Event>) => {
      const index = state.events.findIndex(event => event.id === action.payload.id);
      if (index !== -1) {
        state.events[index] = action.payload;
      }
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    incrementAttendees: (state, action: PayloadAction<string>) => {
      const event = state.events.find(event => event.id === action.payload);
      if (event && event.attendees < event.capacity) {
        event.attendees += 1;
      }
    },
    decrementAttendees: (state, action: PayloadAction<string>) => {
      const event = state.events.find(event => event.id === action.payload);
      if (event && event.attendees > 0) {
        event.attendees -= 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  },
  extraReducers: builder => {
    // Handle fetchEvents
    builder.addCase(fetchEvents.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // Handle createNewEvent
    builder.addCase(createNewEvent.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(createNewEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events.push(action.payload as Event);
    });
    builder.addCase(createNewEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // Handle updateExistingEvent
    builder.addCase(updateExistingEvent.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateExistingEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      const {
        id
      } = action.payload as {
        id: string;
      };
      const index = state.events.findIndex(event => event.id === id);
      if (index !== -1) {
        state.events[index] = {
          ...state.events[index],
          ...action.payload
        };
      }
    });
    builder.addCase(updateExistingEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // Handle deleteExistingEvent
    builder.addCase(deleteExistingEvent.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(deleteExistingEvent.fulfilled, (state, action) => {
      state.isLoading = false;
      state.events = state.events.filter(event => event.id !== action.payload);
    });
    builder.addCase(deleteExistingEvent.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // Handle incrementEventAttendees
    builder.addCase(incrementEventAttendees.fulfilled, (state, action) => {
      const {
        id
      } = action.payload as {
        id: string;
      };
      const event = state.events.find(event => event.id === id);
      if (event && event.attendees < event.capacity) {
        event.attendees += 1;
      }
    });
  }
});
export const {
  setEvents,
  addEvent,
  updateEvent,
  removeEvent,
  incrementAttendees,
  decrementAttendees,
  setLoading,
  setError
} = eventsSlice.actions;
export default eventsSlice.reducer;