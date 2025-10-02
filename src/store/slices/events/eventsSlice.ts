import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as eventsService from '../../../services/eventsService';

// -------------------- Types --------------------
export interface Host {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  image?: string;
  bio?: string;
  rating?: number;
  eventsHosted?: number;
}

export interface EventImage {
  id: string;
  imageUrl: string;
  isPrimary: boolean;
  createdAt: string;
}

export interface TicketType {
  id: string;
  name: string;
  price: number;
  description: string;
  availableFrom?: string;
  availableTo?: string;
  discount?: number;
  maxQuantity?: number;
  createdAt: string;
  updatedAt: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time?: string;
  endDate?: string;
  endTime?: string;
  location: string;
  price: number;
  capacity?: number;
  attendees: number;
  images: EventImage[];
  ticket_types: TicketType[];
  likes: number;
  rating?: number;
  host: Host;
}

// -------------------- State --------------------
interface EventsState {
  events: Event[];
  featuredEvents: Event[];
  eventDetails: { [id: string]: Event };
  isLoading: boolean;
  error: string | null;
  hasFetched: boolean;
  nextPage: number | null;
}

const MAX_EVENTS = 40; // FIFO limit

const initialState: EventsState = {
  events: [],
  featuredEvents: [],
  eventDetails: {},
  isLoading: false,
  error: null,
  hasFetched: false,
  nextPage: 1,
};

