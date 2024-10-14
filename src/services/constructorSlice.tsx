import { orderBurgerApi } from '@api';
import {
  createAsyncThunk,
  createSlice,
  nanoid,
  PayloadAction
} from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient, TOrder } from '@utils-types';

type TConstuctorState = {
  bun: TConstructorIngredient | null;
  ingredients: TConstructorIngredient[];
  orderRequest: boolean;
  orderModalData: TOrder | null;
};

const initialState: TConstuctorState = {
  bun: null,
  ingredients: [],
  orderRequest: false,
  orderModalData: null
};

export const constructor = createAsyncThunk<TOrder, string[]>(
  'constructor/orderBurger',
  async (ingredients) => {
    const response = await orderBurgerApi(ingredients);
    return response.order;
  }
);

export const constructorItemsSlice = createSlice({
  name: 'constructorItems',
  initialState,
  reducers: {
    addItems: {
      reducer: (
        state: TConstuctorState,
        action: PayloadAction<TConstructorIngredient>
      ) => {
        if (action.payload.type === 'bun') {
          state.bun = action.payload;
        } else {
          state.ingredients.push(action.payload);
        }
      },
      prepare: (items: TIngredient) => ({
        payload: { ...items, id: nanoid() }
      })
    },
    removeItems: (state, action: PayloadAction<number>) => {
      state.ingredients.splice(action.payload, 1);
    },
    moveUp: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      const ingredient = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index - 1];
      state.ingredients[index - 1] = ingredient;
    },
    moveDown: (state, action: PayloadAction<number>) => {
      const index = action.payload;

      const ingredient = state.ingredients[index];
      state.ingredients[index] = state.ingredients[index + 1];
      state.ingredients[index + 1] = ingredient;
    },
    resetOrder: () => initialState
  },
  extraReducers: (builder) => {
    builder
      .addCase(constructor.pending, (state) => {
        state.orderRequest = true;
      })
      .addCase(constructor.fulfilled, (state, action) => {
        state.orderModalData = action.payload;
        state.bun = initialState.bun;
        state.ingredients = initialState.ingredients;
        state.orderRequest = false;
      })
      .addCase(constructor.rejected, (state) => {
        state.orderRequest = false;
      });
  }
});

export const constructorActions = constructorItemsSlice.actions;
export default constructorItemsSlice.reducer;
