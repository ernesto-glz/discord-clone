import React from 'react';
import { Profile, UserData } from 'src/components/user-info/styles';
import { displayChannel } from 'src/redux/states/channels';
import { FriendItemActions } from './ItemActions';
import { Entity } from '@discord/types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { getAvatarUrl } from 'src/utils/utils';
import { BaseAvatar } from '../avatars/BaseAvatar';

interface Props {
  friend: Entity.User;
}

export const FriendListItem: React.FC<Props> = ({ friend }) => {
  const users = useAppSelector((s) => s.users);
  const isOnline = users.find((u) => u.id === friend.id)?.status === 'ONLINE';
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(displayChannel(friend.id));

  return (
    <li className="list-item" onClick={onClick}>
      <div>
        <Profile>
          <BaseAvatar
            displayStatus={true}
            isOnline={isOnline}
            imageUrl={getAvatarUrl(friend)}
          />
          <UserData>
            <strong>
              {friend.username}
              <span className="discriminator" style={{ opacity: 0 }}>
                #{friend.discriminator}
              </span>
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
