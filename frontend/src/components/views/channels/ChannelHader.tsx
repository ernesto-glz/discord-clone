import React from 'react';
import { OfflineStatus } from 'src/components/images/user-status/offline';
import { OnlineStatus } from 'src/components/images/user-status/online';
import { getUserById } from 'src/store/states/users';
import { useAppSelector } from 'src/store/hooks';
import {
  FileTray as FileIcon,
  HelpCircle as HelpIcon,
} from '@styled-icons/ionicons-solid';
import { AlternateEmail } from '@styled-icons/material';

export const ChannelHeader: React.FC = () => {
  const { activeChannel } = useAppSelector((s) => s.ui);
  const user = useAppSelector(getUserById(activeChannel?.dmUserId ?? ''));
  const isOnline = user?.status === 'ONLINE';

  return user ? (
    <div className="header-container">
      <div className="menu-options">
        <AlternateEmail className="type-indicator" />
        <h1 className="title">{user.username}</h1>
        {isOnline ? (
          <OnlineStatus styles={{ marginLeft: 6 }} />
        ) : (
          <OfflineStatus styles={{ marginLeft: 6 }} />
        )}
      </div>

      <div className="menu-actions">
        <FileIcon className="menu-image" />
        <HelpIcon className="menu-image" />
      </div>
    </div>
  ) : null;
};
