import React, { useMemo } from 'react';
import { FriendItem } from './friend-list-item';
import { getFriendUsers } from 'src/redux/states/users';
import {
  Container,
  FlexColumnContainer,
  ListHeader,
  ListBody,
  WampusImage,
  WampusMessage
} from './styles';
import { useAppSelector } from 'src/redux/hooks';

interface Props {
  justOnline?: boolean;
}

export const MyFriends: React.FC<Props> = (props) => {
  const friends = useAppSelector(getFriendUsers());
  const onlineFriends = useMemo(
    () => friends.filter((f) => f.status === 'ONLINE'),
    [friends]
  );

  if (props.justOnline ? onlineFriends.length : friends.length) {
    return (
      <FlexColumnContainer>
        <ListHeader>
          <h2>
            {props.justOnline ? 'ONLINE' : 'ALL FRIENDS'} -{' '}
            {props.justOnline ? onlineFriends.length : friends.length}
          </h2>
        </ListHeader>
        <ListBody>
          {props.justOnline ? (
            onlineFriends.map((friend, i) => <FriendItem key={i} friend={friend} />)
          ) : (
            friends.map((friend, i) => <FriendItem key={i} friend={friend} />)
          )}
        </ListBody>
      </FlexColumnContainer>
    );
  }

  return (
    <React.Fragment>
      {props.justOnline ? (
        <Container>
          <WampusImage src="/assets/wampus/wampus_sleeping.svg" alt="noOnline" />
          <WampusMessage>
            No one&apos;s around to play with Wumpus.
          </WampusMessage>
        </Container>
      ) : (
        <Container>
          <WampusImage src="/assets/wampus/wampus_king.svg" alt="noOnline" />
          <WampusMessage>No friends, only Wampus.</WampusMessage>
        </Container>
      )}
    </React.Fragment>
  );
};
