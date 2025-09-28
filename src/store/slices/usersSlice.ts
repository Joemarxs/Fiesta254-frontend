import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import * as usersService from '../../services/usersService';

// Define User interface
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage?: string;
  isHost: boolean;
  createdAt: string;
  bio?: string;
  phone?: string;
  location?: string;
}

interface UsersState {
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}

// Async thunks using real backend
export const registerUserAsync = createAsyncThunk(
  'users/register',
  async (
    userData: { name: string; email: string; password: string; password_confirm: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await usersService.registerUser(userData);
      // save token immediately
      localStorage.setItem('authToken', response.token);
      return response; // { user, token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const loginUserAsync = createAsyncThunk(
  'users/login',
  async (
    credentials: { email: string; password: string },
    { rejectWithValue }
  ) => {
    try {
      const response = await usersService.loginUser(credentials);
      // save token immediately
      localStorage.setItem('authToken', response.token);
      return response; // { user, token }
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const logoutUserAsync = createAsyncThunk(
  'users/logout',
  async (_, { rejectWithValue }) => {
    try {
      await usersService.logoutUser();
      return true;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const updateUserProfileAsync = createAsyncThunk(
  'users/updateProfile',
  async (userData: Partial<User>, { rejectWithValue }) => {
    try {
      const response = await usersService.updateUserProfile(userData);
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

export const becomeHostAsync = createAsyncThunk(
  'users/becomeHost',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersService.becomeHost();
      return response;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// New thunk: Get current user
export const getCurrentUserAsync = createAsyncThunk(
  'users/getCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await usersService.getCurrentUser();
      return response; // should return user object
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || error.message);
    }
  }
);

// --- Initial state hydrates from localStorage ---
const initialState: UsersState = {
  currentUser: null,
  isAuthenticated: !!localStorage.getItem('authToken'),
  error: null,
  isLoading: false,
};

export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    },
    clearUser: (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
      localStorage.removeItem('authToken');
    },
  },
  extraReducers: (builder) => {
    // --- Register ---
    builder.addCase(registerUserAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // --- Login ---
    builder.addCase(loginUserAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // --- Logout ---
    builder.addCase(logoutUserAsync.fulfilled, (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    });
    builder.addCase(logoutUserAsync.rejected, (state) => {
      state.currentUser = null;
      state.isAuthenticated = false;
      localStorage.removeItem('authToken');
    });

    // --- Update Profile ---
    builder.addCase(updateUserProfileAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfileAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.currentUser) {
        state.currentUser = { ...state.currentUser, ...action.payload };
      }
    });
    builder.addCase(updateUserProfileAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // --- Become Host ---
    builder.addCase(becomeHostAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(becomeHostAsync.fulfilled, (state) => {
      state.isLoading = false;
      if (state.currentUser) {
        state.currentUser.isHost = true;
      }
    });
    builder.addCase(becomeHostAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });

    // --- Get Current User ---
    builder.addCase(getCurrentUserAsync.pending, (state) => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(getCurrentUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload;
      state.isAuthenticated = true;
    });
    builder.addCase(getCurrentUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      const msg = action.payload as string;
      // Ignore 401 Unauthorized gracefully
      if (msg?.toString().includes('401') || msg?.toLowerCase().includes('unauthorized')) {
        state.error = null;
      } else {
        state.error = msg;
      }
    });
  },
});

export const { setError, setLoading, clearUser } = usersSlice.actions;
export default usersSlice.reducer;
