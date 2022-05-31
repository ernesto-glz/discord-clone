import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { UserState } from 'src/models/user.model';

export const ProtectedRoute = () => {
  const isLoggedIn = useSelector((state: UserState) => state.user.token);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
