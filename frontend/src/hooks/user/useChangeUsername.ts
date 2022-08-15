import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { ErrorObject } from 'src/utils/errors';
import { actions as ui } from 'src/store/states/ui';
import { changeUsername } from 'src/store/states/auth';

export interface ChangeUsername {
  newUsername: string;
  password: string;
}

export const useChangeUsername = () => {
  const { handleSubmit, register, getValues, reset } = useForm<ChangeUsername>();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setLoading(false);
    setErrors([]);
    reset();
    dispatch(ui.closedModal('EditUsername'));
  };

  const onSubmit = handleSubmit(() => {
    const { newUsername, password } = getValues();

    if (newUsername === user!.username && !password) {
      setLoading(true);
      setTimeout(() => handleClose(), 500);
      return;
    }

    setLoading(true);
    dispatch(changeUsername({ newUsername, password }));
  });

  useEffect(() => {
    const onSuccess = () => handleClose();
    const onFailure = (errors: ErrorObject[]) => {
      setLoading(false);
      setErrors(errors);
    };

    events.on('CHANGE_USERNAME_SUCCEEDED', onSuccess);
    events.on('CHANGE_USERNAME_FAILED', onFailure);

    return () => {
      events.off('CHANGE_USERNAME_SUCCEEDED', onSuccess);
      events.off('CHANGE_USERNAME_FAILED', onFailure);
    };
  }, []);

  return { onSubmit, handleClose, errors, loading, register };
};
