import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { UserCredentials } from 'src/models/user.model';
import { logIn } from 'src/redux/states/user';
import { LoginService } from 'src/services/auth.service';

const useLogin = ({ email, password }: UserCredentials) => {
  const { callEndpoint } = useFetchAndLoad();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({ email: null, password: null });
  const dispatch = useDispatch();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await callEndpoint(LoginService({ email, password }));
      dispatch(
        logIn({
          id: data.user._id,
          username: data.user.username,
          shortId: data.user.shortId,
          email: data.user.email,
          token: data.token,
          avatar: data.user.avatar
        })
      );
      window.location.assign('/channels/@me');
    } catch (error: any) {
      setLoading(false);
      const {
        data: { errors: requestErrors }
      } = error.response;

      if (requestErrors?.length) {
        let errorsFound = { email: null, password: null };

        for (const err of requestErrors) {
          if (err.param === 'email') {
            errorsFound = { ...errorsFound, email: err.msg };
          }
          if (err.param === 'password') {
            errorsFound = { ...errorsFound, password: err.msg };
          }
          if (err.msg === 'Username or password incorrect') {
            errorsFound = { email: err.msg, password: err.msg };
          }
        }
        setErrors(errorsFound);
        return;
      }

      setErrors({
        email: error?.response?.data,
        password: error?.response?.data
      });
    }
  };

  return { handleLogin, errors, loading };
};

export default useLogin;
