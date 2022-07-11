import React, { useMemo, useState } from 'react';
import { useSelector, useStore } from 'react-redux';
import { UserImage } from 'src/components/user-image';
import { Profile, UserData } from 'src/components/user-info/styles';
import { displayChannel } from 'src/redux/states/channels';
import { isOnline } from 'src/utils/redux';
import { FriendRequest, ItemBody } from '../styles';
import { FriendItemActions } from './actions';
import { Entity } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { getFriendUsers } from 'src/redux/states/users';

interface Props {
  friend: Entity.User;
}

export const FriendItem: React.FC<Props> = ({ friend }) => {
  const store = useStore();
  const friends = useSelector(getFriendUsers());
  const friendStatus = useMemo(() => isOnline(friend.id, store), [friends]);
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
              isOnline={friendStatus}
              imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${friend.avatar}.png`}
            />
            <UserData>
              <strong>
                {friend.username}
                <span>{showDiscriminator && `#${friend.discriminator}`}</span>
              </strong>

              <span className="userStatus">
                {friend.status === 'ONLINE' ? 'Online' : 'Offline'}
              </span>
            </UserData>
          </Profile>
        </div>
        <FriendItemActions userId={friend.id} />
      </ItemBody>
    </FriendRequest>
  );
};
