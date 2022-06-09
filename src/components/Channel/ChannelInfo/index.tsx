import React from 'react';
import { FriendImage } from 'src/components/Images';
import { Pages } from 'src/components/Layout';
import { useAppSelector } from 'src/redux/hooks';
import { selectNotifications } from 'src/redux/states/notification';
import {
  Container,
  Title,
  FileIcon,
  HelpIcon,
  AIcon,
  Separator,
  AddFriendBtn,
  MenuButton,
  NotificationMark
} from './styles';

interface Props {
  channelId: string | undefined;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
  page: string;
  channelName: string | null;
}

export interface AddFriendProps {
  active: boolean;
}

const ChannelInfo: React.FC<Props> = ({
  channelId,
  setPage,
  page,
  channelName
}) => {
  const notifications = useAppSelector(selectNotifications);

  return (
    <Container>
      <div className="channel-info">
        {channelId ? (
          <>
            <AIcon />
            <Title>{channelName || 'Undetermined'}</Title>
          </>
        ) : (
          <>
            <FriendImage width="24" height="32" fill="var(--gray)" />
            <Title>Friends</Title>
            <Separator />
            <MenuButton onClick={() => setPage('Online')}>Online</MenuButton>
            <MenuButton onClick={() => setPage('All')}>All</MenuButton>
            <MenuButton onClick={() => setPage('Pending')}>
              Pending
              {notifications > 0 && (
                <NotificationMark>{notifications}</NotificationMark>
              )}
            </MenuButton>
            <AddFriendBtn
              active={page === 'AddFriend'}
              onClick={() => setPage('AddFriend')}
            >
              Add Friend
            </AddFriendBtn>
          </>
        )}
      </div>

      <div className="actions">
        <FileIcon />
        <HelpIcon />
      </div>
    </Container>
  );
};

export default ChannelInfo;
