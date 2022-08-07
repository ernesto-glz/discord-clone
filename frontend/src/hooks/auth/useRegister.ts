import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/redux/hooks';
import { registerUser } from 'src/redux/states/auth';

export interface Register {
  email: string;
  username: string;
  password: string;
}

export const useRegister = () => {
  const { handleSubmit, register, getValues } = useForm<Register>();
  const [errors, setErrors] = useState([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(() => {
    const { username, email, password } = getValues();
    setLoading(true);
    dispatch(registerUser({ username, password, email }));
  });

  useEffect(() => {
    events.on('REGISTER_FAILED', (e) => {
      setErrors(e);
      setLoading(false);
    });
    return () => {
      events.off('REGISTER_FAILED', () => {});
    };
  }, []);

  return { onSubmit, errors, loading, register };
};
