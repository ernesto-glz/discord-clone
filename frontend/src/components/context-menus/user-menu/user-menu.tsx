import React from 'react';
import { CopyIdImage } from '../../images/tiny-icons/copy-id-image';
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
          <CopyIdImage className="childRight" />
        </ContextItem>
      </div>
    </ContextMenu>
  ) : null;
};

export default UserMenu;
