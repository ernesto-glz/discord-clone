import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import {
  Body,
  CancelButton,
  CloseButton,
  CloseIcon,
  DoneButton,
  EditModalBase,
  Footer,
  Header,
} from './styles';
import { PulseLoader } from 'react-spinners';
import { findError } from 'src/utils/errors';
import { useChangePassword } from 'src/hooks/user/useChangePassword';
import { FormInput } from 'src/components/UI/input/form-input';
import Modal from '../../modal';

export const ChangePassword: React.FC = () => {
  const { onSubmit, errors, loading, register, handleClose } = useChangePassword();
  const user = useAppSelector((s) => s.auth.user);

  return user ? (
    <Modal background={true} name="ChangePassword">
      <form onSubmit={onSubmit}>
        <EditModalBase>
          <Header>
            <div className="title">Update your Password</div>
            <div className="description">
              Enter your current password and a new password.
            </div>
            <CloseButton type="button" onClick={handleClose}>
              <CloseIcon className="closeIcon" />
            </CloseButton>
          </Header>
          <Body>
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
          </Body>
          <Footer>
            <CancelButton
              type="button"
              className="button"
              onClick={handleClose}
            >
              Cancel
            </CancelButton>
            {loading ? (
              <DoneButton className="button" disabled>
                <PulseLoader color="white" size={5} />
              </DoneButton>
            ) : (
              <DoneButton type="submit" className="button">
                Done
              </DoneButton>
            )}
          </Footer>
        </EditModalBase>
      </form>
    </Modal>
  ) : null;
};
