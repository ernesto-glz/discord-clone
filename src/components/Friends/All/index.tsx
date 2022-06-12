import React, { useEffect, useState } from 'react';
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
import { useAppSelector } from 'src/redux/hooks';
import { isLoadingFriends, selectFriends } from 'src/redux/states/friend';

export const AllFriends: React.FC = () => {
  const friends = useAppSelector(selectFriends);
  const isLoading = useAppSelector(isLoadingFriends);
  const [isMounted, setIsMounted] = useState(false);

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

  if (friends?.length) {
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
