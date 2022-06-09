import { useSelector } from 'react-redux';
import { Navigate, Outlet } from 'react-router-dom';
import { selectToken } from 'src/redux/states/user';

export const ProtectedRoute = () => {
  const isLoggedIn = useSelector(selectToken);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};
