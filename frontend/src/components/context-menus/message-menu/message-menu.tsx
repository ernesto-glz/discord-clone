import React from 'react';
import { Entity } from '@discord/types';
import { useAppSelector } from 'src/store/hooks';
import { ContextMenu } from '../context-menu';
import { ContextItem } from '../context-item';
import { copyToClipboard } from 'src/utils/utils';
import { Image } from 'src/components/views/elements/Image';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLink } from '@fortawesome/free-solid-svg-icons';
// import { Link45deg } from '@styled-icons/bootstrap';

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
      {/* <ContextItem>
        <p className="childLeft">Copy</p>
        <p className="childRight">Ctrl+C</p>
      </ContextItem>
      <div className="divider" /> */}
      <ContextItem onClick={copyLink}>
        <p className="childLeft">Copy Message Link</p>
        <FontAwesomeIcon icon={faLink} />
      </ContextItem>
      <ContextItem key={message.id} onClick={copyMessageId}>
        <p className="childLeft">Copy ID</p>
        <div className="imageContainer">
          <Image src="/img/id.svg" className="childRight" />
        </div>
      </ContextItem>
    </ContextMenu>
  ) : null;
};

export default MessageMenu;
