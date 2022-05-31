import React, { useEffect, useState } from 'react';
import useFriends from 'src/hooks/useFriends';
import {
  Container,
  FlexColumnContainer,
  LoaderContainer,
  RequestsBody,
  RequestsHeader,
  WampusImage,
  WampusMessage
} from '../styles';
import { FriendItem } from './friend-item';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';

export const AllFriends: React.FC = () => {
  const { friends, isLoading } = useFriends();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    !isLoading && setIsMounted(true);
  }, [friends]);

  if (isLoading) {
    return (
      <LoaderContainer>
        <DiscordLoadingDots />
      </LoaderContainer>
    );
  }

  if (friends?.length) {
    return (
      <FlexColumnContainer>
        <RequestsHeader>
          <h2>FRIENDS -{friends.length}</h2>
        </RequestsHeader>
        <RequestsBody>
          {friends.map((friend, i) => (
            <FriendItem key={i} data={friend} />
          ))}
        </RequestsBody>
      </FlexColumnContainer>
    );
  }

  return (
    <React.Fragment>
      {isMounted ? (
        <Container>
          <WampusImage src="/assets/no_online_friends.svg" alt="noOnline" />
          <WampusMessage>No friends, only Wampus.</WampusMessage>
        </Container>
      ) : (
        <LoaderContainer>
          <DiscordLoadingDots />
        </LoaderContainer>
      )}
    </React.Fragment>
  );
};
