import React from 'react';
import { Link } from 'react-router-dom';
import { ws } from 'src/ws/websocket';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { Entity } from '@discord/types';
import { getAvatarUrl } from 'src/utils/utils';
import { actions as ui } from 'src/redux/states/ui';
import { BaseAvatar } from 'src/components/views/avatars/BaseAvatar';
import { Close } from '@styled-icons/material';
import classNames from 'classnames';

type Props = { channel: Entity.Channel };

const ChannelButton: React.FC<Props> = ({ channel }) => {
  const { dmUserId } = channel;
  const dmUser = useAppSelector((s) => s.users.find((u) => u.id === dmUserId));
  const { activeGuild, activeChannel } = useAppSelector((s) => s.ui);
  const isActive = activeChannel?.id === channel.id;
  const isOnline = dmUser?.status === 'ONLINE';
  const url = `/channels/${activeGuild}/${channel.id}`;
  const dispatch = useAppDispatch();

  const hideChannel = () => ws.emit('CHANNEL_HIDE', { channelId: channel.id });

  const saveScrollbar = () => {
    if (!activeChannel) return;
    const position = document.getElementById('channelScroller')?.scrollTop;
    dispatch(ui.setLastScrollbarPos({ channelId: activeChannel.id, position }));
  };

  return (
    <div className={classNames('channels-list-button', { active: isActive })}>
      <Link to={url} onClick={saveScrollbar}>
        <div className="avatarWithText">
          <BaseAvatar
            className="channelAvatar"
            imageUrl={getAvatarUrl(channel)}
            isOnline={isOnline}
            displayStatus={true}
          />
          <span className="channelName">{channel.name ?? 'Unknown'}</span>
        </div>
      </Link>
      <Close onClick={hideChannel} className="channelButton-close" />
    </div>
  );
};

export default ChannelButton;