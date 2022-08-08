import React from 'react';
import { LinkImage, Separator } from '../styles';
import { Entity } from '@discord/types';
import { ContextMenu } from '../context-menu';
import { ContextItem } from '../context-item';
import { copyToClipboard } from 'src/utils/utils';

interface Props {
  user: Entity.User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  return (user) ? (
    <ContextMenu id={user.id}>
      <div>
        <ContextItem onClick={() => copyToClipboard(`${window.location.href}/${user.id}`)}>
          <p className="childLeft">Copy User Link</p>
          <LinkImage className="childRight" />
        </ContextItem>
        <Separator />
        <ContextItem key={user.id} onClick={() => copyToClipboard(user.id)}>
          <p className="childLeft">Copy ID</p>
          <img src={`${ASSETS_PATH}img/id.svg`} className="childRight" />
        </ContextItem>
      </div>
    </ContextMenu>
  ) : null;
};

export default UserMenu;