// -------------------- Async Thunks --------------------
export const fetchEvents = createAsyncThunk(
  'events/fetchEvents',
  async (page: number = 1, { rejectWithValue }) => {
    try {
      return await eventsService.getAllEvents(page);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchFeaturedEvents = createAsyncThunk(
  'events/fetchFeaturedEvents',
  async (_, { rejectWithValue }) => {
    try {
      return await eventsService.getFeaturedEvents();
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const fetchEventById = createAsyncThunk(
  'events/fetchEventById',
  async (id: string, { rejectWithValue }) => {
    try {
      const event = await eventsService.getEventById(id);
      if (!event) throw new Error('Event not found');
      return normalizeEvent(event);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateExistingEvent = createAsyncThunk(
  'events/updateEvent',
  async ({ id, eventData }: { id: string; eventData: Partial<Event> }, { rejectWithValue }) => {
    try {
      return await eventsService.updateEvent(id, eventData);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const deleteExistingEvent = createAsyncThunk(
  'events/deleteEvent',
  async (id: string, { rejectWithValue }) => {
    try {
      await eventsService.deleteEvent(id);
      return id;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const incrementEventAttendees = createAsyncThunk(
  'events/incrementAttendees',
  async (id: string, { rejectWithValue }) => {
    try {
      return await eventsService.incrementAttendees(id);
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// -------------------- Helpers --------------------
const normalizeEvent = (event: any): Event | null => {
  if (!event) return null;

  return {
    id: event.id,
    title: event.title,
    description: event.description,
    category: event.category,
    date: event.date,
    time: event.time,
    endDate: event.endDate,
    endTime: event.endTime,
    location: event.location,
    price: Number(event.price || 0),
    capacity: event.capacity ? Number(event.capacity) : undefined,
    attendees: Number(event.attendees || 0),
    images: event.images || [],
    ticket_types:
      event.ticket_types?.map((t: any) => ({
        id: t.id,
        name: t.name,
        price: Number(t.price),
        description: t.description,
        availableFrom: t.availableFrom,
        availableTo: t.availableTo,
        discount: t.discount ? Number(t.discount) : undefined,
        maxQuantity: t.maxQuantity,
        createdAt: t.createdAt,
        updatedAt: t.updatedAt,
      })) || [],
    likes: event.likes,
    rating: event.rating,
    host: {
      id: event.host?.id ?? '',
      name: event.host?.name ?? '',
      email: event.host?.email ?? '',
      phoneNumber: event.host?.phoneNumber ?? undefined,
      image: event.host?.profileImage ?? undefined,
      bio: event.host?.bio ?? undefined,
      rating: event.host?.rating,
      eventsHosted: event.host?.eventsHosted,
    },
  };
};

const extractResults = (payload: any) => {
  if (Array.isArray(payload)) return payload;
  if (payload?.results && Array.isArray(payload.results)) return payload.results;
  return [];
};

// -------------------- Slice --------------------
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
      if (index !== -1) state.events[index] = action.payload;
    },
    removeEvent: (state, action: PayloadAction<string>) => {
      state.events = state.events.filter(event => event.id !== action.payload);
    },
    incrementAttendees: (state, action: PayloadAction<string>) => {
      const event = state.events.find(e => e.id === action.payload);
      if (event && (!event.capacity || event.attendees < event.capacity)) {
        event.attendees += 1;
      }
    },
    decrementAttendees: (state, action: PayloadAction<string>) => {
      const event = state.events.find(e => e.id === action.payload);
      if (event && event.attendees > 0) {
        event.attendees -= 1;
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setNextPage: (state, action: PayloadAction<number | null>) => {
      state.nextPage = action.payload;
    },
  },
  extraReducers: builder => {
    // Fetch events
    builder.addCase(fetchEvents.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchEvents.fulfilled, (state, action) => {
      const results = extractResults(action.payload)
        .map(normalizeEvent)
        .filter((e: Event | null): e is Event => e !== null);

      if (action.meta.arg > 1) {
        state.events = [...state.events, ...results];
        if (state.events.length > MAX_EVENTS) {
          state.events = state.events.slice(state.events.length - MAX_EVENTS);
        }
      } else {
        state.events = results;
      }

      const nextUrl = (action.payload as any)?.next;
      state.nextPage = nextUrl ? action.meta.arg + 1 : null;
      state.hasFetched = true;
      state.isLoading = false;
    });
    builder.addCase(fetchEvents.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Featured events
    builder.addCase(fetchFeaturedEvents.fulfilled, (state, action) => {
      state.featuredEvents = extractResults(action.payload)
        .map(normalizeEvent)
        .filter((e: Event | null): e is Event => e !== null);
    });

    // Fetch single event
    builder.addCase(fetchEventById.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(fetchEventById.fulfilled, (state, action) => {
      const event = normalizeEvent(action.payload);
      if (!event) return;

      const index = state.events.findIndex(e => e.id === event.id);
      if (index !== -1) state.events[index] = event;
      else state.events.push(event);

      state.eventDetails[event.id] = event;
      state.isLoading = false;
    });
    builder.addCase(fetchEventById.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // Update
    builder.addCase(updateExistingEvent.fulfilled, (state, action) => {
      const updated = normalizeEvent(action.payload);
      if (!updated) return;

      const index = state.events.findIndex(e => e.id === updated.id);
      if (index !== -1) state.events[index] = updated;
      if (state.eventDetails[updated.id]) state.eventDetails[updated.id] = updated;
    });

    // Delete
    builder.addCase(deleteExistingEvent.fulfilled, (state, action) => {
      state.events = state.events.filter(e => e.id !== action.payload);
      delete state.eventDetails[action.payload];
    });

    // Increment attendees
    builder.addCase(incrementEventAttendees.fulfilled, (state, action) => {
      const updatedEvent = normalizeEvent(action.payload);
      if (!updatedEvent) return;

      const index = state.events.findIndex(e => e.id === updatedEvent.id);
      if (index !== -1) state.events[index] = updatedEvent;
      if (state.eventDetails[updatedEvent.id]) state.eventDetails[updatedEvent.id] = updatedEvent;
    });
  },
});

// -------------------- Exports --------------------
export const {
  setEvents,
  addEvent,
  updateEvent,
  removeEvent,
  incrementAttendees,
  decrementAttendees,
  setLoading,
  setError,
  setNextPage,
} = eventsSlice.actions;

export default eventsSlice.reducer;
