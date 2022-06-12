import React, { useEffect, useMemo, useState } from 'react';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import { useAppSelector } from 'src/redux/hooks';
import { isLoadingFriends, selectFriends } from 'src/redux/states/friend';
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
  const friends = useAppSelector(selectFriends);
  const isLoading = useAppSelector(isLoadingFriends);
  const [isMounted, setIsMounted] = useState(false);
  const friendsOnline = useMemo(() => {
    const onLineFriends = friends.map((friend) => {
      if (friend.status === 'ONLINE') return friend;
    });
    return onLineFriends;
  }, [friends]);

  useEffect(() => {
    isLoading !== 'loading' && setIsMounted(true);
  }, [friends]);

  if (isLoading === 'loading') {
    return (
      <LoaderContainer>
        <DiscordLoadingDots />
      </LoaderContainer>
    );
  }

  if (friendsOnline?.length) {
    return (
      <FlexColumnContainer>
        <RequestsHeader>
          <h2>ONLINE - {friends.length}</h2>
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
