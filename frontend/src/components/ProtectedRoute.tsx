import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import { hasFetchedEntities } from 'src/redux/states/meta';
import { selectUsername } from 'src/redux/states/user';
import { Loading } from './Loading';

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectUsername);
  const fetchedEntities = useAppSelector(hasFetchedEntities);

  if (!fetchedEntities) {
    return <Loading />;
  }

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
