import React from 'react';
import { Entity } from '@discord/types';
import { getUserById } from 'src/store/states/users';
import { useAppSelector } from 'src/store/hooks';
import { getAvatarUrl } from 'src/utils/utils';
import { MessageDivider } from 'src/components/views/messages/MessageDivider';
import { getChannelMessages } from 'src/store/states/messages';
import { toHTML } from 'discord-markdown';
import { MessageToolbar } from './MessageToolbar';
import { MessageBox } from '../message_box/MessageBox';
import { BaseAvatar } from '../avatars/BaseAvatar';
import {
  formatDate,
  getDiffInDays,
  getDiffInMinutes,
  getTime,
} from 'src/utils/date';
import classNames from 'classnames';
import { MenuTrigger } from 'src/components/context-menus/menu-trigger';
import MessageMenu from 'src/components/context-menus/message-menu/message-menu';

export interface Props {
  message: Entity.Message;
  wrappedRef?: React.RefObject<HTMLLIElement>;
  onlyStructure?: boolean;
}

const Message: React.FC<Props> = ({ message, wrappedRef, onlyStructure }) => {
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(channel.id));
  const author = useAppSelector(getUserById(message.sender)) as Entity.User;
  const editingMessageId = useAppSelector((s) => s.ui.editingMessageId);

  const messageHTML = toHTML(message.content);

  const isExtra = () => {
    const index = messages.findIndex((m) => m.id === message.id);
    const prev = messages[index - 1];

    if (!prev) return false;

    const minSince = getDiffInMinutes(message.createdAt, prev.createdAt);
    const minsToSeparate = 5;

    return minSince < minsToSeparate && prev.sender === message.sender;
  };

  const isNewDay = () => {
    const index = messages.findIndex((m) => m.id === message.id);
    const prev = messages[index - 1];
    if (!prev) return true;

    return getDiffInDays(message.createdAt, prev.createdAt) > 0;
  };

  const isActuallyExtra = onlyStructure ? false : isExtra();
  const isActuallyNewDay = onlyStructure ? false : isNewDay();

  return (
    <MenuTrigger id={message.id}>
      {isActuallyNewDay && <MessageDivider date={message.createdAt!} />}
      <li
        ref={wrappedRef}
        className={classNames('chat-message', { isExtra: isActuallyExtra })}
      >
        {!onlyStructure && (
          <div className="message-toolbar">
            <MessageToolbar message={message} />
          </div>
        )}
        {isActuallyExtra ? (
          <p className="message-date">{getTime(message.createdAt)}</p>
        ) : (
          <BaseAvatar imageUrl={getAvatarUrl(author)} customSize={40} />
        )}
        <div className="message-wrapper">
          {!isActuallyExtra && (
            <div className="message-header">
              <span>{author.username}</span>
              <time>{formatDate(message.createdAt) ?? 'Unknown Date'}</time>
            </div>
          )}
          {editingMessageId === message.id ? (
            <MessageBox editMode={true} content={message.content} />
          ) : (
            <div
              className="message-content"
              dangerouslySetInnerHTML={{ __html: messageHTML }}
            />
          )}
        </div>
      </li>
      <MessageMenu message={message} />
    </MenuTrigger>
  );
};

export default Message;
