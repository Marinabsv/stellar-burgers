import { describe, expect, test } from '@jest/globals';
import { mockFeeds } from './feedSlice.test';
import {
  getOrders,
  initialState,
  profileOrdersSlice
} from '../profileOrdersSlice';

describe('тесты  getOrderData', () => {
  test('тест getOrderData.pending', () => {
    const action = { type: getOrders.pending.type };
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.loading).toEqual(true);
  });

  test('тест getOrderData.rejected', () => {
    const action = {
      type: getOrders.rejected.type,
      error: { message: 'ошибка' }
    };
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual('ошибка');
  });

  test('тест getOrderData.fulfilled', () => {
    const action = {
      type: getOrders.fulfilled.type,
      payload: mockFeeds.orders
    };
    const state = profileOrdersSlice.reducer(initialState, action);
    expect(state.orders).toEqual(mockFeeds.orders);
    expect(state.loading).toEqual(false);
  });
});
