import React, { useMemo } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { selectFriends } from 'src/redux/states/friend';
import { FriendItem } from '../FriendListItem';
import {
  Container,
  FlexColumnContainer,
  RequestsBody,
  RequestsHeader,
  WampusImage,
  WampusMessage
} from '../styles';

export const OnlineFriends: React.FC = () => {
  const friends = useAppSelector(selectFriends);
  const friendsOnline = useMemo(() => {
    const onLineFriends = friends.filter(
      (friend) => friend.status === 'ONLINE'
    );
    return onLineFriends;
  }, [friends]);

  if (friendsOnline?.length) {
    return (
      <FlexColumnContainer>
        <RequestsHeader>
          <h2>ONLINE - {friendsOnline.length}</h2>
        </RequestsHeader>
        <RequestsBody>
          {friends.map(
            (friend, i) =>
              friend.status === 'ONLINE' && (
                <FriendItem key={i} friend={friend} />
              )
          )}
        </RequestsBody>
      </FlexColumnContainer>
    );
  }

  return (
    <Container>
      <WampusImage src="/assets/wampus_sleeping.svg" alt="noOnline" />
      <WampusMessage>No one&apos;s around to play with Wumpus.</WampusMessage>
    </Container>
  );
};
