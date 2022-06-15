import React, { useMemo } from 'react';
import { FriendItem } from './FriendListItem';
import { useAppSelector } from 'src/redux/hooks';
import { selectFriends } from 'src/redux/states/friend';
import {
  Container,
  FlexColumnContainer,
  RequestsBody,
  RequestsHeader,
  WampusImage,
  WampusMessage
} from './styles';

interface Props {
  justOnline?: boolean;
}

export const MyFriends: React.FC<Props> = (props) => {
  const friends = useAppSelector(selectFriends);
  const friendsOnline = useMemo(() => {
    const onlineFriends = friends.filter(
      (friend) => friend.status === 'ONLINE'
    );
    return onlineFriends;
  }, [friends]);

  if (props.justOnline ? friendsOnline.length : friends.length) {
    return (
      <FlexColumnContainer>
        <RequestsHeader>
          <h2>
            {props.justOnline ? 'ONLINE' : 'ALL FRIENDS'} -{' '}
            {props.justOnline ? friendsOnline.length : friends.length}
          </h2>
        </RequestsHeader>
        <RequestsBody>
          {friends.map((friend, i) => {
            if (props.justOnline) {
              return (
                friend.status === 'ONLINE' && (
                  <FriendItem key={i} friend={friend} />
                )
              );
            }
            return <FriendItem key={i} friend={friend} />;
          })}
        </RequestsBody>
      </FlexColumnContainer>
    );
  }

  return (
    <React.Fragment>
      {props.justOnline ? (
        <Container>
          <WampusImage src="/assets/wampus_sleeping.svg" alt="noOnline" />
          <WampusMessage>
            No one&apos;s around to play with Wumpus.
          </WampusMessage>
        </Container>
      ) : (
        <Container>
          <WampusImage src="/assets/wampus_king.svg" alt="noOnline" />
          <WampusMessage>No friends, only Wampus.</WampusMessage>
        </Container>
      )}
    </React.Fragment>
  );
};
