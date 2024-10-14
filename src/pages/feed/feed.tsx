import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getFeeds } from '../../services/feedSlice';
import { AppDispatch, RootState, useSelector } from '../../services/store';

export const Feed: FC = () => {
  /** TODO: взять переменную из стора DONE*/
  const dispatch: AppDispatch = useDispatch();
  const orders = useSelector((state: RootState) => state.feed.orders);

  useEffect(() => {
    dispatch(getFeeds());
  }, []);

  if (!orders.length) {
    return <Preloader />;
  }

  return <FeedUI orders={orders} handleGetFeeds={() => {}} />;
};
