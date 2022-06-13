import React, { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserImage } from 'src/components/UserImage';
import { useAppSelector } from 'src/redux/hooks';
import { selectFriends } from 'src/redux/states/friend';
import { selectNotifications } from 'src/redux/states/notification';
import { isOnline } from 'src/utils/redux';
import { CloseIcon, Container, NotificationMark } from './styles';

export interface Props {
  channelId: string;
  channelName: string;
  selected: string;
  imageUrl?: string;
  isGeneric?: boolean;
  friendId?: string;
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
  friendId
}) => {
  const navigate = useNavigate();
  const [isVisible, setIsVisible] = useState(false);
  const notifications = useAppSelector(selectNotifications);
  const friends = useAppSelector(selectFriends);
  const friendStatus = useMemo(() => isOnline(friendId!), [friends]);

  const goToChannel = () => {
    if (channelId !== selected) {
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
        // onClick={() => console.log('deleting channel')}
        isVisible={isVisible}
      />
    </Container>
  );
};

export default ChannelButton;
