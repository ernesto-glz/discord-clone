import { useEffect, useState } from 'react';
import { FriendService } from 'src/services/friend.service';
import useFetchAndLoad from './useFetchAndLoad';

const useFriends = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { callEndpoint } = useFetchAndLoad();
  const [friends, setFriends] = useState([]);

  const getFriends = async () => {
    const { data } = await callEndpoint(FriendService.getFriends(true));
    setFriends(data);
  };

  useEffect(() => {
    getFriends().finally(() => setIsLoading(false));
  }, []);

  return { friends, isLoading };
};

export default useFriends;
