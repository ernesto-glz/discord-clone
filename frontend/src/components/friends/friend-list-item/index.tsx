import React, { useMemo, useState } from 'react';
import { UserImage } from 'src/components/user-image';
import { Profile, UserData } from 'src/components/user-info/styles';
import { displayChannel } from 'src/redux/states/channels';
import { FriendRequest, ItemBody } from '../styles';
import { FriendItemActions } from './actions';
import { Entity } from '@discord/types';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';

interface Props {
  friend: Entity.User;
}

export const FriendItem: React.FC<Props> = ({ friend }) => {
  const users = useAppSelector((s) => s.users);
  const isOnline = useMemo(() => {
    const user = users.find((u) => u.id === friend.id);
    return user?.status === 'ONLINE';
  }, [users]);
  const [showDiscriminator, setShowDiscriminator] = useState(false);
  const dispatch = useAppDispatch();

  return (
    <FriendRequest
      onMouseOver={() => setShowDiscriminator(true)}
      onMouseLeave={() => setShowDiscriminator(false)}
      onClick={() => dispatch(displayChannel(friend.id))}
    >
      <ItemBody>
        <div>
          <Profile>
            <UserImage
              isGeneric={false}
              displayStatus={true}
              isOnline={isOnline}
              imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${friend.avatar}.png`}
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
      </ItemBody>
    </FriendRequest>
  );
};
