import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Modal from '../../modal';
import {
  Body,
  BodyItem,
  CancelButton,
  CloseButton,
  CloseIcon,
  DoneButton,
  EditModalBase,
  Footer,
  Header
} from './styles';
import { actions as ui } from 'src/redux/states/ui';
import { useInputValue } from 'src/hooks/useInputValue';
import { changePassword } from 'src/redux/states/auth';
import { PulseLoader } from 'react-spinners';
import { Input } from 'src/components/UI/input/input';
import { ErrorObject, findError } from 'src/utils/errors';

export const ChangePassword: React.FC = () => {
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const currentPassword = useInputValue();
  const newPassword = useInputValue();
  const newPasswordConfirm = useInputValue();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setErrors([]);
    setLoading(false);
    currentPassword.reset();
    newPassword.reset();
    newPasswordConfirm.reset();
    dispatch(ui.closedModal('ChangePassword'));
  };

  const done = () => {
    if (newPassword.value !== newPasswordConfirm.value)
      return setErrors([{ code: 'PWD_NOT_MATCH', message: 'Password do not match!' }]);

    setLoading(true);
    dispatch(changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    }));
  };

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

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading) done();
  };

  return user ? (
    <Modal background={true} name="ChangePassword" animated>
      <EditModalBase>
        <Header>
          <div className="title">Update your Password</div>
          <div className="description">
            Enter your current password and a new password.
          </div>
          <CloseButton onClick={handleClose}>
            <CloseIcon className="closeIcon" />
          </CloseButton>
        </Header>
        <Body>
          <Input
            onKeyUp={onKeyUp}
            error={findError(errors, 'CURRENT_PWD')}
            handler={currentPassword}
            title="Current password"
          />
          <Input
            onKeyUp={onKeyUp}
            error={findError(errors, 'NEW_PWD')}
            handler={newPassword}
            title="New password"
          />
          <Input
            onKeyUp={onKeyUp}
            error={findError(errors, 'CONFIRM_PWD')}
            handler={newPasswordConfirm}
            title="Confirm new password"
          />
        </Body>
        <Footer>
          <CancelButton className="button" onClick={handleClose}>
            Cancel
          </CancelButton>
          {loading ? (
            <DoneButton className="button" disabled>
              <PulseLoader color="white" size={5} />
            </DoneButton>
          ) : (
            <DoneButton className="button" onClick={done}>
              Done
            </DoneButton>
          )}
        </Footer>
      </EditModalBase>
    </Modal>
  ) : null;
};
