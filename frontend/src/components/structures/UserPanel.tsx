import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { getAvatarUrl } from 'src/utils/utils';
import { BaseAvatar } from '../views/avatars/BaseAvatar';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import { Microphone } from '../images/user-area/microphone';
import { Headphones } from '../images/user-area/headphones';
import { Settings } from '../images/user-area/settings';

const UserInfo: React.FC = () => {
  const user = useAppSelector((s) => s.auth.user);
  const dispatch = useAppDispatch();

  const openUserSettings = () => dispatch(ui.openedModal('UserSettings'));

  return user ? (
    <div className="UserPanel">
      <div className="Profile">
        <BaseAvatar
          imageUrl={getAvatarUrl(user)}
          displayStatus={true}
          isOnline={true}
        />
        <div className="UserData userArea">
          <strong>{user.username}</strong>
          <span style={{ fontWeight: 300 }}>#{user.discriminator}</span>
        </div>
      </div>

      <div className="Menu">
        <div className="icon-wrapper">
          <Microphone />
        </div>
        <div className="icon-wrapper">
          <Headphones />
        </div>
        <div className="icon-wrapper" onClick={openUserSettings}>
          <Settings />
        </div>
      </div>
    </div>
  ) : null;
};

export default UserInfo;
