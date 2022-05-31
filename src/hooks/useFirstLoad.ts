import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { getPendingRequests } from 'src/api/friend';
import { getAllRooms } from 'src/api/room';
import { setNotifCount } from 'src/redux/states/notification';
import { loadAbort } from 'src/utils/load-abort-axios';

const useFirstLoad = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [initialRooms, setInitialRooms] = useState([]);
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

  useEffect(() => {
    fetchAllInformation();
  }, []);

  return {
    isLoading,
    initialRooms
  };
};

export default useFirstLoad;
