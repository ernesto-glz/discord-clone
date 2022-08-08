import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import { token } from 'src/utils/utils';
import { LoadingScreen } from './views/LoadingScreen';

export const PrivateRoute = () => {
  const { user, attemptedLogin } = useAppSelector((s) => s.auth);
  const fetchedEntities = useAppSelector((s) => s.meta.fetchedEntities);

  if (!user && attemptedLogin || !token()) return <Navigate to="/login" replace />;
  else if (!user || !fetchedEntities) return <LoadingScreen />;

  return (
    <Outlet />
  );
};
