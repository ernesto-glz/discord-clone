import React, { useEffect, useState } from 'react';
import {
  AddServerButton,
  DiscordLogo,
  ExploreButton
} from 'src/components/Logo';
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
