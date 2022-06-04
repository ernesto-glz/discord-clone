import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingRequests } from 'src/api/friend';
import { getAllRooms } from 'src/api/room';
import { UserState } from 'src/models/user.model';
import { setNotifCount } from 'src/redux/states/notification';
import { RoomService } from 'src/services/room.service';
import { loadAbort } from 'src/utils/load-abort-axios';
import useFetchAndLoad from './useFetchAndLoad';

const useFirstLoad = (channelId?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRooms, setInitialRooms] = useState([]);
  const myUsername = useSelector((state: UserState) => state.user.username);
  const { callEndpoint } = useFetchAndLoad();
  const [channelName, setChannelName] = useState(null);
  const dispatch = useDispatch();

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
