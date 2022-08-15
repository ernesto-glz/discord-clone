import React from 'react';
import { useAppSelector } from 'src/store/hooks';
import { PulseLoader } from 'react-spinners';
import { findError } from 'src/utils/errors';
import { useChangePassword } from 'src/hooks/user/useChangePassword';
import { FormInput } from 'src/components/views/elements/FormInput';
import { ModalBuilder } from '../ModalBuilder';

export const ChangePassword: React.FC = () => {
  const { onSubmit, errors, loading, register, handleClose } = useChangePassword();
  const user = useAppSelector((s) => s.auth.user);

  return user ? (
    <ModalBuilder
      name="ChangePassword"
      background={true}
      closeButton={true}
      formHandler={onSubmit}
      header={
        <React.Fragment>
          <div className="title">Update your Password</div>
          <div className="description">
            Enter your current password and a new password.
          </div>
        </React.Fragment>
      }
      body={
        <React.Fragment>
          <FormInput
            error={findError(errors, 'CURRENT_PWD')}
            {...register('currentPassword')}
            title="Current password"
          />
          <FormInput
            error={findError(errors, 'NEW_PWD')}
            {...register('newPassword')}
            title="New password"
          />
          <FormInput
            error={findError(errors, 'CONFIRM_PWD')}
            {...register('newPasswordConfirm')}
            title="Confirm new password"
          />
        </React.Fragment>
      }
      footer={
        <React.Fragment>
          <button
            type="button"
            className="transparent-button"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="button contained-button"
            disabled={loading}
          >
            {loading ? <PulseLoader color="white" size={5} /> : 'Done'}
          </button>
        </React.Fragment>
      }
    />
  ) : null;
};
