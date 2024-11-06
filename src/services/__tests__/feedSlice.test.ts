import { describe, expect, test } from '@jest/globals';
import { feedReducer, getFeeds, initialState } from '../feedSlice';

export const mockFeeds = {
  orders: [
    {
      _id: '666',
      status: 'готов',
      name: 'бургер',
      createdAt: 'дата',
      updatedAt: 'дата',
      number: 666,
      ingredients: ['1', '2', '3']
    }
  ],
  total: 1,
  totalToday: 1,
  loading: false,
  error: null
};

describe('тесты  getFeeds', () => {
  test('тест getFeeds.pending', () => {
    const state = feedReducer(initialState, getFeeds.pending(''));
    expect(state.loading).toEqual(true);
  });

  test('тест getFeeds.rejected', () => {
    const action = {
      type: getFeeds.rejected.type,
      error: { message: 'ошибка' }
    };
    const state = feedReducer(initialState, action);

    expect(state.error).toEqual('ошибка');
  });

  test('тест getFeeds.fulfilled', () => {
    const action = { type: getFeeds.fulfilled.type, payload: mockFeeds };
    const state = feedReducer(initialState, action);

    expect(state.loading).toEqual(false);
    expect(state.orders).toEqual(mockFeeds.orders);
    expect(state.total).toEqual(mockFeeds.total);
    expect(state.totalToday).toEqual(mockFeeds.totalToday);
  });
});
