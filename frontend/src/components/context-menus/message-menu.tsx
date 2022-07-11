import React from 'react';
import { useSelector } from 'react-redux';
import { Store } from 'types/store';
import { Entity } from '@discord/types';
import { CopyIdImage } from '../images/tiny-icons/copy-id-image';
import { CtxBody, CtxItem, MessageLink, MyCtxMenu, Separator } from './styles';

interface Props {
  message: Entity.Message;
}

const MessageMenu: React.FC<Props> = ({ message }) => {
  const activeGuild = useSelector((s: Store.AppState) => s.ui.activeGuild);

  const copyInClipboard = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  return activeGuild ? (
    // @ts-expect-error
    <MyCtxMenu id={message.id}>
      <CtxBody>
        <div>
          {/* @ts-expect-error */}
          <CtxItem
            onClick={() =>
              copyInClipboard(`${window.location.href}/${message.id}`)
            }
          >
            <p className="childLeft">Copy Message Link</p>
            <MessageLink className="childRight" />
          </CtxItem>
          <Separator />
          {/* @ts-expect-error */}
          <CtxItem
            key={message.id}
            onClick={() => copyInClipboard(message.id)}
          >
            <p className="childLeft">Copy ID</p>
            <CopyIdImage className="childRight" />
          </CtxItem>
        </div>
      </CtxBody>
    </MyCtxMenu>
  ) : null;
};

export default MessageMenu;
