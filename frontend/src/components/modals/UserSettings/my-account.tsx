import React from 'react';
import { BaseAvatar } from 'src/components/views/avatars/BaseAvatar';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';
import { getAvatarUrl } from 'src/utils/utils';
import { Button } from '../NotImplemented/styles';
import {
  AccountProfileCard,
  AccountRemovalSection,
  Divider,
  EditProfileButton,
  InfoList,
  ProfileUsername,
  SectionTitle,
  UserAvatar,
  UserInfoRegion,
  UserSecuritySection
} from './styles';
import { ListItemEmail } from './sub-components/list-item-email';
import { ListItemPhone } from './sub-components/list-item-phone';
import { ListItemUsername } from './sub-components/list-item-username';
import { ChangePassword } from '../ChangePassword/ChangePassword';
import { DeleteAccount } from '../ConfirmDeleteAccount/ConfirmDeleteAccount';
import { EditUsername } from '../EditUsername/EditUsername';
import { Options } from './UserSettings';

type Props = { changeOption: (opt: Options) => void };

export const MyAccount: React.FC<Props> = ({ changeOption }) => {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  return (user) ? (
    <div>
      <AccountProfileCard>
        <div className="banner" />
        <UserInfoRegion>
          <UserAvatar>
            <BaseAvatar customSize={80} imageUrl={getAvatarUrl(user)} />
          </UserAvatar>
          <ProfileUsername>
            <div className="userTag">
              <span className="username">{user.username}</span>
              <span className="discrim">#{user.discriminator}</span>
            </div>
          </ProfileUsername>
          <EditProfileButton
            className="button"
            onClick={() => changeOption('Profile')}
          >
            <div>Edit User Profile</div>
          </EditProfileButton>
        </UserInfoRegion>
        <InfoList>
          <div className="fieldList">
            <ListItemUsername />
            <ListItemEmail />
            <ListItemPhone />
          </div>
        </InfoList>
      </AccountProfileCard>
      <Divider />
      <UserSecuritySection>
        <SectionTitle>
          <h1>Password and Authentication</h1>
        </SectionTitle>
        <div className="desc">
          If you forgot your current password, you always have the possibility
          to recover it using your email on the recovery password page.
        </div>
        <Button
          onClick={() => dispatch(ui.openedModal('ChangePassword'))}
          className="button"
        >
          Change Password
        </Button>
      </UserSecuritySection>
      <Divider />
      <AccountRemovalSection>
        <SectionTitle>
          <h5>Account Removal</h5>
        </SectionTitle>
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
      </AccountRemovalSection>
      <EditUsername />
      <ChangePassword />
      <DeleteAccount />
    </div>
  ) : null;
};
