import React from 'react';
import { Pencil } from '@styled-icons/boxicons-solid';
import { TrashFill } from '@styled-icons/bootstrap';
import { Entity } from '@discord/types';
import { useAppDispatch } from 'src/redux/hooks';
import { actions as ui } from 'src/redux/states/ui';

interface Props {
  message: Entity.Message;
}

export const MessageToolbar: React.FC<Props> = ({ message }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="messageToolbar-container">
      <div
        className="toolbar-button"
        onClick={() => dispatch(ui.startedEditingMessage(message.id))}
      >
        <Pencil />
      </div>
      <div className="toolbar-button">
        <TrashFill className="dangerous" />
      </div>
    </div>
  );
};
