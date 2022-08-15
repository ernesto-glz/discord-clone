import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/store/hooks';
import { createRequest } from 'src/store/states/requests';

export interface AddFriend {
  target: string;
}

export interface Result {
  message: string | null;
  type: 'Success' | 'Error' | null;
}

export const useAddFriend = () => {
  const [result, setResult] = useState<Result>({
    message: null,
    type: null,
  });
  const { handleSubmit, register, getValues } = useForm<AddFriend>();
  const dispatch = useAppDispatch();

  const onSubmit = handleSubmit(() => {
    const { target } = getValues();

    if (!target.includes('#')) {
      return setResult({
        message: `We need asd's four digit tag so we know wich one they are.`,
        type: 'Error',
      });
    }

    const splitted = target.split('#');

    if (splitted[1].length < 4 || splitted[1].length > 4) {
      return setResult({ message: 'Invalid four digit tag.', type: 'Error' });
    }

    const payload = { username: splitted[0], discriminator: splitted[1] };
    dispatch(createRequest(payload));
  });

  const resetStatus = () => setResult({ message: null, type: null });

  useEffect(() => {
    events.on('REQUEST_CREATE_SUCCEEDED', (message) => {
      setResult({ message, type: 'Success' });
    });
    events.on('REQUEST_CREATE_FAILED', (message) => {
      setResult({ message, type: 'Error' });
    });

    return () => {
      events.off('REQUEST_CREATE_SUCCEEDED', () => {});
      events.off('REQUEST_CREATE_FAILED', () => {});
    };
  }, []);

  return { onSubmit, result, register, resetStatus, getValues };
};
