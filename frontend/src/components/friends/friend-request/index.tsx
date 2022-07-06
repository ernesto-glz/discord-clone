import React from 'react';
import { RequestItem } from './friend-request';
import {
  Container,
  FlexColumnContainer,
  ListBody,
  ListHeader,
  WampusImage,
  WampusMessage
} from '../styles';
import { useAppSelector } from 'src/redux/hooks';

export const PendingRequests: React.FC = () => {
  const requests = useAppSelector((s) => s.requests);

  if (requests.length) {
    return (
      <FlexColumnContainer>
        <ListHeader>
          <h2>PENDING - {requests.length}</h2>
        </ListHeader>
        <ListBody>
          {requests.map((request, i) => (
            <RequestItem request={request} key={i} type={request.type!} />
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
