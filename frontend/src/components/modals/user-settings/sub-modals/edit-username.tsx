import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import Modal from '../../modal';
import { actions as ui } from 'src/redux/states/ui';
import { changeUsername } from 'src/redux/states/auth';
import { useInputValue } from 'src/hooks/useInputValue';
import { PulseLoader } from 'react-spinners';
import { ErrorObject, findError } from 'src/utils/errors';
import { Input } from 'src/components/UI/input/input';
import {
  CloseIcon,
  EditModalBase,
  Header,
  CloseButton,
  Body,
  Footer,
  DoneButton,
  CancelButton
} from './styles';

export type ErrorProps = { errorOcurred: boolean };

export const EditUsername: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const user = useAppSelector((s) => s.auth.user);
  const newUsername = useInputValue(user?.username);
  const currentPassword = useInputValue();
  const dispatch = useAppDispatch();

  const handleClose = () => {
    setLoading(false);
    setErrors([]);
    currentPassword.reset();
    dispatch(ui.closedModal('EditUsername'));
  };

  const done = () => {
    if (newUsername.value === user!.username && !currentPassword.value) {
      setLoading(true);
      setTimeout(() => handleClose(), 500);
      return;
    }

    setLoading(true);
    dispatch(changeUsername({
      newUsername: newUsername.value,
      password: currentPassword.value
    }));
  };

  useEffect(() => {
    const onSuccess = () => handleClose();
    const onFailure = (errors: ErrorObject[]) => {
      setLoading(false);
      setErrors(errors);
    };

    events.on('CHANGE_USERNAME_SUCCEEDED', onSuccess);
    events.on('CHANGE_USERNAME_FAILED', onFailure);

    return () => {
      events.off('CHANGE_USERNAME_SUCCEEDED', onSuccess);
      events.off('CHANGE_USERNAME_FAILED', onFailure);
    };
  }, []);

  const onKeyUp = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' && !loading) done();
  };

  return user ? (
    <Modal background={true} name="EditUsername" animated>
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
          <Input
            onKeyUp={onKeyUp}
            error={findError(errors, 'USERNAME')}
            handler={newUsername}
            title="Username"
          />
          <Input
            onKeyUp={onKeyUp}
            error={findError(errors, 'PASSWORD')}
            handler={currentPassword}
            title="Current password"
            type='password'
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
