import React from 'react';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { ws } from 'src/ws/websocket';
import { Entity } from '@discord/types';
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
  requestUser: Entity.User;
  type: RequestType;
}

export const RequestActionsItem: React.FC<Props> = ({ requestId, type }) => {
  const { callEndpoint } = useFetchAndLoad();

  const handleDenyOrCancelRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.deleteFriendRequest(requestId)
    );
    if (data) {
      ws.emit('FRIEND_REQUEST_REMOVE', { request: data });
    }
  };

  const handleAcceptRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.acceptFriendRequest(requestId)
    );
    if (data) {
      ws.emit('FRIEND_REQUEST_ACCEPT', data);
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
