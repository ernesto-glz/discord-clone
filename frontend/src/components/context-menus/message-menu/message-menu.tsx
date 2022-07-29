import React from 'react';
import { Entity } from '@discord/types';
import { CopyIdImage } from '../../images/tiny-icons/copy-id-image';
import { LinkImage, Separator } from '../styles';
import { useAppSelector } from 'src/redux/hooks';
import { ContextMenu } from '../context-menu';
import { ContextItem } from '../context-item';
import { copyToClipboard } from 'src/utils/utils';

interface Props {
  message: Entity.Message;
}

const MessageMenu: React.FC<Props> = ({ message }) => {
  const activeGuild = useAppSelector((s) => s.ui.activeGuild);

  return (activeGuild) ? (
    <ContextMenu id={message.id}>
      <div>
        <ContextItem
          onClick={() => copyToClipboard(`${window.location.href}/${message.id}`)}
        >
          <p className="childLeft">Copy Message Link</p>
          <LinkImage className="childRight" />
        </ContextItem>
        <Separator />
        <ContextItem key={message.id} onClick={() => copyToClipboard(message.id)}>
          <p className="childLeft">Copy ID</p>
          <CopyIdImage className="childRight" />
        </ContextItem>
      </div>
    </ContextMenu>
  ) : null;
};

export default MessageMenu;
