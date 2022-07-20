import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Modal from '../../modal';
import {
  CloseIcon,
  EditModalBase,
  Header,
  CloseButton,
  Body,
  BodyItem,
  Footer,
  DoneButton,
  CancelButton
} from './styles';
import { actions as ui } from 'src/redux/states/ui';
import { changeUsername } from 'src/redux/states/auth';
import { Input } from 'src/styled-components/input.styled';
import { useInputValue } from 'src/hooks/useInputValue';
import { PulseLoader } from 'react-spinners';
import events from 'src/services/event-service';
import { ErrorMessage } from 'src/styled-components/login-and-register';

export type ErrorProps = { errorOcurred: null | string };

export const EditUsername: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const user = useAppSelector((s) => s.auth.user);
  const newUsername = useInputValue(user?.username);
  const currentPassword = useInputValue();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setLoading(false);
    setError(null);
    currentPassword.reset();
    dispatch(ui.closedModal('EditUsername'));
  };

  const send = () => {
    if (newUsername.value === user!.username && !currentPassword.value) {
      setLoading(true);
      setTimeout(() => handleClose(), 500);
      return;
    }

    setLoading(true);
    dispatch(
      changeUsername({
        newUsername: newUsername.value,
        password: currentPassword.value
      })
    );
  };

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !loading) send();
  };

  useEffect(() => {
    const onSuccess = () => handleClose();
    const onFailure = (message: string) => {
      setLoading(false);
      setError(message);
    };

    events.on('CHANGE_USERNAME_SUCCEEDED', onSuccess);
    events.on('CHANGE_USERNAME_FAILED', onFailure);

    return () => {
      events.off('CHANGE_USERNAME_SUCCEEDED', onSuccess);
      events.off('CHANGE_USERNAME_FAILED', onFailure);
    };
  }, []);

  return user ? (
    <Modal background={true} name="EditUsername">
      <EditModalBase>
        <Header>
          <div className="title">Change your username</div>
          <div className="description">
            Enter a new username and your existing password.
          </div>
          <CloseButton onClick={handleClose}>
            <CloseIcon className="closeIcon" />
          </CloseButton>
        </Header>
        <Body>
          <BodyItem errorOcurred={error}>
            <h5>Username{error && <ErrorMessage>- {error}</ErrorMessage>}</h5>
            <Input {...newUsername} />
          </BodyItem>
          <BodyItem errorOcurred={error}>
            <h5>
              Current Password{error && <ErrorMessage>- {error}</ErrorMessage>}
            </h5>
            <Input {...currentPassword} onKeyUp={onKeyUp} type="password" />
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
            <DoneButton className="button" onClick={send}>
              Done
            </DoneButton>
          )}
        </Footer>
      </EditModalBase>
    </Modal>
  ) : null;
};
