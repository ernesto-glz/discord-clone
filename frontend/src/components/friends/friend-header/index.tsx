import React from 'react';
import { UserRaisingHand } from 'src/components/images/tiny-icons/user-raising-hand';
import {
  Container,
  Title,
  FileIcon,
  HelpIcon,
  Separator,
  NotificationMark
} from '../../channel/channel-header/styles';
import { HeaderMenuButton } from '../header-button';

export type Props = { pageState: [any, any] };

export interface MenuButtonProps {
  isActive: boolean;
}

export interface AddFriendProps {
  active: boolean;
}

const FriendsHeader: React.FC<Props> = (props) => {
  const notifications = 0;

  return (
    <Container>
      <div className="channel-info">
        <UserRaisingHand width="24" height="32" fill="var(--gray)" />
        <Title>Friends</Title>
        <Separator />
        <HeaderMenuButton
          pageState={props.pageState}
          buttonPage="ONLINE"
          displayName="Online"
        />

        <HeaderMenuButton
          pageState={props.pageState}
          buttonPage="ALL"
          displayName="All"
        />

        <HeaderMenuButton
          pageState={props.pageState}
          buttonPage="PENDING"
          displayName={`Pending ${notifications > 0 ?
             ( <NotificationMark>{notifications}</NotificationMark> )
            : '' }`}
        />

        <HeaderMenuButton
          pageState={props.pageState}
          buttonPage="ADD"
          displayName="Add Friend"
        />
      </div>

      <div className="actions">
        <FileIcon />
        <HelpIcon />
      </div>
    </Container>
  );
};

export default FriendsHeader;
