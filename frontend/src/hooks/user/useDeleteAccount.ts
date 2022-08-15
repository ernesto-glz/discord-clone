import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useAppDispatch } from 'src/store/hooks';
import { deleteAccount } from 'src/store/states/auth';
import { actions as ui } from 'src/store/states/ui';
import { ErrorObject } from 'src/utils/errors';

export interface DeleteAccount {
  password: string;
}

export const useDeleteAccount = () => {
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const { handleSubmit, register, getValues } = useForm<DeleteAccount>();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(ui.closedModal('DeleteAccount'));
  };

  const onSubmit = handleSubmit(() => {
    const { password } = getValues();
    dispatch(deleteAccount({ password }));
  });

  useEffect(() => {
    const onFail = (errs: ErrorObject[]) => {
      setErrors(errs);
    };
    events.on('ACCOUNT_DELETE_FAILED', onFail);

    return () => {
      events.off('ACCOUNT_DELETE_FAILED', onFail);
    };
  }, []);

  return { register, onSubmit, errors, handleClose };
};
