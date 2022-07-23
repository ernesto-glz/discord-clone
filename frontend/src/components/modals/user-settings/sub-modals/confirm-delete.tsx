import React, { useEffect, useState } from 'react';
import { useInputValue } from 'src/hooks/useInputValue';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { deleteAccount } from 'src/redux/states/auth';
import { actions as ui } from 'src/redux/states/ui';
import { Input } from 'src/styled-components/input.styled';
import { ErrorMessage } from 'src/styled-components/login-and-register';
import Modal from '../../modal';
import { DisableButton } from '../styles';
import {
  Body,
  BodyItem,
  CancelButton,
  EditModalBase,
  Footer,
  Header
} from './styles';
import events from 'src/services/event-service';

export const DeleteAccount: React.FC = () => {
  const [error, setError] = useState<string | null>(null);
  const password = useInputValue();
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(ui.closedModal('DeleteAccount'));
  };

  const accept = () => dispatch(deleteAccount({ password: password.value }));

  useEffect(() => {
    const onFail = (message: string) => {
      setError(message);
    };
    events.on('ACCOUNT_DELETE_FAILED', onFail);

    return () => {
      events.off('ACCOUNT_DELETE_FAILED', onFail);
    };
  }, []);

  return user ? (
    <Modal name="DeleteAccount" background={true} animated>
      <EditModalBase>
        <Header>
          <div className="title">Delete Account</div>
          <div className="description delete">
            Are you sure that you want to delete your account? This will
            immediately log you out of your account and you will not be able to
            log in again.
          </div>
        </Header>
        <Body>
          <BodyItem errorOcurred={error}>
            <h5>Password{error && <ErrorMessage>- {error}</ErrorMessage>}</h5>
            <Input {...password} type="password" />
          </BodyItem>
        </Body>
        <Footer>
          <CancelButton onClick={handleClose} className="button">
            Cancel
          </CancelButton>
          <DisableButton onClick={accept} className="button">
            Delete
          </DisableButton>
        </Footer>
      </EditModalBase>
    </Modal>
  ) : null;
};
