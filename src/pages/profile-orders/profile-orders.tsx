import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { RootState, useDispatch, useSelector } from '../../services/store';
import { getOrders } from '../../services/profileOrdersSlice';

export const ProfileOrders: FC = () => {
  /** TODO: взять переменную из стора DONE*/
  const dispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.orders.orders);

  useEffect(() => {
    dispatch(getOrders());
  }, []);

  return <ProfileOrdersUI orders={orders} />;
};
