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
import { Input } from 'src/styled-components/input.styled';
import { useInputValue } from 'src/hooks/useInputValue';
import { changePassword } from 'src/redux/states/auth';
import { ErrorMessage } from 'src/styled-components/login-and-register';
import { PulseLoader } from 'react-spinners';

export const ChangePassword: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const user = useAppSelector((s) => s.auth.user);
  const currentPassword = useInputValue();
  const newPassword = useInputValue();
  const newPasswordConfirm = useInputValue();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setError(null);
    setLoading(false);
    currentPassword.reset();
    newPassword.reset();
    newPasswordConfirm.reset();
    dispatch(ui.closedModal('ChangePassword'));
  };

  const done = () => {
    if (newPassword.value !== newPasswordConfirm.value)
      return setError('Password do not match!');

    setLoading(true);
    dispatch(changePassword({
      currentPassword: currentPassword.value,
      newPassword: newPassword.value
    }));
  };

  useEffect(() => {
    const onSuccess = () => handleClose();
    const onFailure = (message: string) => {
      setLoading(false);
      setError(message);
    };

    events.on('CHANGE_PASSWORD_SUCCEEDED', onSuccess);
    events.on('CHANGE_PASSWORD_FAILED', onFailure);

    return () => {
      events.off('CHANGE_PASSWORD_SUCCEEDED', onSuccess);
      events.off('CHANGE_PASSWORD_FAILED', onFailure);
    };
  }, []);

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !loading)
      done();
  }

  return (user) ? (
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
          <BodyItem errorOcurred={error}>
            <h5>Current password{error && <ErrorMessage>- {error}</ErrorMessage>}</h5>
            <Input onKeyUp={onKeyUp} {...currentPassword} type="password" />
          </BodyItem>
          <BodyItem errorOcurred={error}>
            <h5>New password{error && <ErrorMessage>- {error}</ErrorMessage>}</h5>
            <Input onKeyUp={onKeyUp} {...newPassword} type="password" />
          </BodyItem>
          <BodyItem errorOcurred={error}>
            <h5>Confirm new password{error && <ErrorMessage>- {error}</ErrorMessage>}</h5>
            <Input onKeyUp={onKeyUp} {...newPasswordConfirm} type="password" />
          </BodyItem>
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
