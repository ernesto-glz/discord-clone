import React from 'react';
import { useNavigate } from 'react-router-dom';
import { ws } from 'src/contexts/ws.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { RoomService } from 'src/services/room.service';
import { ActionButton, DotsIcon, MessageIcon, RequestActions } from '../styles';

interface Props {
  userId: string;
}

export const FriendItemActions: React.FC<Props> = ({ userId }: Props) => {
  const { callEndpoint } = useFetchAndLoad();
  const navigate = useNavigate();

  const createRoomWithFriend = async () => {
    const { data } = await callEndpoint(
      RoomService.getOrCreateRoom({ receiverId: userId })
    );

    if (data) {
      ws.emit('NEW_DM_CHAT', data);
      navigate(`/channels/@me/${data._id}`, { replace: true });
    }
  };

  return (
    <RequestActions>
      <ActionButton onClick={createRoomWithFriend}>
        <MessageIcon className="message" />
      </ActionButton>
      <ActionButton>
        <DotsIcon className="message" />
      </ActionButton>
    </RequestActions>
  );
};
