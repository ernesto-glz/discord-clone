import React from 'react';
import { Entity } from '@discord/types';
import { ContextMenu } from '../context-menu';
import { ContextItem } from '../context-item';
import { copyToClipboard } from 'src/utils/utils';
import { Image } from 'src/components/views/elements/Image';
import { Link45deg } from '@styled-icons/bootstrap';

interface Props {
  user: Entity.User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const href = window.location.href;

  const copyUserLink = () => copyToClipboard(`${href}/${user.id}`);
  const copyUserId = () => copyToClipboard(user.id);

  return user ? (
    <ContextMenu id={user.id}>
      <div>
        <ContextItem onClick={copyUserLink}>
          <p className="childLeft">Copy User Link</p>
          <Link45deg width={18} height={18} className="childRight" />
        </ContextItem>
        <div className="divider" />
        <ContextItem key={user.id} onClick={copyUserId}>
          <p className="childLeft">Copy ID</p>
          <Image src="/img/id.svg" className="childRight" />
        </ContextItem>
      </div>
    </ContextMenu>
  ) : null;
};

export default UserMenu;
