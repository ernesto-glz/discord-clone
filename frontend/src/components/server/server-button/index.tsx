import React from 'react';
import { DiscordLogo } from 'src/components/Images/server/discord-logo';
import { ExploreButton } from 'src/components/Images/server/explore-button';
import { AddServerButton } from 'src/components/Images/server/new-server-button';
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
  return (
    <Button
      isHome={isHome}
      isAddButton={isAddButton}
      isExploreButton={isExploreButton}
      hasNotifications={hasNotifications}
      mentions={isHome ? 0 : mentions}
      selected={selected}
    >
      {isHome && <DiscordLogo />}
      {isAddButton && <AddServerButton />}
      {isExploreButton && <ExploreButton />}
    </Button>
  );
};

export default ServerButton;
