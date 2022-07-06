import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import { LoadingScreen } from './loading-screen';

export const PrivateRoute = () => {
  const user = useAppSelector((s) => s.auth.user);
  const attemptedLogin = useAppSelector((s) => s.auth.attemptedLogin);
  const fetchedEntities = useAppSelector((s) => s.meta.fetchedEntities);

  if (!user && attemptedLogin) return <Navigate to="/login" replace />;
  else if (!user || !fetchedEntities) return <LoadingScreen />;

  return (
    <Outlet />
  );
};
