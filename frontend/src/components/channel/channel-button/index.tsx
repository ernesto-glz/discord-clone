import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserImage } from 'src/components/user-image';
import { ws } from 'src/ws/websocket';
import { CloseIcon, Container } from './styles';
import { useAppSelector } from 'src/redux/hooks';
import { Entity } from '@discord/types';

export type Props = { channel: Entity.Channel }

export interface CloseIconProps {
  isVisible: boolean;
}

const ChannelButton: React.FC<Props> = ({ channel }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const users = useAppSelector((s) => s.users);
  const isOnline = useMemo(() => {
    const user = users.find((u) => u.id === channel.dmUserId);
    return user?.status === 'ONLINE';
  }, [users]);
  const { activeGuild, activeChannel } = useAppSelector((s) => s.ui); 

  const goToChannel = () => {
    if (channel.id !== activeChannel?.id) {
      navigate(`/channels/${activeGuild}/${channel.id}`);
    }
  };

  return (
    <Container
      onMouseOver={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={activeChannel?.id === channel.id ? 'active' : ''}
    >
      <div onClick={goToChannel}>
        <UserImage
          isGeneric={false}
          imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${channel.avatar ?? 'unknown'}.png`}
          isOnline={isOnline}
          displayStatus={true}
        />
        <span>{channel.name ?? 'Unknown'}</span>
      </div>
      {/* 
      {!channelId && notifications > 0 && (
        <NotificationMark>
          <div className="notification">{notifications}</div>
        </NotificationMark>
      )} */}
      <CloseIcon
        onClick={() => ws.emit('CHANNEL_HIDE', { channelId: channel.id })}
        isVisible={isVisible}
      />
    </Container>
  );
};

export default ChannelButton;
