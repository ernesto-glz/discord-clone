import React, { useEffect, useState } from 'react';
import { useInputValue } from 'src/hooks/useInputValue';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { deleteAccount } from 'src/redux/states/auth';
import { actions as ui } from 'src/redux/states/ui';
import Modal from '../../modal';
import { DisableButton } from '../styles';
import { Body, CancelButton, EditModalBase, Footer, Header } from './styles';
import events from 'src/services/event-service';
import { ErrorObject, findError } from 'src/utils/errors';
import { Input } from 'src/components/input/input';

export const DeleteAccount: React.FC = () => {
  const [errors, setErrors] = useState<ErrorObject[]>([]);
  const password = useInputValue();
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  const handleClose = () => {
    dispatch(ui.closedModal('DeleteAccount'));
  };

  const accept = () => dispatch(deleteAccount({ password: password.value }));

  useEffect(() => {
    const onFail = (errs: ErrorObject[]) => {
      setErrors(errs);
    };
    events.on('ACCOUNT_DELETE_FAILED', onFail);

    return () => {
      events.off('ACCOUNT_DELETE_FAILED', onFail);
    };
  }, []);

  const onKeyUp = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') accept();
  };

  return (user) ? (
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
          <Input
            onKeyUp={onKeyUp}
            error={findError(errors, 'PASSWORD')}
            handler={password}
            title="Password"
            type="password"
          />
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
