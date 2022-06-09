import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getFriends, getPendingRequests } from 'src/api/friend';
import { getAllRooms } from 'src/api/room';
import { setNotifCount } from 'src/redux/states/notification';
import { RoomService } from 'src/services/room.service';
import { loadAbort } from 'src/utils/load-abort-axios';
import { selectFriends, setFriends } from 'src/redux/states/friend';
import useFetchAndLoad from './useFetchAndLoad';
import { selectUsername } from 'src/redux/states/user';

const useFirstLoad = (channelId?: string) => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRooms, setInitialRooms] = useState([]);
  const myUsername = useSelector(selectUsername);
  const friends = useSelector(selectFriends);
  const { callEndpoint } = useFetchAndLoad();
  const [channelName, setChannelName] = useState(null);
  const dispatch = useDispatch();

  const fetchFriends = async () => {
    const { data } = await getFriends(loadAbort());
    if (data?.length) {
      const myFriends = data.map((friend: any) => {
        if (friend.from.username === myUsername) {
          return { userId: friend.to._id, status: 'offline' };
        } else {
          return { userId: friend.from._id, status: 'offline' };
        }
      });
      console.log('data -> ', myFriends);
      dispatch(setFriends(myFriends));
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
    fetchFriends();
  }, [channelName]);

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
