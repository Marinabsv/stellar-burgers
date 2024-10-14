import { getFeedsApi } from '@api';
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TOrder, TOrdersData } from '@utils-types';

type TFeedState = {
  orders: TOrder[];
  total: number;
  totalToday: number;
  loading: boolean;
  error?: string | null;
};

const initialState: TFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  loading: false,
  error: null
};

export const getFeeds = createAsyncThunk<TOrdersData>(
  'feed/getFeed',
  async () => await getFeedsApi()
);

export const feedsSlice = createSlice({
  name: 'feed',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeeds.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeeds.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(getFeeds.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload.orders;
        state.total = action.payload.total;
        state.totalToday = action.payload.totalToday;
      });
  }
});

export const feedActions = feedsSlice.actions;

export default feedsSlice.reducer;
