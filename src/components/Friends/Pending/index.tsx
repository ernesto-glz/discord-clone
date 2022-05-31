import React, { useEffect, useState } from 'react';
import { useSocket } from 'src/contexts/socket.context';
import useFriendRequests from 'src/hooks/useFriendRequests';
import { PendingRequest } from 'src/models/friend.model';
import { useDispatch } from 'react-redux';
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

export const PendingRequests: React.FC = () => {
  const [isMounted, setIsMounted] = useState(false);
  const { isLoading, outgoingRequests, pendingRequests, fetchAllRequests } =
    useFriendRequests();
  const socket = useSocket();
  const dispatch = useDispatch();
  const totalRequests =
    pendingRequests?.length || 0 + outgoingRequests?.length || 0;

  useEffect(() => {
    !isLoading && setIsMounted(true);
  }, [isLoading]);

  useEffect(() => {
    if (socket) {
      socket.on('notify-update-fr', () => {
        fetchAllRequests();
        dispatch(setNotifCount(pendingRequests?.length || 0));
      });
      socket.on('notify-new-fr', () => {
        fetchAllRequests();
        dispatch(setNotifCount(pendingRequests?.length || 0));
      });
    }
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
