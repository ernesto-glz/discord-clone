import React from 'react';
import { ws } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { User } from 'src/models/user.model';
import { FriendService } from 'src/services/friend.service';
import {
  AcceptIcon,
  ActionButton,
  CancelIcon,
  RequestActions
} from '../styles';
import { RequestType } from './friend-request';

interface Props {
  requestId: string;
  requestUser: User;
  type: RequestType;
}

export const RequestActionsItem: React.FC<Props> = ({ requestId, type }) => {
  const { callEndpoint } = useFetchAndLoad();

  const handleDenyOrCancelRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.deleteFriendRequest(requestId)
    );
    console.log(data);
    if (data) {
      ws.emit('DENIED_FR', data);
    }
  };

  const handleAcceptRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.acceptFriendRequest(requestId)
    );
    if (data) {
      ws.emit('ACCEPTED_FR', data);
    }
  };

  return (
    <RequestActions>
      {type === 'Outgoing' ? (
        <ActionButton onClick={handleDenyOrCancelRequest}>
          <CancelIcon className="cancel" />
        </ActionButton>
      ) : (
        <>
          <ActionButton onClick={handleAcceptRequest}>
            <AcceptIcon className="accept" />
          </ActionButton>
          <ActionButton onClick={handleDenyOrCancelRequest}>
            <CancelIcon className="cancel" />
          </ActionButton>
        </>
      )}
    </RequestActions>
  );
};
