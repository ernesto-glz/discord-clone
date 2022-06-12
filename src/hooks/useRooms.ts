import { useEffect, useState } from 'react';
import { useWS } from 'src/contexts/ws.context';
import { RoomService } from 'src/services/room.service';
import useFetchAndLoad from './useFetchAndLoad';

export const useRooms = (initialRooms: any) => {
  const [rooms, setRooms] = useState(initialRooms);
  const { callEndpoint } = useFetchAndLoad();
  const ws = useWS();

  const getRooms = async () => {
    const { data } = await callEndpoint(RoomService.getAllRooms());
    setRooms(data);
  };

  useEffect(() => {
    setRooms(initialRooms);
  }, [initialRooms]);

  useEffect(() => {
    ws.on('notify-dm-chat', () => {
      getRooms();
    });

    return () => {
      ws.off('notify-dm-chat');
    };
  }, []);

  return {
    rooms
  };
};
