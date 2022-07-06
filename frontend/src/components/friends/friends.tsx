import React, { useMemo } from 'react';
import { FriendItem } from './friend-list-item';
import {
  Container,
  FlexColumnContainer,
  ListHeader,
  ListBody,
  WampusImage,
  WampusMessage
} from './styles';
import { useSelector } from 'react-redux';
import { getFriendUsers } from 'src/redux/states/users';

interface Props {
  justOnline?: boolean;
}

export const MyFriends: React.FC<Props> = (props) => {
  const friends = useSelector(getFriendUsers());
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
