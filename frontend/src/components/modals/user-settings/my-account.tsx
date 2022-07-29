import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';
import { getAvatarUrl } from 'src/utils/utils';
import { LogoutConfirm } from '../logout-confirm/logout-confirm';
import { Button } from '../not-implemented/styles';
import {
  AccountProfileCard,
  AccountRemovalSection,
  DeleteButton,
  DisableButton,
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
import { ChangePassword } from './sub-modals/change-password';
import { DeleteAccount } from './sub-modals/confirm-delete';
import { EditUsername } from './sub-modals/edit-username';
import { Options } from './user-settings';

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
            <img src={getAvatarUrl(user)} />
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
          <DisableButton
            onClick={() => dispatch(ui.openedModal('NotImplemented'))}
            className="button"
          >
            Disable Account
          </DisableButton>
          <DeleteButton
            onClick={() => dispatch(ui.openedModal('DeleteAccount'))}
            className="button"
          >
            Delete Account
          </DeleteButton>
        </div>
      </AccountRemovalSection>
      <EditUsername />
      <ChangePassword />
      <DeleteAccount />
    </div>
  ) : null;
};
