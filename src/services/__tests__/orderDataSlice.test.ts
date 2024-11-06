import { getOrderData, initialState, orderReducer } from '../orderDataSlice';
import { describe, expect, test } from '@jest/globals';
import { mockFeeds } from './feedSlice.test';

describe('тесты  getOrderData', () => {
  test('тест getOrderData.pending', () => {
    const action = { type: getOrderData.pending.type };
    const state = orderReducer(initialState, action);
    expect(state.loading).toEqual(true);
  });

  test('тест getOrderData.rejected', () => {
    const action = {
      type: getOrderData.rejected.type,
      error: { message: 'ошибка' }
    };
    const state = orderReducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual('ошибка');
  });

  test('тест getOrderData.fulfilled', () => {
    const action = {
      type: getOrderData.fulfilled.type,
      payload: mockFeeds.orders
    };
    const state = orderReducer(initialState, action);
    expect(state.order).toEqual(mockFeeds.orders);
    expect(state.loading).toEqual(false);
  });
});
