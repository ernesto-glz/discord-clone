import { useEffect, useState } from 'react';
import { useSocket } from 'src/contexts/socket.context';
import { RoomService } from 'src/services/room.service';
import useFetchAndLoad from './useFetchAndLoad';

export const useRooms = (initialRooms: any) => {
  const [rooms, setRooms] = useState(initialRooms);
  const { callEndpoint } = useFetchAndLoad();
  const socket = useSocket();

  const getRooms = async () => {
    const { data } = await callEndpoint(RoomService.getAllRooms());
    setRooms(data);
  };

  useEffect(() => {
    setRooms(initialRooms);
  }, [initialRooms]);

  useEffect(() => {
    socket.on('notify-dm-chat', () => {
      getRooms();
    });

    return () => {
      socket.off('notify-dm-chat');
    };
  }, []);

  return {
    rooms
  };
};
