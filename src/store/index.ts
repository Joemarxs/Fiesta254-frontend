import { configureStore } from '@reduxjs/toolkit';
import eventsReducer from './slices/eventsSlice';
import usersReducer from './slices/usersSlice';
import reviewsReducer from './slices/reviewsSlice';
import likesReducer from './slices/likesSlice';
import categoriesReducer from './slices/categoriesSlice';
import bookingsReducer from './slices/bookingsSlice';
import paymentsReducer from './slices/paymentsSlice';
import messagesReducer from './slices/messagesSlice';
export const store = configureStore({
  reducer: {
    events: eventsReducer,
    users: usersReducer,
    reviews: reviewsReducer,
    likes: likesReducer,
    categories: categoriesReducer,
    bookings: bookingsReducer,
    payments: paymentsReducer,
    messages: messagesReducer
  }
});
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;