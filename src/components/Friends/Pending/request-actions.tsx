import React from 'react';
import { useWS } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { useAppSelector } from 'src/redux/hooks';
import { selectUsername } from 'src/redux/states/user';
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
  requestUser: string;
  type: RequestType;
}

export const RequestActionsItem: React.FC<Props> = ({
  requestId,
  requestUser,
  type
}) => {
  const { callEndpoint } = useFetchAndLoad();
  const username = useAppSelector(selectUsername);
  const ws = useWS();

  const handleDenyOrCancelRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.deleteFriendRequest(requestId)
    );
    if (data) {
      ws.emit('UPDATE_FR', username);
      ws.emit('UPDATE_FR', requestUser);
    }
  };

  const handleAcceptRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.acceptFriendRequest(requestId)
    );
    if (data) {
      ws.emit('UPDATE_FR', username);
      ws.emit('UPDATE_FR', requestUser);
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
