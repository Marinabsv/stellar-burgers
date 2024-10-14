import { FC, useMemo } from 'react';

import { BurgerConstructorUI } from '@ui';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom';

import {
  constructor,
  constructorActions
} from '../../services/constructorSlice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные DONE constructorItems, orderRequest и orderModalData из стора */

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const constructorItems = useSelector(
    (state: RootState) => state.constructorItems
  );
  const { user } = useSelector((state: RootState) => state.user);
  const orderModalData = useSelector(
    (state: RootState) => state.constructorItems.orderModalData
  );
  const orderRequest = useSelector(
    (state: RootState) => state.constructorItems.orderRequest
  );
  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;
    if (!user) {
      navigate('/login');
    } else {
      const id = [
        constructorItems.bun._id,
        ...constructorItems.ingredients.map((ingredient) => ingredient._id),
        constructorItems.bun._id
      ];
      dispatch(constructor(id));
    }
  };

  const closeOrderModal = () => {
    dispatch(constructorActions.resetOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      (constructorItems?.ingredients
        ? constructorItems.ingredients
            .map((item) => item.price)
            .reduce((s, v) => s + v, 0)
        : 0),
    [constructorItems]
  );

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
