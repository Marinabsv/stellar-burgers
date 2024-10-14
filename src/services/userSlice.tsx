import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  updateUserApi,
  TRegisterData
} from '../utils/burger-api';
import { setCookie } from '../utils/cookie';
import { deleteCookie } from '../utils/cookie';
import { TUser } from '@utils-types';

interface TUserState {
  isAuthChecked: boolean;
  user: TUser | null;
  loading: boolean;
  error?: string | null;
}

const initialState: TUserState = {
  isAuthChecked: false,
  user: null,
  loading: false,
  error: null
};

export const register = createAsyncThunk<
  TUser,
  { name: string; email: string; password: string }
>('user/registerUser', async (user) => {
  const data = await registerUserApi(user);
  return data.user;
});

export const login = createAsyncThunk(
  'user/loginUser',
  async ({ email, password }: Omit<TRegisterData, 'name'>) => {
    const data = await loginUserApi({ email, password });
    setCookie('accessToken', data.accessToken);
    localStorage.setItem('refreshToken', data.refreshToken);
    return data.user;
  }
);

export const logout = createAsyncThunk('user/logoutUser', async () => {
  logoutApi().then(() => {
    localStorage.clear();
    deleteCookie('accessToken');
  });
});

export const checkUserAuth = createAsyncThunk('user/checkUserAuth', async () =>
  getUserApi()
);

export const updateUser = createAsyncThunk(
  'user/updateApi',
  async (user: Partial<TRegisterData>) => updateUserApi(user)
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    authCheck: (state) => {
      state.isAuthChecked = true;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      });

    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
        state.isAuthChecked = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthChecked = true;
      });

    builder
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(logout.fulfilled, (state) => {
        state.loading = false;
        state.user = null;
      });
    builder
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        state.isAuthChecked = true;
        state.user = action.payload.user;
      })
      .addCase(updateUser.pending, (state) => {
        state.user = null;
        state.loading = true;
      })
      .addCase(updateUser.rejected, (state) => {
        state.loading = false;
      });
    builder
      .addCase(checkUserAuth.fulfilled, (state, action) => {
        state.user = action.payload.user;
      })
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
      });
  }
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
