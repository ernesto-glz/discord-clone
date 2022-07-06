import React from 'react';
import { CopyIdImage } from '../images/tiny-icons/copy-id-image';
import { CtxBody, CtxItem, MessageLink, MyCtxMenu, Separator } from './styles';
import { Entity } from '@discord/types';

interface Props {
  user: Entity.User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const copyInClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return (
    // @ts-expect-error
    <MyCtxMenu id={user._id}>
      <CtxBody>
        <div>
          {/* @ts-expect-error */}
          <CtxItem
            onClick={() =>
              copyInClipboard(`${window.location.href}/${user._id}`)
            }
          >
            <p className="childLeft">Copy User Link</p>
            <MessageLink className="childRight" />
          </CtxItem>
          <Separator />
          {/* @ts-expect-error */}
          <CtxItem key={user._id} onClick={() => copyInClipboard(user._id)}>
            <p className="childLeft">Copy ID</p>
            <CopyIdImage className="childRight" />
          </CtxItem>
        </div>
      </CtxBody>
    </MyCtxMenu>
  );
};

export default UserMenu;
