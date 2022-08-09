import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { DisableButton } from '../styles';
import { Body, CancelButton, EditModalBase, Footer, Header } from './styles';
import { findError } from 'src/utils/errors';
import { FormInput } from 'src/components/views/elements/FormInput';
import { useDeleteAccount } from 'src/hooks/user/useDeleteAccount';
import Modal from '../../modal';

export const DeleteAccount: React.FC = () => {
  const { onSubmit, errors, register, handleClose } = useDeleteAccount();
  const user = useAppSelector((s) => s.auth.user);

  return user ? (
    <Modal name="DeleteAccount" background={true}>
      <form onSubmit={onSubmit}>
        <EditModalBase>
          <Header>
            <div className="title">Delete Account</div>
            <div className="description delete">
              Are you sure that you want to delete your account? This will
              immediately log you out of your account and you will not be able
              to log in again.
            </div>
          </Header>
          <Body>
            <FormInput
              error={findError(errors, 'PASSWORD')}
              {...register('password')}
              title="Password"
              type="password"
            />
          </Body>
          <Footer>
            <CancelButton type='button' onClick={handleClose} className="button">
              Cancel
            </CancelButton>
            <DisableButton type="submit" className="button">
              Delete
            </DisableButton>
          </Footer>
        </EditModalBase>
      </form>
    </Modal>
  ) : null;
};
