import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserImage } from 'src/components/user-image';
import { ws } from 'src/ws/websocket';
import { isOnline } from 'src/utils/redux';
import { CloseIcon, Container, NotificationMark } from './styles';
import { useSelector } from 'react-redux';
import { Store } from 'types/store';
import { store } from 'src/redux/configure-store';
import { useAppSelector } from 'src/redux/hooks';
import { Entity } from '@discord/types';

export type Props = { channel: Entity.Channel }

export interface CloseIconProps {
  isVisible: boolean;
}

const ChannelButton: React.FC<Props> = ({ channel }) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const users = useSelector((s: Store.AppState) => s.users);
  const userStatus = useMemo(() => isOnline(channel.dmUserId!, store), [users]);
  const { activeGuild, activeChannel } = useAppSelector((s) => s.ui); 

  const goToChannel = () => {
    if (channel._id !== activeChannel?._id) {
      navigate(`/channels/${activeGuild}/${channel._id}`);
    }
  };

  return (
    <Container
      onMouseOver={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      className={activeChannel?._id === channel._id ? 'active' : ''}
    >
      <div onClick={goToChannel}>
        <UserImage
          isGeneric={false}
          imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${channel.avatar}.png`}
          isOnline={userStatus}
          displayStatus={true}
        />
        <span>{channel.name}</span>
      </div>
      {/* 
      {!channelId && notifications > 0 && (
        <NotificationMark>
          <div className="notification">{notifications}</div>
        </NotificationMark>
      )} */}
      <CloseIcon
        onClick={() => ws.emit('CHANNEL_HIDE', { channelId: channel._id })}
        isVisible={isVisible}
      />
    </Container>
  );
};

export default ChannelButton;
