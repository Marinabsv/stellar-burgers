import { TConstructorIngredient, TIngredient } from '@utils-types';
import { describe, expect, test } from '@jest/globals';
import {
  TConstuctorState,
  constructorActions,
  constructorReducer,
  initialState
} from '../constructorSlice';

describe('burgerConstructorSlice', () => {
  const mockIngredient: TIngredient = {
    _id: '643d69a5c3f7b9001cfa0945',
    name: 'Соус с шипами Антарианского плоскоходца',
    type: 'sauce',
    proteins: 101,
    fat: 99,
    carbohydrates: 100,
    calories: 100,
    price: 88,
    image: 'https://code.s3.yandex.net/react/code/sauce-01.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/sauce-01-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/sauce-01-large.png'
  };

  const bunIngredient: TIngredient = {
    _id: '643d69a5c3f7b9001cfa093c',
    name: 'Краторная булка N-200i',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: 'https://code.s3.yandex.net/react/code/bun-02.png',
    image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png',
    image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png'
  };

  const constructorIngredient: TConstructorIngredient = {
    ...mockIngredient,
    id: '6'
  };

  const firstIngredient: TConstructorIngredient = {
    ...mockIngredient,
    id: '1'
  };

  const secondIngredient: TConstructorIngredient = {
    ...mockIngredient,
    id: '2'
  };

  const initialNewState: TConstuctorState = {
    ...initialState,
    ingredients: [firstIngredient, secondIngredient]
  };

  test('тест: добавить ингредиент', () => {
    const state = constructorReducer(
      initialState,
      constructorActions.addItems(mockIngredient)
    );

    expect(state.ingredients[0]).toEqual(
      expect.objectContaining({
        ...mockIngredient
      })
    );
  });

  test('тест: добавить булку', () => {
    const state = constructorReducer(
      initialState,
      constructorActions.addItems(bunIngredient)
    );
    expect(state.bun).toEqual(expect.objectContaining(bunIngredient));
  });

  test('тест: удалить ингредиент', () => {
    const newState: TConstuctorState = {
      ...initialState,
      ingredients: [constructorIngredient]
    };
    const action = constructorActions.removeItems(0);
    const state = constructorReducer(newState, action);
    expect(state.ingredients.length).toBe(0);
  });

  const stateUp = constructorReducer(
    initialNewState,
    constructorActions.moveUp(1)
  );

  test('тест: вверх', () => {
    expect(stateUp.ingredients[0]).toEqual(
      expect.objectContaining(secondIngredient)
    );
    expect(stateUp.ingredients[1]).toEqual(
      expect.objectContaining(firstIngredient)
    );
  });

  test('тест: вниз', () => {
    const stateDown = constructorReducer(
      stateUp,
      constructorActions.moveDown(0)
    );
    expect(stateDown.ingredients[0]).toEqual(
      expect.objectContaining(firstIngredient)
    );
    expect(stateDown.ingredients[1]).toEqual(
      expect.objectContaining(secondIngredient)
    );
  });
});
