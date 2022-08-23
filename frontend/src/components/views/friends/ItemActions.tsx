import { faEllipsisV, faMessage } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { MouseEvent } from 'react';
import { MenuTrigger } from 'src/components/context-menus/menu-trigger';
import { useAppDispatch } from 'src/store/hooks';
import { displayChannel } from 'src/store/states/channels';

interface Props {
  userId: string;
}

export const FriendItemActions: React.FC<Props> = ({ userId }: Props) => {
  const dispatch = useAppDispatch();

  const openDM = (ev: MouseEvent<HTMLDivElement>) => {
    ev.stopPropagation();
    dispatch(displayChannel(userId));
  };

  return (
    <React.Fragment>
      <div className="flex">
        <div className="action-button" onClick={openDM}>
          <FontAwesomeIcon
            icon={faMessage}
            className="white-hover action-icon"
          />
        </div>
        <MenuTrigger mouseButton="left" id="friendsList-actions">
          <div className="action-button">
            <FontAwesomeIcon
              icon={faEllipsisV}
              className="white-hover action-icon"
            />
          </div>
        </MenuTrigger>
      </div>
    </React.Fragment>
  );
};
