import React from 'react';
import { Entity } from '@discord/types';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { deleteMessage } from 'src/store/states/messages';

interface Props {
  message: Entity.Message;
}

export const MessageToolbar: React.FC<Props> = ({ message }) => {
  const self = useAppSelector((s) => s.auth.user)!;
  const dispatch = useAppDispatch();
  const channelId = useAppSelector((s) => s.ui.activeChannel!.id);
  const editingMessageId = useAppSelector((s) => s.ui.editingMessageId);

  const openDeleteConfirm = () => {
    if (editingMessageId) dispatch(ui.stoppedEditingMessage());
    dispatch(ui.setDeleteMessageTarget({ messageId: message.id, channelId }));
    dispatch(ui.openedModal('MessageDelete'));
  }

  return self.id === message.sender ? (
    <div className="messageToolbar-container">
      <div
        className="toolbar-button"
        onClick={() => dispatch(ui.startedEditingMessage(message.id))}
      >
        <FontAwesomeIcon icon={faPencil} />
      </div>
      <div className="toolbar-button" onClick={openDeleteConfirm}>
        <FontAwesomeIcon icon={faTrashAlt} className="dangerous" />
      </div>
    </div>
  ) : null;
};
