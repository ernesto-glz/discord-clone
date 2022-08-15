import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { PulseLoader } from 'react-spinners';
import { findError } from 'src/utils/errors';
import { FormInput } from 'src/components/views/elements/FormInput';
import { useChangeUsername } from 'src/hooks/user/useChangeUsername';
import { ModalBuilder } from '../../ModalBuilder';

export const EditUsername: React.FC = () => {
  const { onSubmit, handleClose, errors, loading, register } =
    useChangeUsername();
  const user = useAppSelector((s) => s.auth.user);

  return user ? (
    <ModalBuilder
      name="EditUsername"
      background={true}
      formHandler={onSubmit}
      header={
        <React.Fragment>
          <div className="title">Change your username</div>
          <div className="description">
            Enter a new username and your existing password.
          </div>
        </React.Fragment>
      }
      body={
        <React.Fragment>
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
        </React.Fragment>
      }
      footer={
        <React.Fragment>
          <button className="button transparent-button" type="button" onClick={handleClose}>
            Cancel
          </button>
          <button className="button contained-button" type="submit" disabled={loading}>
            {loading ? <PulseLoader color="white" size={5} /> : 'Done'}
          </button>
        </React.Fragment>
      }
    />
  ) : null;
};
