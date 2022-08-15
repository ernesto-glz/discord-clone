import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/store/hooks';
import { loginUser } from 'src/store/states/auth';
import { ErrorObject } from 'src/utils/errors';

export interface Login {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { handleSubmit, register, getValues } = useForm<Login>();
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(() => {
    const { email, password } = getValues();
    setLoading(true);
    dispatch(loginUser({ email, password }));
  });

  useEffect(() => {
    events.on('LOGIN_FAILED', (errs: ErrorObject[]) => {
      setErrors(errs);
      setLoading(false);
    });

    return () => {
      events.off('LOGIN_FAILED', () => {});
    };
  }, []);

  return { onSubmit, errors, loading, register };
};
