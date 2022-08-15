import { Navigate } from 'react-router-dom';
import { useAppDispatch } from 'src/store/hooks';
import { logoutUser } from 'src/store/states/auth';

const LogoutPage: React.FunctionComponent = () => {
  useAppDispatch()(logoutUser());

  return <Navigate to="/login" />;
}

export default LogoutPage;
