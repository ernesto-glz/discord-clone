import { useEffect } from 'react';
import { getPendingRequests } from 'src/api/friend';
import { setNotifCount } from 'src/redux/states/notification';
import { loadAbort } from 'src/utils/load-abort-axios';
import { getAllFriends, isLoadingFriends } from 'src/redux/states/friend';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { useWS } from 'src/contexts/ws.context';
import {
  fetchDMChannels,
  isLoadingDMChannels
} from 'src/redux/states/channels';
import { pageSwitched } from 'src/redux/states/ui';
import { useParams } from 'react-router-dom';
import { fetchedEntities, hasFetchedEntities } from 'src/redux/states/meta';

const useFirstLoad = () => {
  const ws = useWS();
  const isLoading = useAppSelector(hasFetchedEntities);
  const loadingFriends = useAppSelector(isLoadingFriends);
  const loadingDMChannels = useAppSelector(isLoadingDMChannels);
  const dispatch = useAppDispatch();
  const { channelId } = useParams();

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
    if (loadingFriends === 'idle') {
      await dispatch(getAllFriends());
      ws.emit('GET_FRIENDS_STATUS');
    }
    if (loadingDMChannels === 'idle') {
      await dispatch(fetchDMChannels());
    }

    // just for simulation
    setTimeout(() => {
      dispatch(fetchedEntities());
    }, 2000);
  };

  useEffect(() => {
    fetchAllInformation();
  }, []);

  useEffect(() => {
    dispatch(pageSwitched(channelId));
  }, [channelId]);

  return { isLoading };
};

export default useFirstLoad;
