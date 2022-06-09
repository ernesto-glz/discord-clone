import { Navigate, Outlet } from 'react-router-dom';
import { useAppSelector } from 'src/redux/hooks';
import { selectUsername } from 'src/redux/states/user';

export const ProtectedRoute = () => {
  const isLoggedIn = useAppSelector(selectUsername);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
