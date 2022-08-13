import React from 'react';
import { Link } from 'react-router-dom';
import { Image } from 'src/components/views/elements/Image';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';
import classNames from 'classnames';
import { getIncomingRequests } from 'src/redux/states/requests';

type Props = { genericImage: 'FRIEND' | 'NITRO'; displayName: string };

export const GenericListButton: React.FC<Props> = (props) => {
  const { genericImage, displayName } = props;
  const { activeGuild, activeChannel } = useAppSelector((s) => s.ui);
  const requests = useAppSelector(getIncomingRequests());
  const isActive = !activeChannel && displayName !== 'Nitro';
  const notNitro = displayName !== 'Nitro';
  const url = notNitro ? `/channels/${activeGuild}` : '';
  const dispatch = useAppDispatch();

  const saveScrollbar = () => {
    if (!activeChannel) return;
    const position = document.getElementById('channelScroller')?.scrollTop;
    dispatch(ui.setLastScrollbarPos({ channelId: activeChannel.id, position }));
  };

  return (
    <div className={classNames('channels-list-button generic', { active: isActive })}>
      <Link to={url} onClick={saveScrollbar}>
        <div className="avatarWithText">
          {genericImage === 'FRIEND' && (
            <Image className="channelAvatar" src="/img/user-raising-hand.svg" />
          )}
          {genericImage === 'NITRO' && (
            <Image className="channelAvatar" src="/img/discord-nitro.svg" />
          )}
          <span className="channelName">{displayName}</span>
        </div>
        {notNitro && requests.length > 0 && (
          <div className="notificationBadge">{requests.length}</div>
        )}
      </Link>
    </div>
  );
};
