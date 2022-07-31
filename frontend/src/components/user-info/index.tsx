import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { UserImage } from '../user-image';
import { actions as ui } from 'src/redux/states/ui';

import {
  Container,
  Profile,
  UserData,
  Icons,
  MicIcon,
  HeadphoneIcon,
  SettingsIcon
} from './styles';
import { getAvatarUrl } from 'src/utils/utils';

const UserInfo: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  return (user) ? (
    <Container>
      <Profile>
        <UserImage
          imageUrl={getAvatarUrl(user)}
          displayStatus={true}
          isOnline={true}
        />
        <UserData>
          <strong>{user.username}</strong>
          <span>#{user.discriminator}</span>
        </UserData>
      </Profile>

      <Icons>
        <MicIcon />
        <HeadphoneIcon />
        <SettingsIcon
          onClick={() => dispatch(ui.openedModal('UserSettings'))}
        />
      </Icons>
    </Container>
  ) : null;
};

export default UserInfo;
