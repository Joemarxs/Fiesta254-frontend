import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Booking {
  id: string;
  eventId: string;
  eventTitle: string;
  eventImage: string;
  date: string;
  location: string;
  tickets: number;
  ticketType: string;
  totalAmount: number;
  status: 'upcoming' | 'completed' | 'cancelled';
  bookingDate: string;
  userId: string;
}
interface BookingsState {
  bookings: Booking[];
  currentBooking: {
    event: any;
    ticketType: any;
    ticketCount: number;
    totalPrice: number;
    serviceFee: number;
    finalTotal: number;
    customerInfo?: {
      name: string;
      email: string;
    };
  } | null;
  isLoading: boolean;
  error: string | null;
}
// Mock bookings data
const initialBookings: Booking[] = [{
  id: '1',
  eventId: '1',
  eventTitle: 'Summer Music Festival',
  eventImage: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  date: '2023-07-15',
  location: 'Central Park, New York',
  tickets: 2,
  ticketType: 'Standard',
  totalAmount: 299.98,
  status: 'completed',
  bookingDate: '2023-06-28',
  userId: '2'
}, {
  id: '2',
  eventId: '3',
  eventTitle: 'Cooking Masterclass',
  eventImage: 'https://images.unsplash.com/photo-1556910103-1c02745aae4d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  date: '2023-08-05',
  location: 'Culinary Institute, Chicago',
  tickets: 1,
  ticketType: 'VIP',
  totalAmount: 129.99,
  status: 'upcoming',
  bookingDate: '2023-07-15',
  userId: '2'
}, {
  id: '3',
  eventId: '8',
  eventTitle: 'Comedy Night Special',
  eventImage: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80',
  date: '2023-08-25',
  location: 'Laugh Factory, Austin',
  tickets: 2,
  ticketType: 'Standard',
  totalAmount: 70.0,
  status: 'upcoming',
  bookingDate: '2023-07-20',
  userId: '1'
}, {
  id: '4',
  eventId: '6',
  eventTitle: 'Art Exhibition Opening Night',
  eventImage: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80',
  date: '2023-06-08',
  location: 'Modern Art Gallery, Los Angeles',
  tickets: 1,
  ticketType: 'Standard',
  totalAmount: 15.0,
  status: 'completed',
  bookingDate: '2023-06-01',
  userId: '3'
}, {
  id: '5',
  eventId: '5',
  eventTitle: 'Business Networking Mixer',
  eventImage: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1198&q=80',
  date: '2023-07-18',
  location: 'Grand Hotel, Boston',
  tickets: 1,
  ticketType: 'Standard',
  totalAmount: 25.0,
  status: 'completed',
  bookingDate: '2023-07-10',
  userId: '1'
}];
const initialState: BookingsState = {
  bookings: initialBookings,
  currentBooking: null,
  isLoading: false,
  error: null
};
export const bookingsSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    setBookings: (state, action: PayloadAction<Booking[]>) => {
      state.bookings = action.payload;
    },
    addBooking: (state, action: PayloadAction<Booking>) => {
      state.bookings.push(action.payload);
    },
    updateBooking: (state, action: PayloadAction<{
      id: string;
      booking: Partial<Booking>;
    }>) => {
      const {
        id,
        booking
      } = action.payload;
      const index = state.bookings.findIndex(b => b.id === id);
      if (index !== -1) {
        state.bookings[index] = {
          ...state.bookings[index],
          ...booking
        };
      }
    },
    cancelBooking: (state, action: PayloadAction<string>) => {
      const index = state.bookings.findIndex(b => b.id === action.payload);
      if (index !== -1) {
        state.bookings[index].status = 'cancelled';
      }
    },
    setCurrentBooking: (state, action: PayloadAction<BookingsState['currentBooking']>) => {
      state.currentBooking = action.payload;
    },
    clearCurrentBooking: state => {
      state.currentBooking = null;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    }
  }
});
export const {
  setBookings,
  addBooking,
  updateBooking,
  cancelBooking,
  setCurrentBooking,
  clearCurrentBooking,
  setLoading,
  setError
} = bookingsSlice.actions;
export default bookingsSlice.reducer;