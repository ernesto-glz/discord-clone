import React from 'react';
import { useAppDispatch } from 'src/redux/hooks';
import { addChannel } from 'src/redux/states/channels';
import { ActionButton, DotsIcon, MessageIcon, RequestActions } from '../styles';

interface Props {
  userId: string;
}

export const FriendItemActions: React.FC<Props> = ({ userId }: Props) => {
  const dispatch = useAppDispatch();

  return (
    <RequestActions>
      <ActionButton
        onClick={(e) => {
          e.stopPropagation();
          dispatch(addChannel({ userId, guildId: 'DM' }));
        }}
      >
        <MessageIcon className="message" />
      </ActionButton>
      <ActionButton>
        <DotsIcon className="message" />
      </ActionButton>
    </RequestActions>
  );
};
