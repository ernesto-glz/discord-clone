import React from 'react';
import { Entity } from '@discord/types';
import { useAppDispatch } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { removeFriend } from 'src/store/states/users';
import { ModalBuilder } from '../ModalBuilder';

interface Props {
  user: Entity.User;
}

export const ConfirmRemoveFriend: React.FC<Props> = (props) => {
  const dispatch = useAppDispatch();

  const close = () => dispatch(ui.closedModal('ConfirmRemoveFriend'));
  const triggerRemoveFriend = () => {
    close();
    dispatch(removeFriend(props.user.id));
  };

  return (
    <ModalBuilder
      name="ConfirmRemoveFriend"
      background={true}
      closeButton={true}
      header={
        <div className="LogoutConfirmHeader">
          <div className="title">Remove '{props.user.username}'</div>
          <div className="description">
            Are you sure you want to permanently remove {props.user.username}{' '}
            from your friends?
          </div>
        </div>
      }
      footer={
        <React.Fragment>
          <button className="button transparent-button" onClick={close}>
            Cancel
          </button>
          <button
            className="button contained-button"
            data-variant="danger"
            onClick={triggerRemoveFriend}
          >
            Remove Friend
          </button>
        </React.Fragment>
      }
    />
  );
};
