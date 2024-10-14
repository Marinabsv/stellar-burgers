import { getOrderByNumberApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TOrder } from '@utils-types';

type TOrderDataState = {
  order: TOrder | null;
  loading: boolean;
  error?: string | null;
};

const initialState: TOrderDataState = {
  order: null,
  loading: false,
  error: null
};

export const getOrderData = createAsyncThunk(
  'orderData/getOrderData',
  async (number: number) => await getOrderByNumberApi(number)
);

export const orderDataSlice = createSlice({
  name: 'orderData',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getOrderData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getOrderData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getOrderData.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload.orders[0];
      });
  }
});

export const orderActions = orderDataSlice.actions;

export default orderDataSlice.reducer;
