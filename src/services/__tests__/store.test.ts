import { describe, expect, test } from '@jest/globals';
import { rootReducer } from '../store';
import { configureStore } from '@reduxjs/toolkit';

describe('тесты  rootReducer', () => {
  test(' rootReducer', () => {
    const store = configureStore({
      reducer: rootReducer
    });

    const state = rootReducer(undefined, { type: 'UNKNOWN_ACTION' });
    expect(state).toEqual(store.getState());
  });
});
