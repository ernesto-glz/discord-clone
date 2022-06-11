import React, { useEffect, useState } from 'react';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import useFriends from 'src/hooks/useFriends';
import { FriendItem } from '../All/friend-item';
import {
  Container,
  FlexColumnContainer,
  LoaderContainer,
  RequestsBody,
  RequestsHeader,
  WampusImage,
  WampusMessage
} from '../styles';

export const OnlineFriends = () => {
  const { friends, isLoading } = useFriends(true);
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
          <h2>ONLINE - {friends.length}</h2>
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
          <WampusMessage>
            No one&apos;s around to play with Wumpus.
          </WampusMessage>
        </Container>
      ) : (
        <LoaderContainer>
          <DiscordLoadingDots />
        </LoaderContainer>
      )}
    </React.Fragment>
  );
};
