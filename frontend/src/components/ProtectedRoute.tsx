import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import { hasFetchedEntities } from 'src/redux/states/meta';
import { Loading } from './Loading';

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector((s) => s.user.username);
  const fetchedEntities = useAppSelector(hasFetchedEntities);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  if (!fetchedEntities) {
    return <Loading />;
  }

  return <Outlet />;
};
