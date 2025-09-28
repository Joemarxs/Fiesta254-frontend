import { createSlice, PayloadAction } from '@reduxjs/toolkit';
export interface Payment {
  id: string;
  bookingId: string;
  eventId: string;
  userId: string;
  amount: number;
  paymentMethod: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  transactionId: string;
  date: string;
}
interface PaymentsState {
  payments: Payment[];
  currentPayment: Payment | null;
  isLoading: boolean;
  error: string | null;
}
// Mock payments data
const initialPayments: Payment[] = [{
  id: '1',
  bookingId: '1',
  eventId: '1',
  userId: '2',
  amount: 299.98,
  paymentMethod: 'credit_card',
  status: 'completed',
  transactionId: 'txn_123456789',
  date: '2023-06-28'
}, {
  id: '2',
  bookingId: '2',
  eventId: '3',
  userId: '2',
  amount: 129.99,
  paymentMethod: 'paypal',
  status: 'completed',
  transactionId: 'txn_987654321',
  date: '2023-07-15'
}, {
  id: '3',
  bookingId: '3',
  eventId: '8',
  userId: '1',
  amount: 70.0,
  paymentMethod: 'credit_card',
  status: 'completed',
  transactionId: 'txn_456789123',
  date: '2023-07-20'
}, {
  id: '4',
  bookingId: '4',
  eventId: '6',
  userId: '3',
  amount: 15.0,
  paymentMethod: 'credit_card',
  status: 'completed',
  transactionId: 'txn_789123456',
  date: '2023-06-01'
}, {
  id: '5',
  bookingId: '5',
  eventId: '5',
  userId: '1',
  amount: 25.0,
  paymentMethod: 'paypal',
  status: 'completed',
  transactionId: 'txn_654321987',
  date: '2023-07-10'
}];
const initialState: PaymentsState = {
  payments: initialPayments,
  currentPayment: null,
  isLoading: false,
  error: null
};
export const paymentsSlice = createSlice({
  name: 'payments',
  initialState,
  reducers: {
    setPayments: (state, action: PayloadAction<Payment[]>) => {
      state.payments = action.payload;
    },
    addPayment: (state, action: PayloadAction<Payment>) => {
      state.payments.push(action.payload);
    },
    updatePayment: (state, action: PayloadAction<{
      id: string;
      payment: Partial<Payment>;
    }>) => {
      const {
        id,
        payment
      } = action.payload;
      const index = state.payments.findIndex(p => p.id === id);
      if (index !== -1) {
        state.payments[index] = {
          ...state.payments[index],
          ...payment
        };
      }
    },
    refundPayment: (state, action: PayloadAction<string>) => {
      const index = state.payments.findIndex(p => p.id === action.payload);
      if (index !== -1) {
        state.payments[index].status = 'refunded';
      }
    },
    setCurrentPayment: (state, action: PayloadAction<Payment>) => {
      state.currentPayment = action.payload;
    },
    clearCurrentPayment: state => {
      state.currentPayment = null;
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
  setPayments,
  addPayment,
  updatePayment,
  refundPayment,
  setCurrentPayment,
  clearCurrentPayment,
  setLoading,
  setError
} = paymentsSlice.actions;
export default paymentsSlice.reducer;