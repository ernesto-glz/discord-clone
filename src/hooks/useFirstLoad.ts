import { useEffect, useState } from 'react';
import { getPendingRequests } from 'src/api/friend';
import { setNotifCount } from 'src/redux/states/notification';
import { RoomService } from 'src/services/room.service';
import { loadAbort } from 'src/utils/load-abort-axios';
import { getAllFriends, isLoadingFriends } from 'src/redux/states/friend';
import useFetchAndLoad from './useFetchAndLoad';
import { selectUsername } from 'src/redux/states/user';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useWS } from 'src/contexts/ws.context';
import { fetchDMChannels } from 'src/redux/states/channels';
import { pageSwitched } from 'src/redux/states/ui';
import { useParams } from 'react-router-dom';

const useFirstLoad = () => {
  const ws = useWS();
  const { callEndpoint } = useFetchAndLoad();
  const [isLoading, setIsLoading] = useState(true);
  const [channelName, setChannelName] = useState(null);
  const loadingFriends = useAppSelector(isLoadingFriends);
  const myUsername = useAppSelector(selectUsername);
  const dispatch = useAppDispatch();
  const { channelId } = useParams();

  const fetchFriends = async () => {
    if (loadingFriends === 'idle') {
      await dispatch(getAllFriends());
      ws.emit('GET_FRIENDS_STATUS');
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
    await fetchNotifications();
    await fetchFriends();
    await dispatch(fetchDMChannels());

    // just for simulation
    setTimeout(() => {
      setIsLoading(false);
    }, 2000);
  };

  const fetchChannelInfo = async () => {
    if (channelId) {
      dispatch(pageSwitched(channelId));
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
    channelName
  };
};

export default useFirstLoad;
