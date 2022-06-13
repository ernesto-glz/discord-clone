import React from 'react';
import { FriendRequest } from 'src/models/friend.model';
import { RequestItem } from './friend-request';
import { useAppSelector } from 'src/redux/hooks';
import { selectIncoming, selectOutgoing } from 'src/redux/states/requests';
import {
  Container,
  FlexColumnContainer,
  RequestsBody,
  RequestsHeader,
  WampusImage,
  WampusMessage
} from '../styles';

export const PendingRequests: React.FC = () => {
  const incomingRequests = useAppSelector(selectIncoming);
  const outgoingRequests = useAppSelector(selectOutgoing);
  const totalRequests = incomingRequests.length + outgoingRequests.length;

  if (incomingRequests.length || outgoingRequests.length) {
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
    <Container>
      <WampusImage src="/assets/wampus_only.svg" alt="add friend" />
      <WampusMessage>
        There are no pending friend requests. Here&apos;s Wampus for now.
      </WampusMessage>
    </Container>
  );
};
