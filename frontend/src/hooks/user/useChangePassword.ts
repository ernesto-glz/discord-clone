import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/redux/hooks';
import { ErrorObject } from 'src/utils/errors';
import { actions as ui } from 'src/redux/states/ui';
import { changePassword } from 'src/redux/states/auth';

export interface ChangePassword {
  currentPassword: string;
  newPassword: string;
  newPasswordConfirm: string;
}

export const useChangePassword = () => {
  const { handleSubmit, register, getValues, reset } = useForm<ChangePassword>();
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [loading, setLoading] = useState(false);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setErrors([]);
    setLoading(false);
    reset();
    dispatch(ui.closedModal('ChangePassword'));
  };

  const onSubmit = handleSubmit(() => {
    const { currentPassword, newPassword, newPasswordConfirm } = getValues();

    if (newPassword !== newPasswordConfirm)
      return setErrors([
        { code: 'PWD_NOT_MATCH', message: 'Password do not match!' },
      ]);

    setLoading(true);
    dispatch(changePassword({ currentPassword, newPassword }));
  });

  useEffect(() => {
    const onSuccess = () => handleClose();
    const onFailure = (errors: ErrorObject[]) => {
      setLoading(false);
      setErrors(errors);
    };

    events.on('CHANGE_PASSWORD_SUCCEEDED', onSuccess);
    events.on('CHANGE_PASSWORD_FAILED', onFailure);

    return () => {
      events.off('CHANGE_PASSWORD_SUCCEEDED', onSuccess);
      events.off('CHANGE_PASSWORD_FAILED', onFailure);
    };
  }, []);

  return { onSubmit, errors, register, loading, handleClose };
};
