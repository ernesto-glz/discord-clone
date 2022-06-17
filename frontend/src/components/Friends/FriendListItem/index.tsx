import React, { useMemo } from 'react';
import { UserImage } from 'src/components/UserImage';
import { Profile, UserData } from 'src/components/UserInfo/styles';
import { User } from 'src/models/user.model';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { displayChannel } from 'src/redux/states/channels';
import { selectFriends } from 'src/redux/states/friend';
import { isOnline } from 'src/utils/redux';
import { FriendRequest, ItemBody } from '../styles';
import { FriendItemActions } from './actions';

interface Props {
  friend: User;
}

export const FriendItem: React.FC<Props> = ({ friend }) => {
  const friends = useAppSelector(selectFriends);
  const friendStatus = useMemo(() => isOnline(friend._id), [friends]);
  const dispatch = useAppDispatch();

  return (
    <FriendRequest
      onClick={() => dispatch(displayChannel({ userId: friend._id }))}
    >
      <ItemBody>
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
      </ItemBody>
    </FriendRequest>
  );
};
