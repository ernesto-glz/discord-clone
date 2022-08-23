import React, { useState } from 'react';
import { Entity } from '@discord/types';
import { displayChannel } from 'src/store/states/channels';
import { FriendItemActions } from './ItemActions';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { getAvatarUrl } from 'src/utils/utils';
import { BaseAvatar } from '../avatars/BaseAvatar';
import { ListActionsMenu } from 'src/components/context-menus/list-actions/list-actions';
import { ConfirmRemoveFriend } from 'src/components/modals/ConfirmRemoveFriend/ConfirmRemoveFriend';
import classNames from 'classnames';

interface Props {
  friend: Entity.User;
}

export const FriendListItem: React.FC<Props> = ({ friend }) => {
  const [isActive, setIsActive] = useState(false);
  const users = useAppSelector((s) => s.users);
  const isOnline = users.find((u) => u.id === friend.id)?.status === 'ONLINE';
  const dispatch = useAppDispatch();

  const onClick = () => dispatch(displayChannel(friend.id));

  return (
    <React.Fragment>
      <li
        className={classNames('list-item', { active: isActive })}
        onClick={onClick}
      >
        <div>
          <div className="Profile">
            <BaseAvatar
              displayStatus={true}
              isOnline={isOnline}
              imageUrl={getAvatarUrl(friend)}
            />
            <div className="UserData">
              <strong>
                {friend.username}
                <span className="discriminator" style={{ opacity: 0 }}>
                  #{friend.discriminator}
                </span>
              </strong>

              <span className="userStatus">
                {isOnline ? 'Online' : 'Offline'}
              </span>
            </div>
          </div>
        </div>
        <FriendItemActions userId={friend.id} />
      </li>
      <ListActionsMenu user={friend} activeState={[isActive, setIsActive]} />
      <ConfirmRemoveFriend user={friend} />
    </React.Fragment>
  );
};
