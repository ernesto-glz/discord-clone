import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import { hasFetchedEntities } from 'src/redux/states/meta';
import { LoadingScreen } from './loading-screen';

export const PrivateRoute = () => {
  const isLoggedIn = useAppSelector((s) => s.user.username);
  const fetchedEntities = useAppSelector(hasFetchedEntities);

  if (!isLoggedIn) return <Navigate to="/login" replace />;
  else if (!fetchedEntities) return <LoadingScreen />;

  return <Outlet />;
};
