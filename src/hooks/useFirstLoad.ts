import { useEffect } from 'react';
import { getPendingRequests } from 'src/api/friend';
import { setNotifCount } from 'src/redux/states/notification';
import { loadAbort } from 'src/utils/load-abort-axios';
import { getAllFriends, isLoadingFriends } from 'src/redux/states/friend';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import {
  fetchDMChannels,
  isLoadingDMChannels
} from 'src/redux/states/channels';
import { pageSwitched } from 'src/redux/states/ui';
import { useParams } from 'react-router-dom';
import { fetchedEntities, hasFetchedEntities } from 'src/redux/states/meta';
import { getIncoming, getOutgoing } from 'src/redux/states/requests';
import { ws } from 'src/contexts/ws.context';

const useFirstLoad = () => {
  const isLoading = useAppSelector(hasFetchedEntities);
  const loadingFriends = useAppSelector(isLoadingFriends);
  const loadingDMChannels = useAppSelector(isLoadingDMChannels);
  const loadingIncomingRQ = useAppSelector(
    (state) => state.requests.incoming.loading
  );
  const loadingOutgoingRQ = useAppSelector(
    (state) => state.requests.outgoing.loading
  );
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
    if (loadingIncomingRQ === 'idle') {
      await dispatch(getIncoming());
    }
    if (loadingOutgoingRQ === 'idle') {
      await dispatch(getOutgoing());
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
