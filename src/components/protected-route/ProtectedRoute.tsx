import { Navigate, useLocation } from 'react-router-dom';
import { Preloader } from '../ui/preloader';
import { RootState, useSelector } from '../../services/store';

type ProtectedRouteProps = {
  children: React.ReactElement;
  unAuth?: boolean;
};

export const ProtectedRoute = ({ children, unAuth }: ProtectedRouteProps) => {
  const location = useLocation();
  const user = useSelector((state: RootState) => state.user.user);
  const isAuth = useSelector((state: RootState) => state.user.isAuthChecked);

  if (!isAuth) {
    return <Preloader />;
  }

  if (!unAuth && !user) {
    return (
      <Navigate
        to='/login'
        state={{
          from: { ...location }
        }}
      />
    );
  }

  if (unAuth && user) {
    const from = location.state?.from || { pathname: '/' };
    return <Navigate to={from} />;
  }

  return children;
};
