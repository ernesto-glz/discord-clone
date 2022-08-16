import React from 'react';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { getAvatarUrl } from 'src/utils/utils';
import { BaseAvatar } from '../views/avatars/BaseAvatar';
import { Mic, Headset, Settings } from '@styled-icons/material';

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
        <div className="UserData">
          <strong>{user.username}</strong>
          <span>#{user.discriminator}</span>
        </div>
      </div>

      <div className="Menu">
        <Mic />
        <Headset />
        <Settings onClick={openUserSettings} />
      </div>
    </div>
  ) : null;
};

export default UserInfo;
