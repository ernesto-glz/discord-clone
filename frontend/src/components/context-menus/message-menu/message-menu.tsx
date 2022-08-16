import React from 'react';
import { Entity } from '@discord/types';
import { useAppSelector } from 'src/store/hooks';
import { ContextMenu } from '../context-menu';
import { ContextItem } from '../context-item';
import { copyToClipboard } from 'src/utils/utils';
import { Image } from 'src/components/views/elements/Image';
import { Link45deg } from '@styled-icons/bootstrap';

interface Props {
  message: Entity.Message;
}

const MessageMenu: React.FC<Props> = ({ message }) => {
  const href = window.location.href;
  const activeGuild = useAppSelector((s) => s.ui.activeGuild);

  const copyLink = () => copyToClipboard(`${href}/${message.id}`);
  const copyMessageId = () => copyToClipboard(message.id);

  return activeGuild ? (
    <ContextMenu id={message.id}>
      <div>
        <ContextItem onClick={copyLink}>
          <p className="childLeft">Copy Message Link</p>
          <Link45deg width={18} height={18} className="childRight" />
        </ContextItem>
        <div className="divider" />
        <ContextItem key={message.id} onClick={copyMessageId}>
          <p className="childLeft">Copy ID</p>
          <Image src="/img/id.svg" className="childRight" />
        </ContextItem>
      </div>
    </ContextMenu>
  ) : null;
};

export default MessageMenu;
