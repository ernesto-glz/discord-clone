import React from 'react';
import classNames from 'classnames';
import { DiscordLogo } from 'src/components/images/server/discord-logo';
import { ExploreButton } from 'src/components/images/server/explore-button';
import { AddServerButton } from 'src/components/images/server/new-server-button';
import { useAppSelector } from 'src/store/hooks';
import { getIncomingRequests } from 'src/store/states/requests';

export interface Props {
  selected?: boolean;
  isHome?: boolean;
  isAddButton?: boolean;
  isExploreButton?: boolean;
  hasNotifications?: boolean;
  hasMentions?: boolean;
  notifications?: number;
}

const ServerButton: React.FC<Props> = ({
  selected,
  isHome,
  isAddButton,
  isExploreButton,
  hasNotifications,
  notifications,
  hasMentions
}) => {
  const requests = useAppSelector(getIncomingRequests());
  const calcNotifications = isHome ? requests.length : notifications;

  return (
    <button
      className={classNames('ServerButton', {
        'isHome': isHome,
        'actionButton': isExploreButton || isAddButton,
        'selected': selected,
        'hasNotifications': hasNotifications || !!calcNotifications,
        'hasMentions': hasMentions
      })}
      data-notifications={calcNotifications}
    >
      {isHome && <DiscordLogo />}
      {isAddButton && <AddServerButton />}
      {isExploreButton && <ExploreButton />}
    </button>
  );
};

export default ServerButton;
