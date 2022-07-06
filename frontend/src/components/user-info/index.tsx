import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as auth } from 'src/redux/states/auth';
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
  const dispatch = useAppDispatch();
  const user = useSelector((s: Store.AppState) => s.auth.user);
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(auth.logOut());
    navigate('/login', { replace: true });
  };

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
            <SettingsIcon onClick={handleLogout} />
          </Icons>
        </Container>
      ) : null}
    </React.Fragment>
  );
};

export default UserInfo;
