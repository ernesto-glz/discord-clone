import { LogIn, SignUp } from 'src/api/auth';
import { UserCredentials } from 'src/models/user.model';
import { loadAbort } from 'src/utils/load-abort-axios';

export const LoginService = ({ email, password }: UserCredentials) => {
  const controller = loadAbort();
  const credentials = { email, password };
  return {
    call: LogIn(credentials, controller),
    controller
  };
};

export const RegisterService = ({
  username,
  email,
  password
}: UserCredentials) => {
  const controller = loadAbort();
  const credentials = { username, password, email };
  return {
    call: SignUp(credentials, controller),
    controller
  };
};
