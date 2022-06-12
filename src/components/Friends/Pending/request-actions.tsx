import React from 'react';
import { useWS } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { User } from 'src/models/user.model';
import { useAppSelector } from 'src/redux/hooks';
import { selectUserId } from 'src/redux/states/user';
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

export const RequestActionsItem: React.FC<Props> = ({
  requestId,
  requestUser,
  type
}) => {
  const { callEndpoint } = useFetchAndLoad();
  const myId = useAppSelector(selectUserId);
  const ws = useWS();

  const handleDenyOrCancelRequest = async () => {
    const { data } = await callEndpoint(
      FriendService.deleteFriendRequest(requestId)
    );
    if (data) {
      ws.emit('DENIED_FR', myId);
      ws.emit('DENIED_FR', requestUser._id);
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
