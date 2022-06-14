import React from 'react';
import { FriendItem } from '../FriendListItem';
import { useAppSelector } from 'src/redux/hooks';
import { selectFriends } from 'src/redux/states/friend';
import {
  Container,
  FlexColumnContainer,
  RequestsBody,
  RequestsHeader,
  WampusImage,
  WampusMessage
} from '../styles';

export const AllFriends: React.FC = () => {
  const friends = useAppSelector(selectFriends);

  if (friends.length) {
    return (
      <FlexColumnContainer>
        <RequestsHeader>
          <h2>ALL FRIENDS - {friends.length}</h2>
        </RequestsHeader>
        <RequestsBody>
          {friends.map((friend, i) => (
            <FriendItem key={i} friend={friend} />
          ))}
        </RequestsBody>
      </FlexColumnContainer>
    );
  }

  return (
    <Container>
      <WampusImage src="/assets/wampus_king.svg" alt="noOnline" />
      <WampusMessage>No friends, only Wampus.</WampusMessage>
    </Container>
  );
};
