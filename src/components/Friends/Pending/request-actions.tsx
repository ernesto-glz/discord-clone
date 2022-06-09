import React from 'react';
import { useSocket } from 'src/contexts/socket.context';
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
  const socket = useSocket();

  const handleDenyOrCancelRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.deleteFriendRequest(requestId)
    );
    if (data) {
      socket.emit('notify-update-fr', username);
      socket.emit('notify-update-fr', requestUser);
    }
  };

  const handleAcceptRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.acceptFriendRequest(requestId)
    );
    if (data) {
      socket.emit('notify-update-fr', username);
      socket.emit('notify-update-fr', requestUser);
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
