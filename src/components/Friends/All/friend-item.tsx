import React, { useMemo } from 'react';
import { UserImage } from 'src/components/UserImage';
import { Profile, UserData } from 'src/components/UserInfo/styles';
import { User } from 'src/models/user.model';
import { useAppSelector } from 'src/redux/hooks';
import { selectFriends } from 'src/redux/states/friend';
import { isOnline } from 'src/utils/redux';
import { FriendRequest } from '../styles';
import { FriendItemActions } from './friend-actions';

interface Props {
  friend: User;
}

export const FriendItem: React.FC<Props> = ({ friend }) => {
  const friends = useAppSelector(selectFriends);
  const friendStatus = useMemo(() => isOnline(friend._id), [friends]);

  return (
    <FriendRequest>
      <div>
        <Profile>
          <UserImage
            isGeneric={false}
            displayStatus={true}
            isOnline={friendStatus}
            imageUrl={`/assets/avatars/${friend.avatar}.png`}
          />
          <UserData>
            <strong>{friend.username}</strong>
            <span className="userStatus">
              {friend.status === 'ONLINE' ? 'Online' : 'Offline'}
            </span>
          </UserData>
        </Profile>
      </div>
      <FriendItemActions userId={friend._id} />
    </FriendRequest>
  );
};
