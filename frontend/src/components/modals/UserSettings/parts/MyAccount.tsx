import React from 'react';
import { BaseAvatar } from 'src/components/views/avatars/BaseAvatar';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { getAvatarUrl } from 'src/utils/utils';
import { ListItemEmail } from './list_items/Email';
import { ListItemPhone } from './list_items/Phone';
import { ListItemUsername } from './list_items/Username';
import { ChangePassword } from '../../ChangePassword/ChangePassword';
import { DeleteAccount } from '../../ConfirmDeleteAccount/ConfirmDeleteAccount';
import { EditUsername } from '../../EditUsername/EditUsername';
import { Options } from '../UserSettings';

type Props = { changeOption: (opt: Options) => void };

export const MyAccount: React.FC<Props> = ({ changeOption }) => {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  return user ? (
    <div className="MyAccount">
      <div className="ProfileCard">
        <div className="banner" />
        <div className="userInfo">
          <BaseAvatar
            customSize={80}
            imageUrl={getAvatarUrl(user)}
            className="userAvatar"
          />
          <div className="profileInfo">
            <span className="username">{user.username}</span>
            <span className="discrim">#{user.discriminator}</span>
          </div>
          <button
            className="button contained-button"
            onClick={() => changeOption('Profile')}
          >
            <div>Edit User Profile</div>
          </button>
        </div>
        <div className="background">
          <ListItemUsername />
          <ListItemEmail />
          <ListItemPhone />
        </div>
      </div>

      <div className="divider" />

      <div className="subSection">
        <div className="sectionTitle">
          <h1>Password and Authentication</h1>
        </div>
        <div className="desc">
          If you forgot your current password, you always have the possibility
          to recover it using your email on the recovery password page.
        </div>
        <button
          onClick={() => dispatch(ui.openedModal('ChangePassword'))}
          className="button contained-button"
        >
          Change Password
        </button>
      </div>

      <div className="divider" />

      <div className="subSection">
        <div className="sectionTitle">
          <h5>Account Removal</h5>
        </div>
        <div className="desc">
          Disabling your account means you can recover it at any time after
          taking this action.
        </div>
        <div className="actions">
          <button
            onClick={() => dispatch(ui.openedModal('NotImplemented'))}
            className="button contained-button"
            data-variant="danger"
          >
            Disable Account
          </button>
          <button
            onClick={() => dispatch(ui.openedModal('DeleteAccount'))}
            className="button transparent-button"
            data-variant="danger"
          >
            Delete Account
          </button>
        </div>
      </div>

      {/* Modals */}
      <EditUsername />
      <ChangePassword />
      <DeleteAccount />
    </div>
  ) : null;
};
