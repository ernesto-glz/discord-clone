import React, { useEffect, useState } from 'react';
import { useWS } from 'src/contexts/ws.context';
import useFriendRequests from 'src/hooks/useFriendRequests';
import { PendingRequest } from 'src/models/friend.model';
import { setNotifCount } from 'src/redux/states/notification';
import {
  Container,
  FlexColumnContainer,
  LoaderContainer,
  RequestsBody,
  RequestsHeader,
  WampusImage,
  WampusMessage
} from '../styles';
import { RequestItem } from './friend-request';
import { DiscordLoadingDots } from 'src/components/LoadingSpinner';
import { useAppDispatch } from 'src/redux/hooks';

export const PendingRequests: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading, outgoingRequests, pendingRequests, fetchAllRequests } =
    useFriendRequests();
  const ws = useWS();
  const dispatch = useAppDispatch();
  const totalRequests =
    pendingRequests?.length || 0 + outgoingRequests?.length || 0;

  useEffect(() => {
    !isLoading && setIsMounted(true);
  }, [isLoading]);

  useEffect(() => {
    ws.on('UPDATE_FR', () => {
      fetchAllRequests();
      dispatch(setNotifCount(pendingRequests?.length || 0));
    });
    ws.on('NEW_FR', () => {
      fetchAllRequests();
      dispatch(setNotifCount(pendingRequests?.length || 0));
    });
  }, []);

  if (isLoading) {
    return (
      <LoaderContainer>
        <DiscordLoadingDots />
      </LoaderContainer>
    );
  }

  if (pendingRequests?.length || outgoingRequests?.length) {
    return (
      <FlexColumnContainer>
        <RequestsHeader>
          <h2>PENDING - {totalRequests}</h2>
        </RequestsHeader>
        <RequestsBody>
          {pendingRequests?.map((request: PendingRequest, i) => (
            <RequestItem request={request} key={i} type="Incoming" />
          ))}
          {outgoingRequests?.map((request: PendingRequest, i) => (
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
