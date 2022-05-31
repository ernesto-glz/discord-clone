import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useSocket } from 'src/contexts/socket.context';
import useFetchAndLoad from 'src/hooks/useFetchAndLoad';
import { RoomService } from 'src/services/room.service';
import { ActionButton, DotsIcon, MessageIcon, RequestActions } from '../styles';

interface Props {
  userId: string;
}

export const FriendItemActions: React.FC<Props> = ({ userId }: Props) => {
  const { callEndpoint } = useFetchAndLoad();
  const socket = useSocket();
  const navigate = useNavigate();

  const createRoomWithFriend = async () => {
    const { data } = await callEndpoint(
      RoomService.getOrCreateRoom({ receiverId: userId })
    );

    if (data) {
      socket.emit('notify-dm-chat', data);
      socket.emit('new-room', data.sender, data._id);
      socket.emit('new-room', data.receiver, data._id);
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
