import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { findError } from 'src/utils/errors';
import { FormInput } from 'src/components/views/elements/FormInput';
import { useDeleteAccount } from 'src/hooks/user/useDeleteAccount';
import { ModalBuilder } from '../ModalBuilder';

export const DeleteAccount: React.FC = () => {
  const { onSubmit, errors, register, handleClose } = useDeleteAccount();
  const user = useAppSelector((s) => s.auth.user);

  return user ? (
    <ModalBuilder
      name="DeleteAccount"
      background={true}
      formHandler={onSubmit}
      header={
        <React.Fragment>
          <div className="title">Delete Account</div>
          <div className="description delete">
            Are you sure that you want to delete your account? This will
            immediately log you out of your account and you will not be able to
            log in again.
          </div>
        </React.Fragment>
      }
      body={
        <FormInput
          error={findError(errors, 'PASSWORD')}
          {...register('password')}
          title="Password"
          type="password"
        />
      }
      footer={
        <React.Fragment>
          <button
            type="button"
            onClick={handleClose}
            className="button transparent-button"
          >
            Cancel
          </button>
          <button
            type="submit"
            data-variant="danger"
            className="contained-button button"
          >
            Delete
          </button>
        </React.Fragment>
      }
    />
  ) : null;
};
