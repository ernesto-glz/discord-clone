import React, { useEffect, useState } from 'react';
import { FriendRequest } from 'src/models/friend.model';
import { RequestItem } from './friend-request';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import { useAppSelector } from 'src/redux/hooks';
import { selectIncoming, selectOutgoing } from 'src/redux/states/requests';
import {
  Container,
  FlexColumnContainer,
  LoaderContainer,
  RequestsBody,
  RequestsHeader,
  WampusImage,
  WampusMessage
} from '../styles';

export const PendingRequests: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const incomingRequests = useAppSelector(selectIncoming);
  const outgoingRequests = useAppSelector(selectOutgoing);
  const loadingIncoming = useAppSelector(
    (state) => state.requests.incoming.loading
  );
  const loadingOutgoing = useAppSelector(
    (state) => state.requests.outgoing.loading
  );
  const totalRequests =
    incomingRequests?.length || 0 + outgoingRequests?.length || 0;
  const isLoading =
    loadingIncoming === 'loading' || loadingOutgoing === 'loading';

  useEffect(() => {
    !isLoading && setIsMounted(true);
  }, [isLoading]);

  if (isLoading) {
    return (
      <LoaderContainer>
        <DiscordLoadingDots />
      </LoaderContainer>
    );
  }

  if (incomingRequests?.length || outgoingRequests?.length) {
    return (
      <FlexColumnContainer>
        <RequestsHeader>
          <h2>PENDING - {totalRequests}</h2>
        </RequestsHeader>
        <RequestsBody>
          {incomingRequests?.map((request: FriendRequest, i) => (
            <RequestItem request={request} key={i} type="Incoming" />
          ))}
          {outgoingRequests?.map((request: FriendRequest, i) => (
            <RequestItem request={request} key={i} type="Outgoing" />
          ))}
        </RequestsBody>
      </FlexColumnContainer>
    );
  }

  return (
    <React.Fragment>
      {isMounted ? (
        <Container>
          <WampusImage src="/assets/pending_request.svg" alt="add friend" />
          <WampusMessage>
            There are no pending friend requests. Here&apos;s Wampus for now.
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
