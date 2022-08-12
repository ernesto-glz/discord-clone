import React from 'react';
import { UserImage } from 'src/components/user-image';
import { Entity } from '@discord/types';
import { getUserById } from 'src/redux/states/users';
import { useAppSelector } from 'src/redux/hooks';
import { getAvatarUrl } from 'src/utils/utils';
import { MessageDivider } from 'src/components/views/messages/MessageDivider';
import {
  dateFormatted,
  getTime,
  isExtraForTime,
  isNewDay,
} from 'src/utils/date';
import { getChannelMessages } from 'src/redux/states/messages';
import { toHTML } from 'discord-markdown';
import classNames from 'classnames';
import { MessageToolbar } from './MessageToolbar';
import { MessageBox } from '../MessageBox/MessageBox';

export interface Props {
  message: Entity.Message;
  wrappedRef?: React.RefObject<HTMLLIElement>;
}

const Message: React.FC<Props> = ({ message, wrappedRef }) => {
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const messages = useAppSelector(getChannelMessages(channel.id));
  const author = useAppSelector(getUserById(message.sender)) as Entity.User;
  const editingMessageId = useAppSelector((s) => s.ui.editingMessageId);

  const messageHTML = toHTML(message.content);

  const isExtra = () => {
    const index = messages.findIndex((m) => m.id === message.id);
    const prev = messages[index - 1];

    if (!prev) return false;

    const minSince = isExtraForTime(prev.createdAt, message.createdAt);
    return minSince && prev.sender === message.sender;
  };

  const isActuallyExtra = isExtra();
  const isActuallyNewDay = () => {
    const index = messages.findIndex((m) => m.id === message.id);
    const prev = messages[index - 1];
    if (!prev) return true;
    return isNewDay(new Date(prev.createdAt), new Date(message.createdAt));
  };

  return (
    <React.Fragment>
      {isActuallyNewDay() && <MessageDivider date={message.createdAt!} />}
      <li
        ref={wrappedRef}
        className={classNames('chat-message', { isExtra: isActuallyExtra })}
      >
        <div className="message-toolbar">
          <MessageToolbar message={message} />
        </div>
        {isActuallyExtra ? (
          <p className="message-date">{getTime(message.createdAt)}</p>
        ) : (
          <UserImage imageUrl={getAvatarUrl(author)} customSize={40} />
        )}
        <div className="message-wrapper">
          {!isActuallyExtra && (
            <div className="message-header">
              <span>{author.username}</span>
              <time>{dateFormatted(message.createdAt) ?? 'Unknown Date'}</time>
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
    </React.Fragment>
  );
};

export default Message;
