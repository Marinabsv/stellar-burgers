import { getOrderByNumberApi, getOrdersApi } from '../utils/burger-api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder } from '../utils/types';

type TOrderDataState = {
  order: TOrder | null;
  loading: boolean;
  error?: string | null;
};

export const initialState: TOrderDataState = {
  order: null,
  loading: false,
  error: null
};

export const getOrderData = createAsyncThunk<TOrder, number>(
  'order/getOrder',
  async (number: number) => {
    const response = await getOrderByNumberApi(number);
    return response.orders[0];
  }
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
      .addCase(
        getOrderData.fulfilled,
        (state, action: PayloadAction<TOrder>) => {
          state.loading = false;
          state.order = action.payload;
        }
      );
  }
});

export const orderActions = orderDataSlice.actions;

export const orderReducer = orderDataSlice.reducer;
