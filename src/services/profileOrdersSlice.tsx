import { getOrdersApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderDataState = {
  orders: TOrder[];
  loading: boolean;
  error?: string | null;
};

const initialState: TOrderDataState = {
  orders: [],
  loading: false,
  error: null
};

export const getOrders = createAsyncThunk(
  'orders/getOrders',
  async () => await getOrdersApi()
);

export const profileOrdersSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      });
  }
});

export const profileOrdersActions = profileOrdersSlice.actions;
export default profileOrdersSlice.reducer;
