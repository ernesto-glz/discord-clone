import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { DiscordLogo } from 'src/components/Logo';
import { Button } from './styles';

export interface Props {
  selected?: boolean;
  isHome?: boolean;
  hasNotifications?: boolean;
  mentions?: number;
}

export interface NotificationState {
  notifications: number;
}

const ServerButton: React.FC<Props> = ({
  selected,
  isHome,
  hasNotifications,
  mentions
}) => {
  const notifications = useSelector(
    (state: NotificationState) => state.notifications
  );
  const [actualNotifications, setActualNotifications] = useState(0);

  useEffect(() => {
    setActualNotifications(notifications);
  }, [notifications]);

  return (
    <Button
      isHome={isHome}
      hasNotifications={hasNotifications}
      mentions={isHome ? actualNotifications : mentions}
      className={selected ? 'active' : ''}
    >
      {isHome && <DiscordLogo />}
    </Button>
  );
};

export default ServerButton;
