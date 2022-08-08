import React, { useState } from 'react';
import { UserImage } from 'src/components/user-image';
import { Profile, UserData } from 'src/components/user-info/styles';
import { displayChannel } from 'src/redux/states/channels';
import { FriendItemActions } from './ItemActions';
import { Entity } from '@discord/types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getAvatarUrl } from 'src/utils/utils';

interface Props {
  friend: Entity.User;
}

export const FriendListItem: React.FC<Props> = ({ friend }) => {
  const users = useAppSelector((s) => s.users);
  const isOnline =
    users.find((u) => u.id === friend.id)?.status === 'ONLINE' ?? false;
  const [showDiscriminator, setShowDiscriminator] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <li
      className="list-item"
      onMouseOver={() => setShowDiscriminator(true)}
      onMouseLeave={() => setShowDiscriminator(false)}
      onClick={() => dispatch(displayChannel(friend.id))}
    >
      <div>
        <Profile>
          <UserImage
            displayStatus={true}
            isOnline={isOnline}
            imageUrl={getAvatarUrl(friend)}
          />
          <UserData>
            <strong>
              {friend.username}
              <span>{showDiscriminator && `#${friend.discriminator}`}</span>
            </strong>

            <span className="userStatus">
              {isOnline ? 'Online' : 'Offline'}
            </span>
          </UserData>
        </Profile>
      </div>
      <FriendItemActions userId={friend.id} />
    </li>
  );
};
