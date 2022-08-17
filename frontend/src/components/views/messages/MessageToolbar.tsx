import React from 'react';
import { Entity } from '@discord/types';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

interface Props {
  message: Entity.Message;
}

export const MessageToolbar: React.FC<Props> = ({ message }) => {
  const self = useAppSelector((s) => s.auth.user)!;
  const dispatch = useAppDispatch();

  return self.id === message.sender ? (
    <div className="messageToolbar-container">
      <div
        className="toolbar-button"
        onClick={() => dispatch(ui.startedEditingMessage(message.id))}
      >
        <FontAwesomeIcon icon={faPencil} />
      </div>
      <div className="toolbar-button">
        <FontAwesomeIcon icon={faTrashAlt} className="dangerous" />
      </div>
    </div>
  ) : null;
};
