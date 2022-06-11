import { useEffect, useState } from 'react';
import { getPendingRequests } from 'src/api/friend';
import { getAllRooms } from 'src/api/room';
import { setNotifCount } from 'src/redux/states/notification';
import { RoomService } from 'src/services/room.service';
import { loadAbort } from 'src/utils/load-abort-axios';
import { getAllFriends, isLoadingFriends } from 'src/redux/states/friend';
import useFetchAndLoad from './useFetchAndLoad';
import { selectUsername } from 'src/redux/states/user';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useSocket } from 'src/contexts/socket.context';

const useFirstLoad = (channelId?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRooms, setInitialRooms] = useState([]);
  const myUsername = useAppSelector(selectUsername);
  const loadingFriends = useAppSelector(isLoadingFriends);
  const { callEndpoint } = useFetchAndLoad();
  const [channelName, setChannelName] = useState(null);
  const dispatch = useAppDispatch();
  const socket = useSocket();

  const fetchFriends = async () => {
    if (loadingFriends === 'idle') {
      await dispatch(getAllFriends());
      socket.emit('get-friends-status');
    }
  };

  const fetchNotifications = async () => {
    const controller = loadAbort();
    const { data } = await getPendingRequests(controller);
    if (data?.length) {
      dispatch(setNotifCount(data.length));
    } else {
      dispatch(setNotifCount(0));
    }
  };

  const fetchAllInformation = async () => {
    const controller = loadAbort();
    const rooms = await getAllRooms(controller);
    await fetchNotifications();
    await fetchFriends();

    setInitialRooms(rooms.data);

    // just for simulation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const fetchChannelInfo = async () => {
    if (channelId) {
      const { data: channelInfo } = await callEndpoint(
        RoomService.getRoomById(channelId)
      );
      channelInfo &&
        setChannelName(
          myUsername === channelInfo.sender.username
            ? channelInfo.receiver.username
            : channelInfo.sender.username
        );
    }
  };

  useEffect(() => {
    fetchAllInformation();
  }, []);

  useEffect(() => {
    fetchChannelInfo();
  }, [channelId]);

  return {
    isLoading,
    initialRooms,
    channelName
  };
};

export default useFirstLoad;
