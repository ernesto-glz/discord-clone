import React from 'react';
import { useSelector } from 'react-redux';
import { Pages } from 'src/components/Layout';
import { NotificationState } from 'src/components/Server/ServerButton';
import { FriendsImg } from 'src/components/UserImage';
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
}

export interface AddFriendProps {
  active: boolean;
}

const ChannelInfo: React.FC<Props> = ({ channelId, setPage, page }) => {
  const notifications = useSelector(
    (state: NotificationState) => state.notifications
  );

  return (
    <Container>
      <div className="channel-info">
        {channelId ? (
          <>
            <AIcon />
            <Title>Test</Title>
          </>
        ) : (
          <>
            <FriendsImg />
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
