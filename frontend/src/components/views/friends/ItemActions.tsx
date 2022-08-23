import { faEllipsisV, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { displayChannel } from 'src/store/states/channels';
import { removeFriend } from 'src/store/states/users';

interface Props {
  userId: string;
}

export const FriendItemActions: React.FC<Props> = ({ userId }: Props) => {
  const dispatch = useAppDispatch();

  const openDM = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    dispatch(displayChannel(userId));
  };

  const deleteFriend = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    dispatch(removeFriend(userId));
  };

  return (
    <div className="flex">
      <div className="action-button" onClick={openDM}>
        <FontAwesomeIcon icon={faMessage} className="white-hover action-icon" />
      </div>
      <div className="action-button" onClick={deleteFriend}>
        <FontAwesomeIcon
          icon={faEllipsisV}
          className="white-hover action-icon"
        />
      </div>
    </div>
  );
};
