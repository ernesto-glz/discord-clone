import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import {
  AccountProfileCard,
  EditProfileButton,
  InfoList,
  ProfileUsername,
  UserAvatar,
  UserInfoRegion
} from './styles';
import { ListItemEmail } from './sub-components/list-item-email';
import { ListItemPhone } from './sub-components/list-item-phone';
import { ListItemUsername } from './sub-components/list-item-username';
import { Options } from './user-settings';

type Props = { changeOption: (opt: Options) => void };

export const MyAccount: React.FC<Props> = ({ changeOption }) => {
  const user = useAppSelector((s) => s.auth.user);

  return (user) ? (
    <AccountProfileCard>
      <div className="banner" />
      <UserInfoRegion>
        <UserAvatar>
          <img
            src={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${user.avatar}.png`}
          />
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
  ) : null;
};
