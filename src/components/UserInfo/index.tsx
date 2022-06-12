import React from 'react';
import { useWS } from 'src/contexts/ws.context';
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
  const socket = useWS();

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
          isOnline={true}
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
