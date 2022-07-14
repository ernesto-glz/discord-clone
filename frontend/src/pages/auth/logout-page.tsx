import { Navigate } from 'react-router-dom';
import { useAppDispatch } from 'src/redux/hooks';
import { logoutUser } from 'src/redux/states/auth';

const LogoutPage: React.FunctionComponent = () => {
  useAppDispatch()(logoutUser());

  return <Navigate to="/login" replace />;
}
 
export default LogoutPage;