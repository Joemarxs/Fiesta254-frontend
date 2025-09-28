import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { mockReviews } from '../../data/mockData';
export interface Review {
  id: string;
  userId: string;
  userName: string;
  userImage: string;
  rating: number;
  comment: string;
  date: string;
  likes: number;
}
interface ReviewsState {
  reviews: {
    [eventId: string]: Review[];
  };
  isLoading: boolean;
  error: string | null;
}
const initialState: ReviewsState = {
  reviews: mockReviews,
  isLoading: false,
  error: null
};
export const reviewsSlice = createSlice({
  name: 'reviews',
  initialState,
  reducers: {
    addReview: (state, action: PayloadAction<{
      eventId: string;
      review: Review;
    }>) => {
      const {
        eventId,
        review
      } = action.payload;
      if (!state.reviews[eventId]) {
        state.reviews[eventId] = [];
      }
      state.reviews[eventId].push(review);
    },
    updateReview: (state, action: PayloadAction<{
      eventId: string;
      reviewId: string;
      review: Partial<Review>;
    }>) => {
      const {
        eventId,
        reviewId,
        review
      } = action.payload;
      const reviewIndex = state.reviews[eventId]?.findIndex(r => r.id === reviewId);
      if (reviewIndex !== undefined && reviewIndex !== -1) {
        state.reviews[eventId][reviewIndex] = {
          ...state.reviews[eventId][reviewIndex],
          ...review
        };
      }
    },
    removeReview: (state, action: PayloadAction<{
      eventId: string;
      reviewId: string;
    }>) => {
      const {
        eventId,
        reviewId
      } = action.payload;
      if (state.reviews[eventId]) {
        state.reviews[eventId] = state.reviews[eventId].filter(review => review.id !== reviewId);
      }
    },
    likeReview: (state, action: PayloadAction<{
      eventId: string;
      reviewId: string;
    }>) => {
      const {
        eventId,
        reviewId
      } = action.payload;
      const review = state.reviews[eventId]?.find(r => r.id === reviewId);
      if (review) {
        review.likes += 1;
      }
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
  addReview,
  updateReview,
  removeReview,
  likeReview,
  setLoading,
  setError
} = reviewsSlice.actions;
export default reviewsSlice.reducer;