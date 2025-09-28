import { createSlice, PayloadAction } from '@reduxjs/toolkit';
interface LikesState {
  likedEvents: string[];
  isLoading: boolean;
  error: string | null;
}
const initialState: LikesState = {
  likedEvents: [],
  isLoading: false,
  error: null
};
export const likesSlice = createSlice({
  name: 'likes',
  initialState,
  reducers: {
    toggleLike: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      const index = state.likedEvents.indexOf(eventId);
      if (index !== -1) {
        state.likedEvents.splice(index, 1);
      } else {
        state.likedEvents.push(eventId);
      }
    },
    addLike: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      if (!state.likedEvents.includes(eventId)) {
        state.likedEvents.push(eventId);
      }
    },
    removeLike: (state, action: PayloadAction<string>) => {
      const eventId = action.payload;
      state.likedEvents = state.likedEvents.filter(id => id !== eventId);
    },
    setLikedEvents: (state, action: PayloadAction<string[]>) => {
      state.likedEvents = action.payload;
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
  toggleLike,
  addLike,
  removeLike,
  setLikedEvents,
  setLoading,
  setError
} = likesSlice.actions;
export default likesSlice.reducer;