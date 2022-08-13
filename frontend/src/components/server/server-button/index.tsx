import React from 'react';
import { DiscordLogo } from 'src/components/images/server/discord-logo';
import { ExploreButton } from 'src/components/images/server/explore-button';
import { AddServerButton } from 'src/components/images/server/new-server-button';
import { useAppSelector } from 'src/redux/hooks';
import { getIncomingRequests } from 'src/redux/states/requests';
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
  const requests = useAppSelector(getIncomingRequests());

  return (
    <Button
      isHome={isHome}
      isAddButton={isAddButton}
      isExploreButton={isExploreButton}
      hasNotifications={hasNotifications}
      mentions={isHome ? requests.length : mentions}
      selected={selected}
    >
      {isHome && <DiscordLogo />}
      {isAddButton && <AddServerButton />}
      {isExploreButton && <ExploreButton />}
    </Button>
  );
};

export default ServerButton;
