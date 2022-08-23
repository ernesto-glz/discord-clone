import { Entity } from '@discord/types';
import React from 'react';
import { useAppDispatch } from 'src/store/hooks';
import { actions as ui } from 'src/store/states/ui';
import { ContextItem } from '../context-item';
import { ContextMenu } from '../context-menu';

export interface Props {
  activeState: [any, any];
  user: Entity.User;
}

export const ListActionsMenu: React.FC<Props> = (props) => {
  const [, setIsActive] = props.activeState;
  const dispatch = useAppDispatch();

  const openConfirm = () => dispatch(ui.openedModal('ConfirmRemoveFriend'));

  return (
    <ContextMenu
      onShow={() => setIsActive(true)}
      onHide={() => setIsActive(false)}
      id="friendsList-actions"
    >
      <ContextItem onClick={openConfirm} danger>
        Remove Friend
      </ContextItem>
    </ContextMenu>
  );
};
