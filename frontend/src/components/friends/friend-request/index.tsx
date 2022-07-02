import React from 'react';
import { RequestItem } from './friend-request';
import { useAppSelector } from 'src/redux/hooks';
import { selectIncoming, selectOutgoing } from 'src/redux/states/requests';
import {
  Container,
  FlexColumnContainer,
  ListBody,
  ListHeader,
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
        <ListHeader>
          <h2>PENDING - {totalRequests}</h2>
        </ListHeader>
        <ListBody>
          {incomingRequests?.map((request, i) => (
            <RequestItem request={request} key={i} type="Incoming" />
          ))}
          {outgoingRequests?.map((request, i) => (
            <RequestItem request={request} key={i} type="Outgoing" />
          ))}
        </ListBody>
      </FlexColumnContainer>
    );
  }

  return (
    <Container>
      <WampusImage src="/assets/wampus/wampus_only.svg" alt="add friend" />
      <WampusMessage>
        There are no pending friend requests. Here&apos;s Wampus for now.
      </WampusMessage>
    </Container>
  );
};
