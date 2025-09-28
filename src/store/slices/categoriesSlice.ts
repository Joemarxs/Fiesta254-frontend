import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { eventCategories } from '../../data/mockData';
export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}
interface CategoriesState {
  categories: Category[];
  selectedCategory: string | null;
  isLoading: boolean;
  error: string | null;
}
const initialState: CategoriesState = {
  categories: eventCategories,
  selectedCategory: null,
  isLoading: false,
  error: null
};
export const categoriesSlice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    selectCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    addCategory: (state, action: PayloadAction<Category>) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action: PayloadAction<Category>) => {
      const index = state.categories.findIndex(category => category.id === action.payload.id);
      if (index !== -1) {
        state.categories[index] = action.payload;
      }
    },
    removeCategory: (state, action: PayloadAction<string>) => {
      state.categories = state.categories.filter(category => category.id !== action.payload);
      if (state.selectedCategory === action.payload) {
        state.selectedCategory = null;
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
  setCategories,
  selectCategory,
  addCategory,
  updateCategory,
  removeCategory,
  setLoading,
  setError
} = categoriesSlice.actions;
export default categoriesSlice.reducer;