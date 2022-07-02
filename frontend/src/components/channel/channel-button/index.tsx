import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserImage } from 'src/components/user-image';
import { ws } from 'src/ws/websocket';
import { useAppSelector } from 'src/redux/hooks';
import { selectFriends } from 'src/redux/states/friend';
import { isOnline } from 'src/utils/redux';
import { CloseIcon, Container, NotificationMark } from './styles';

export interface Props {
  channelId: string;
  channelName: string;
  selected: string;
  imageUrl?: string;
  isGeneric?: boolean;
  friendId?: string;
  genericImage?: 'FRIEND' | 'NITRO';
}

export interface CloseIconProps {
  isVisible: boolean;
}

const ChannelButton: React.FC<Props> = ({
  channelId,
  channelName,
  selected,
  imageUrl,
  isGeneric = false,
  friendId,
  genericImage
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const notifications = 0;
  const friends = useAppSelector(selectFriends);
  const friendStatus = useMemo(() => isOnline(friendId!), [friends]);

  const goToChannel = () => {
    if (channelId !== selected && channelId !== 'not') {
      navigate(`/channels/@me${channelId && `/${channelId}`}`);
    }
  };

  return (
    <Container
      onMouseOver={() => !isGeneric && setIsVisible(true)}
      onMouseLeave={() => !isGeneric && setIsVisible(false)}
      className={selected === channelId ? 'active' : ''}
    >
      <div onClick={goToChannel}>
        <UserImage
          isGeneric={isGeneric}
          genericImage={genericImage}
          imageUrl={imageUrl}
          displayStatus={true}
          isOnline={friendStatus}
        />
        <span>{channelName}</span>
      </div>

      {!channelId && notifications > 0 && (
        <NotificationMark>
          <div className="notification">{notifications}</div>
        </NotificationMark>
      )}
      <CloseIcon
        onClick={() => ws.emit('CHANNEL_HIDE', { channelId })}
        isVisible={isVisible}
      />
    </Container>
  );
};

export default ChannelButton;
