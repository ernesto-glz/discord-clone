import React from 'react';
import { FriendImage } from 'src/components/Images';
import { Pages } from 'src/components/Layout';
import { useAppSelector } from 'src/redux/hooks';
import { selectChannelName } from 'src/redux/states/channels';
import { selectActiveChannel } from 'src/redux/states/ui';
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
  page: string;
  setPage: React.Dispatch<React.SetStateAction<Pages>>;
}

export interface MenuButtonProps {
  isActive: boolean;
}

export interface AddFriendProps {
  active: boolean;
}

const ChannelInfo: React.FC<Props> = ({ page, setPage }) => {
  const notifications = 99;
  const activeChannel = useAppSelector(selectActiveChannel);
  const channelName = useAppSelector(selectChannelName);
  const isActivePage = (i: string) => page === i;

  return (
    <Container>
      <div className="channel-info">
        {activeChannel ? (
          <>
            <AIcon />
            <Title>{channelName || 'Undetermined'}</Title>
          </>
        ) : (
          <>
            <FriendImage width="24" height="32" fill="var(--gray)" />
            <Title>Friends</Title>
            <Separator />
            <MenuButton
              isActive={isActivePage('Online')}
              onClick={() => setPage('Online')}
            >
              Online
            </MenuButton>
            <MenuButton
              isActive={isActivePage('All')}
              onClick={() => setPage('All')}
            >
              All
            </MenuButton>
            <MenuButton
              isActive={isActivePage('Pending')}
              onClick={() => setPage('Pending')}
            >
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
