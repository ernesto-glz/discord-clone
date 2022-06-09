import React from 'react';
import { useSocket } from 'src/contexts/socket.context';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { logOut, selectUser } from 'src/redux/states/user';
import { UserImage } from '../UserImage';

import {
  Container,
  Profile,
  UserData,
  Icons,
  MicIcon,
  HeadphoneIcon,
  SettingsIcon
} from './styles';

const UserInfo: React.FC = () => {
  const dispatch = useAppDispatch();
  const user = useAppSelector(selectUser);
  const socket = useSocket();

  const handleLogout = () => {
    dispatch(logOut());
  };

  return (
    <Container>
      <Profile>
        <UserImage
          imageUrl={`/assets/avatars/${user.avatar || '1'}.png`}
          isGeneric={false}
          displayStatus={true}
        />
        <UserData>
          <strong>{user.username}</strong>
          <span>#{user.shortId}</span>
        </UserData>
      </Profile>

      <Icons>
        <MicIcon />
        <HeadphoneIcon onClick={() => socket.emit('sockets')} />
        <SettingsIcon onClick={handleLogout} />
      </Icons>
    </Container>
  );
};

export default UserInfo;
