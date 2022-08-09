import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import Modal from '../../modal';
import { PulseLoader } from 'react-spinners';
import { findError } from 'src/utils/errors';
import {
  CloseIcon,
  EditModalBase,
  Header,
  CloseButton,
  Body,
  Footer,
  DoneButton,
  CancelButton,
} from './styles';
import { FormInput } from 'src/components/views/elements/FormInput';
import { useChangeUsername } from 'src/hooks/user/useChangeUsername';

export const EditUsername: React.FC = () => {
  const { onSubmit, handleClose, errors, loading, register } = useChangeUsername();
  const user = useAppSelector((s) => s.auth.user);

  return user ? (
    <Modal background={true} name="EditUsername">
      <form onSubmit={onSubmit}>
        <EditModalBase>
          <Header>
            <div className="title">Change your username</div>
            <div className="description">
              Enter a new username and your existing password.
            </div>
            <CloseButton type='button' onClick={handleClose}>
              <CloseIcon className="closeIcon" />
            </CloseButton>
          </Header>
          <Body>
            <FormInput
              error={findError(errors, 'USERNAME')}
              {...register('newUsername')}
              defaultValue={user.username}
              title="Username"
            />
            <FormInput
              error={findError(errors, 'PASSWORD')}
              {...register('password')}
              title="Current password"
              type="password"
            />
          </Body>
          <Footer>
            <CancelButton className="button" type='button' onClick={handleClose}>
              Cancel
            </CancelButton>
            {loading ? (
              <DoneButton className="button" disabled>
                <PulseLoader color="white" size={5} />
              </DoneButton>
            ) : (
              <DoneButton className="button" type="submit">
                Done
              </DoneButton>
            )}
          </Footer>
        </EditModalBase>
      </form>
    </Modal>
  ) : null;
};
