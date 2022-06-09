import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserImage } from 'src/components/UserImage';
import { useAppSelector } from 'src/redux/hooks';
import { selectNotifications } from 'src/redux/states/notification';
import { CloseIcon, Container, NotificationMark } from './styles';

export interface Props {
  channelId: string;
  channelName: string;
  selected: string;
  imageUrl?: string;
  isGeneric?: boolean;
  setSelected: React.Dispatch<React.SetStateAction<string>>;
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
  setSelected
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const notifications = useAppSelector(selectNotifications);
  const navigate = useNavigate();

  const goToChannel = () => {
    if (channelId !== selected) {
      setSelected(channelId);
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
