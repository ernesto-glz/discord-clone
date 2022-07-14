import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Store } from 'types/store';
import { UserImage } from '../user-image';

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
  const user = useSelector((s: Store.AppState) => s.auth.user);
  const navigate = useNavigate();

  return (
    <React.Fragment>
      {user ? (
        <Container>
          <Profile>
            <UserImage
              imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${user.avatar}.png`}
              isGeneric={false}
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
              <SettingsIcon onClick={() => navigate('/logout')} />
          </Icons>
        </Container>
      ) : null}
    </React.Fragment>
  );
};

export default UserInfo;
