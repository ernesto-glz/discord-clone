import { FormEvent, useState } from 'react';
import { useDispatch } from 'react-redux';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { UserCredentials } from 'src/models/user.model';
import { logIn } from 'src/redux/states/user';
import { RegisterService } from 'src/services/auth.service';

const useRegister = ({ username, email, password }: UserCredentials) => {
  const { callEndpoint } = useFetchAndLoad();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({
    username: null,
    email: null,
    password: null
  });
  const dispatch = useDispatch();

  const handleRegister = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      const { data } = await callEndpoint(
        RegisterService({ username, email, password })
      );
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
        let errorsFound = { username: null, email: null, password: null };

        for (const err of requestErrors) {
          if (err.param === 'username') {
            errorsFound = { ...errorsFound, username: err.msg };
          }
          if (err.param === 'password') {
            errorsFound = { ...errorsFound, password: err.msg };
          }
          if (err.param === 'email') {
            errorsFound = { ...errorsFound, email: err.msg };
          }
          if (err.msg === 'User already exists') {
            errorsFound = {
              username: err.msg,
              email: err.msg,
              password: err.msg
            };
          }
        }
        setErrors(errorsFound);
      }
    }
  };

  return { handleRegister, errors, loading };
};

export default useRegister;
