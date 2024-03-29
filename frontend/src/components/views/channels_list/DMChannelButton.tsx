import React from 'react';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { Entity } from '@discord/types';
import { getAvatarUrl } from 'src/utils/utils';
import { actions as ui } from 'src/store/states/ui';
import { BaseAvatar } from 'src/components/views/avatars/BaseAvatar';
import { hideChannel } from 'src/store/states/channels';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import classNames from 'classnames';

type Props = { channel: Entity.Channel };

const ChannelButton: React.FC<Props> = ({ channel }) => {
  const { dmUserId } = channel;
  const self = useAppSelector((s) => s.auth.user)!;
  const dmUser = useAppSelector((s) => s.users.find((u) => u.id === dmUserId));
  const { activeGuild, activeChannel } = useAppSelector((s) => s.ui);
  const isActive = activeChannel?.id === channel.id;
  const isOnline = dmUser?.status === 'ONLINE' && self.friendIds.includes(dmUser.id);
  const url = `/channels/${activeGuild}/${channel.id}`;
  const dispatch = useAppDispatch();

  const saveScrollbar = () => {
    if (!activeChannel) return;
    const position = document.getElementById('channelScroller')?.scrollTop;
    dispatch(ui.setLastScrollbarPos({ channelId: activeChannel.id, position }));
  };

  const hide = () => dispatch(hideChannel(channel.id));

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
      <FontAwesomeIcon
        icon={faClose}
        onClick={hide}
        className="channelButton-close"
      />
    </div>
  );
};

export default ChannelButton;
