import { configureStore } from '@reduxjs/toolkit';

import {
  TypedUseSelectorHook,
  useDispatch as dispatchHook,
  useSelector as selectorHook
} from 'react-redux';
import { ingredientsSlice } from './ingredientsSlice';
import { userSlice } from './userSlice';
import { feedsSlice } from './feedSlice';
import { orderDataSlice } from './orderDataSlice';
import { constructorItemsSlice } from './constructorSlice';
import { profileOrdersSlice } from './profileOrdersSlice';

const rootReducer = {
  [userSlice.name]: userSlice.reducer,
  [ingredientsSlice.name]: ingredientsSlice.reducer,
  [feedsSlice.name]: feedsSlice.reducer,
  [orderDataSlice.name]: orderDataSlice.reducer,
  [constructorItemsSlice.name]: constructorItemsSlice.reducer,
  [profileOrdersSlice.name]: profileOrdersSlice.reducer
}; 

const store = configureStore({
  reducer: rootReducer,
  devTools: process.env.NODE_ENV !== 'production'
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useDispatch: () => AppDispatch = () => dispatchHook();
export const useSelector: TypedUseSelectorHook<RootState> = selectorHook;

export default store;
