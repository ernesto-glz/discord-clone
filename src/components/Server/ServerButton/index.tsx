import React, { useEffect, useState } from 'react';
import { DiscordLogo } from 'src/components/Logo';
import { useAppSelector } from 'src/redux/hooks';
import { selectNotifications } from 'src/redux/states/notification';
import { Button } from './styles';

export interface Props {
  selected?: boolean;
  isHome?: boolean;
  hasNotifications?: boolean;
  mentions?: number;
}

const ServerButton: React.FC<Props> = ({
  selected,
  isHome,
  hasNotifications,
  mentions
}) => {
  const notifications = useAppSelector(selectNotifications);
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
