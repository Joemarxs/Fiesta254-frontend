import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit'
import { createEvent as createEventService } from '../../../services/eventsService'
import useUserStore from '../../useUserStore' // for hostId if needed

interface TicketType {
  id: string
  name: string
  price: string
  discount: string
  description: string
  availableFrom?: string
  availableTo?: string
  maxQuantity?: number
}

// types/event.ts
export interface CreateEventPayload {
  hostId: string
  title: string
  description: string
  category: string
  date: string
  time: string
  endDate: string
  endTime: string
  location: string
  capacity: number
  images: {
    imageUrl: string
    isPrimary: boolean
  }[]
  ticket_types: {
    name: string
    price: string
    description: string
    discount: string
    availableFrom: string
    availableTo: string
    maxQuantity: number
  }[]
}


interface HostState {
  formData: {
    title: string
    description: string
    category: string
    date: string
    time: string
    endDate: string
    endTime: string
    location: string
    capacity: string | number
    images: string[]
  }
  ticketTypes: TicketType[]
  loading: boolean
  error: string | null
}

const initialState: HostState = {
  formData: {
    title: '',
    description: '',
    category: '',
    date: '',
    time: '',
    endDate: '',
    endTime: '',
    location: '',
    capacity: '',
    images: [],
  },
  ticketTypes: [
    { id: '1', name: 'Standard', price: '', discount: '0', description: 'Regular admission' },
  ],
  loading: false,
  error: null,
}

// Async thunk to call your service
export const submitEvent = createAsyncThunk(
  'host/submitEvent',
  async (_, { getState, rejectWithValue }) => {
    try {
      const state = getState() as { host: HostState; users: { currentUser: any } }
      const currentUser = state.users.currentUser

      if (!currentUser) {
        throw new Error('No user logged in')
      }

      const { formData, ticketTypes } = state.host

      const payload: CreateEventPayload = {
        hostId: currentUser.id,
        title: formData.title,
        description: formData.description,
        category: formData.category,
        date: formData.date,
        time: formData.time,
        endDate: formData.endDate,
        endTime: formData.endTime,
        location: formData.location,
        capacity: Number(formData.capacity),
        images: formData.images.map((url, index) => ({
          imageUrl: url,
          isPrimary: index === 0,
        })),
        ticket_types: ticketTypes.map(t => ({
          name: t.name,
          price: t.price,
          description: t.description,
          discount: t.discount,
          availableFrom: t.availableFrom || formData.date,
          availableTo: t.availableTo || formData.endDate,
          maxQuantity: t.maxQuantity || Number(formData.capacity),
        })),
      }

      return await createEventService(payload)
    } catch (err: any) {
      return rejectWithValue(err.response?.data || err.message || 'Failed to create event')
    }
  }
)

const hostSlice = createSlice({
  name: 'host',
  initialState,
  reducers: {
    setFormField: (state, action: PayloadAction<{ field: string; value: any }>) => {
      state.formData[action.payload.field as keyof typeof state.formData] = action.payload.value
    },
    addImage: (state, action: PayloadAction<string>) => {
      state.formData.images.push(action.payload)
    },
    removeImage: (state, action: PayloadAction<number>) => {
      state.formData.images = state.formData.images.filter((_, i) => i !== action.payload)
    },
    addTicketType: (state) => {
      state.ticketTypes.push({
        id: (state.ticketTypes.length + 1).toString(),
        name: '',
        price: '',
        discount: '0',
        description: '',
      })
    },
    updateTicketType: (state, action: PayloadAction<{ id: string; field: keyof TicketType; value: string | number }>) => {
      state.ticketTypes = state.ticketTypes.map(t =>
        t.id === action.payload.id ? { ...t, [action.payload.field]: action.payload.value } : t
      )
    },
    removeTicketType: (state, action: PayloadAction<string>) => {
      if (state.ticketTypes.length > 1) {
        state.ticketTypes = state.ticketTypes.filter(t => t.id !== action.payload)
      }
    },
    resetHostForm: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(submitEvent.pending, (state) => { state.loading = true; state.error = null })
      .addCase(submitEvent.fulfilled, (state) => { state.loading = false })
      .addCase(submitEvent.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  }
})

export const {
  setFormField,
  addImage,
  removeImage,
  addTicketType,
  updateTicketType,
  removeTicketType,
  resetHostForm,
} = hostSlice.actions

export default hostSlice.reducer
