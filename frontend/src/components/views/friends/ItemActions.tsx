import React, { MouseEvent } from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { displayChannel } from 'src/store/states/channels';
import { Message as MessageIcon } from '@styled-icons/boxicons-solid';
import { DotsVerticalRounded as DotsIcon } from '@styled-icons/boxicons-regular';

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
    <div className="flex">
      <div className="action-button" onClick={openDM}>
        <MessageIcon className="white-hover action-icon" />
      </div>
      <div className="action-button">
        <DotsIcon className="white-hover action-icon" />
      </div>
    </div>
  );
};
