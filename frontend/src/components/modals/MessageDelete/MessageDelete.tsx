import React from 'react';
import Message from 'src/components/views/messages/Message';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { deleteMessage } from 'src/store/states/messages';
import { actions as ui } from 'src/store/states/ui';
import { ModalBuilder } from '../ModalBuilder';

export const MessageDelete = () => {
  const dispatch = useAppDispatch();
  const target = useAppSelector((s) => s.ui.deleteMessageTarget);
  const message = useAppSelector((s) =>
    s.messages.list.find((m) => m.id === target?.messageId)
  );

  const handleClose = () => {
    dispatch(ui.setDeleteMessageTarget({}));
    dispatch(ui.closedModal('MessageDelete'));
  };
  const handleDeleteMessage = () => {
    const { channelId, messageId } = target;
    deleteMessage({ channelId, messageId });
    handleClose();
  };

  return target?.messageId && message ? (
    <ModalBuilder
      name="MessageDelete"
      background={true}
      header={
        <div className="LogoutConfirmHeader deleteMessageHeader">
          <div className="title">Delete Message</div>
          <div className="description">
            Are you sure you want to delete this message?
          </div>
        </div>
      }
      body={
        <div className="deleteMessageBody">
          <Message message={message} onlyStructure />
        </div>
      }
      footer={
        <React.Fragment>
          <button className="transparent-button" onClick={handleClose}>
            Cancel
          </button>
          <button
            className="button contained-button"
            data-variant="danger"
            onClick={handleDeleteMessage}
          >
            Delete
          </button>
        </React.Fragment>
      }
    />
  ) : null;
};
