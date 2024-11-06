import { describe, expect, test } from '@jest/globals';
import {
  checkUserAuth,
  initialState,
  login,
  logout,
  register,
  updateUser,
  userActions,
  userReducer
} from '../userSlice';

const mockUser = {
  name: 'mari',
  email: 'mari@mail.ru',
  password: 'password'
};

describe('user reducers', () => {
  test('тест authCheck', () => {
    const state = userReducer(initialState, userActions.authCheck());
    expect(state.isAuthChecked).toEqual(true);
  });
});

describe('user extra reducers', () => {
  test('тест register.pending', () => {
    const action = { type: register.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('тест register.rejected', () => {
    const action = {
      type: register.rejected.type,
      error: { message: 'ошибка' }
    };
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual('ошибка');
  });
  test('тест register.fulfilled', () => {
    const state = userReducer(
      initialState,
      register.fulfilled(mockUser, '', mockUser)
    );
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.loading).toEqual(false);
  });

  test('тест login.pending', () => {
    const action = { type: login.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('тест login.rejected', () => {
    const action = { type: login.rejected.type, error: { message: 'ошибка' } };
    const state = userReducer(initialState, action);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual('ошибка');
  });
  test('тест login.fulfilled', () => {
    const state = userReducer(
      initialState,
      login.fulfilled(mockUser, '', {
        email: 'mari@mail.ru',
        password: 'password'
      })
    );
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.loading).toEqual(false);
  });

  test('тест logout.pending', () => {
    const action = { type: logout.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('тест logout.rejected', () => {
    const action = { type: logout.rejected.type, error: { message: 'ошибка' } };
    const state = userReducer(initialState, action);
    expect(state.loading).toEqual(false);
    expect(state.error).toEqual('ошибка');
  });
  test('тест logout.fulfilled', () => {
    const action = {
      type: logout.fulfilled.type
    };
    const state = userReducer(initialState, action);
    expect(state).toEqual(initialState);
    expect(state.loading).toEqual(false);
  });
  test('тест updateUser.pending', () => {
    const action = { type: updateUser.pending.type };
    const state = userReducer(initialState, action);
    expect(state).toEqual({ ...initialState, loading: true });
  });

  test('тест updateUser.rejected', () => {
    const action = { type: updateUser.rejected.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toEqual(false);
  });
  test('тест updateUser.fulfilled', () => {
    const action = {
      type: updateUser.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
    expect(state.isAuthChecked).toEqual(true);
    expect(state.loading).toEqual(false);
  });

  test('тест checkUserAuth.pending', () => {
    const action = { type: checkUserAuth.pending.type };
    const state = userReducer(initialState, action);
    expect(state.loading).toEqual(true);
  });
  test('тест checkUserAuth.fulfilled', () => {
    const action = {
      type: checkUserAuth.fulfilled.type,
      payload: { user: mockUser }
    };
    const state = userReducer(initialState, action);
    expect(state.user).toEqual(mockUser);
  });
});
