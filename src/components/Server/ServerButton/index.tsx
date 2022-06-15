import React, { useEffect, useState } from 'react';
import {
  AddServerButton,
  DiscordLogo,
  ExploreButton
} from 'src/components/Logo';
import { useAppSelector } from 'src/redux/hooks';
import { selectNotifications } from 'src/redux/states/notification';
import { Button } from './styles';

export interface Props {
  selected?: boolean;
  isHome?: boolean;
  isAddButton?: boolean;
  isExploreButton?: boolean;
  hasNotifications?: boolean;
  mentions?: number;
}

const ServerButton: React.FC<Props> = ({
  selected,
  isHome,
  isAddButton,
  isExploreButton,
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
      isAddButton={isAddButton}
      isExploreButton={isExploreButton}
      hasNotifications={hasNotifications}
      mentions={isHome ? actualNotifications : mentions}
      selected={selected}
    >
      {isHome && <DiscordLogo />}
      {isAddButton && <AddServerButton />}
      {isExploreButton && <ExploreButton />}
    </Button>
  );
};

export default ServerButton;
