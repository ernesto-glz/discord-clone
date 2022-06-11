import { useEffect, useState } from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { selectFriends } from 'src/redux/states/friend';
import { selectUserId } from 'src/redux/states/user';
import { FriendService } from 'src/services/friend.service';
import { isOnline } from 'src/utils/redux';
import useFetchAndLoad from './useFetchAndLoad';

const useFriends = (onlyActive = false) => {
  const [isLoading, setIsLoading] = useState(true);
  const myFriends = useAppSelector(selectFriends);
  const { callEndpoint } = useFetchAndLoad();
  const [friends, setFriends] = useState([]);
  const myId = useAppSelector(selectUserId);

  const getFriends = async () => {
    const { data } = await callEndpoint(FriendService.getFriends(true));

    if (onlyActive && data?.length) {
      const withOnlineFriends = data.map((friend: any) => {
        const fromId = friend.from._id;
        const toId = friend.to._id;
        return {
          ...friend,
          online: myId === fromId ? isOnline(toId) : isOnline(fromId)
        };
      });
      setFriends(
        withOnlineFriends.filter((friend: any) => friend.online === true)
      );
      return;
    }

    setFriends(data);
  };

  useEffect(() => {
    getFriends().finally(() => setIsLoading(false));
  }, [myFriends]);

  return { friends, isLoading };
};

export default useFriends;
