import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { mockUsers } from '../../data/mockData';
import * as usersService from '../../services/usersService';
export interface User {
  id: string;
  name: string;
  email: string;
  profileImage: string;
  isHost: boolean;
  createdAt: string;
  bio?: string;
  phone?: string;
  location?: string;
}
interface UserWithPassword extends User {
  password: string;
}
interface UsersState {
  users: UserWithPassword[];
  currentUser: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
}
// Async thunks for API calls
export const registerUserAsync = createAsyncThunk('users/register', async (userData: {
  name: string;
  email: string;
  password: string;
}, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await usersService.registerUser(userData)
    // Mock implementation
    const existingUser = mockUsers.find(user => user.email === userData.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }
    const newUser = {
      id: `${mockUsers.length + 1}`,
      name: userData.name,
      email: userData.email,
      password: userData.password,
      profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
      isHost: false,
      createdAt: new Date().toISOString().split('T')[0]
    };
    const {
      password,
      ...safeUser
    } = newUser;
    return {
      user: safeUser,
      token: 'mock-token-123'
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const loginUserAsync = createAsyncThunk('users/login', async (credentials: {
  email: string;
  password: string;
}, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await usersService.loginUser(credentials)
    // Mock implementation
    const user = mockUsers.find(user => user.email === credentials.email && user.password === credentials.password);
    if (!user) {
      throw new Error('Invalid email or password');
    }
    const {
      password,
      ...safeUser
    } = user;
    return {
      user: safeUser,
      token: 'mock-token-123'
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const logoutUserAsync = createAsyncThunk('users/logout', async (_, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // await usersService.logoutUser()
    // Mock implementation
    return true;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const updateUserProfileAsync = createAsyncThunk('users/updateProfile', async (userData: Partial<User>, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await usersService.updateUserProfile(userData)
    // Mock implementation
    return userData;
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
export const becomeHostAsync = createAsyncThunk('users/becomeHost', async (_, {
  rejectWithValue
}) => {
  try {
    // Uncomment when ready to use actual API
    // return await usersService.becomeHost()
    // Mock implementation
    return {
      isHost: true
    };
  } catch (error: any) {
    return rejectWithValue(error.response?.data?.message || error.message);
  }
});
const initialState: UsersState = {
  users: mockUsers,
  currentUser: null,
  isAuthenticated: false,
  error: null,
  isLoading: false
};
export const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<UserWithPassword[]>) => {
      state.users = action.payload;
    },
    login: (state, action: PayloadAction<{
      email: string;
      password: string;
    }>) => {
      const {
        email,
        password
      } = action.payload;
      const user = state.users.find(user => user.email === email && user.password === password);
      if (user) {
        // Create a sanitized user object without the password
        const {
          password,
          ...safeUser
        } = user;
        state.currentUser = safeUser;
        state.isAuthenticated = true;
        state.error = null;
      } else {
        state.error = 'Invalid email or password';
      }
    },
    signup: (state, action: PayloadAction<{
      name: string;
      email: string;
      password: string;
    }>) => {
      const {
        name,
        email,
        password
      } = action.payload;
      const existingUser = state.users.find(user => user.email === email);
      if (existingUser) {
        state.error = 'Email already in use';
      } else {
        // Create new user
        const newUser = {
          id: `${state.users.length + 1}`,
          name,
          email,
          password,
          profileImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=880&q=80',
          isHost: false,
          createdAt: new Date().toISOString().split('T')[0]
        };
        state.users.push(newUser);
        const {
          password: _,
          ...safeUser
        } = newUser;
        state.currentUser = safeUser;
        state.isAuthenticated = true;
        state.error = null;
      }
    },
    logout: state => {
      state.currentUser = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    updateUserProfile: (state, action: PayloadAction<Partial<User>>) => {
      if (!state.currentUser) return;
      const userIndex = state.users.findIndex(user => user.id === state.currentUser?.id);
      if (userIndex !== -1) {
        state.users[userIndex] = {
          ...state.users[userIndex],
          ...action.payload
        };
        state.currentUser = {
          ...state.currentUser,
          ...action.payload
        };
      }
    },
    becomeHost: state => {
      if (!state.currentUser) return;
      const userIndex = state.users.findIndex(user => user.id === state.currentUser?.id);
      if (userIndex !== -1) {
        state.users[userIndex].isHost = true;
        if (state.currentUser) {
          state.currentUser.isHost = true;
        }
      }
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  },
  extraReducers: builder => {
    // Handle registerUserAsync
    builder.addCase(registerUserAsync.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(registerUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
      // In a real app, you would store the token in localStorage here
      // localStorage.setItem('authToken', action.payload.token)
    });
    builder.addCase(registerUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // Handle loginUserAsync
    builder.addCase(loginUserAsync.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(loginUserAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      state.currentUser = action.payload.user;
      state.isAuthenticated = true;
      // In a real app, you would store the token in localStorage here
      // localStorage.setItem('authToken', action.payload.token)
    });
    builder.addCase(loginUserAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // Handle logoutUserAsync
    builder.addCase(logoutUserAsync.fulfilled, state => {
      state.currentUser = null;
      state.isAuthenticated = false;
      // In a real app, you would remove the token from localStorage here
      // localStorage.removeItem('authToken')
    });
    // Handle updateUserProfileAsync
    builder.addCase(updateUserProfileAsync.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(updateUserProfileAsync.fulfilled, (state, action) => {
      state.isLoading = false;
      if (state.currentUser) {
        state.currentUser = {
          ...state.currentUser,
          ...action.payload
        };
        const userIndex = state.users.findIndex(user => user.id === state.currentUser?.id);
        if (userIndex !== -1) {
          state.users[userIndex] = {
            ...state.users[userIndex],
            ...action.payload
          };
        }
      }
    });
    builder.addCase(updateUserProfileAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
    // Handle becomeHostAsync
    builder.addCase(becomeHostAsync.pending, state => {
      state.isLoading = true;
      state.error = null;
    });
    builder.addCase(becomeHostAsync.fulfilled, state => {
      state.isLoading = false;
      if (state.currentUser) {
        state.currentUser.isHost = true;
        const userIndex = state.users.findIndex(user => user.id === state.currentUser?.id);
        if (userIndex !== -1) {
          state.users[userIndex].isHost = true;
        }
      }
    });
    builder.addCase(becomeHostAsync.rejected, (state, action) => {
      state.isLoading = false;
      state.error = action.payload as string;
    });
  }
});
export const {
  setUsers,
  login,
  signup,
  logout,
  updateUserProfile,
  becomeHost,
  setError,
  setLoading
} = usersSlice.actions;
export default usersSlice.reducer;