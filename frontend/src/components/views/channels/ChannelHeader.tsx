import React from 'react';
import { OfflineStatus } from 'src/components/images/user-status/offline';
import { OnlineStatus } from 'src/components/images/user-status/online';
import { getUserById } from 'src/store/states/users';
import { useAppSelector } from 'src/store/hooks';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAt, faCircleQuestion, faInbox } from '@fortawesome/free-solid-svg-icons';

export const ChannelHeader: React.FC = () => {
  const { activeChannel } = useAppSelector((s) => s.ui);
  const user = useAppSelector(getUserById(activeChannel?.dmUserId ?? ''));
  const isOnline = user?.status === 'ONLINE';

  return user ? (
    <div className="header-container">
      <div className="menu-options">
        <FontAwesomeIcon icon={faAt} className="type-indicator" />
        <h1 className="title">{user.username}</h1>
        {isOnline ? (
          <OnlineStatus styles={{ marginLeft: 6 }} />
        ) : (
          <OfflineStatus styles={{ marginLeft: 6 }} />
        )}
      </div>

      <div className="menu-actions">
        <FontAwesomeIcon icon={faInbox} className="menu-image" />
        <FontAwesomeIcon icon={faCircleQuestion} className="menu-image" />
      </div>
    </div>
  ) : null;
};
