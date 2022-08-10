import React, { useMemo, useState } from 'react';
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

export interface Props {
  message: Entity.Message;
  wrappedRef?: React.RefObject<HTMLLIElement>;
}

const Message: React.FC<Props> = ({ message, wrappedRef }) => {
  const channel = useAppSelector((s) => s.ui.activeChannel)!;
  const msgCount = useAppSelector((s) => s.messages.total[channel.id]);
  const messages = useAppSelector(getChannelMessages(channel.id));
  const loadedAllMessages = useMemo(
    () => messages.length >= msgCount,
    [messages]
  );
  const author = useAppSelector(getUserById(message.sender)) as Entity.User;
  const [focused, setFocused] = useState(false);

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
    if (!prev && loadedAllMessages) return true;
    else if (!prev && !loadedAllMessages) return false;
    return isNewDay(new Date(prev.createdAt), new Date(message.createdAt));
  };

  return (
    <React.Fragment>
      {isActuallyNewDay() && <MessageDivider date={message.createdAt!} />}
      <li
        ref={wrappedRef}
        onMouseOver={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        className={classNames('chat-message', { isExtra: isActuallyExtra })}
      >
        {isActuallyExtra ? (
          <p className="message-date">
            {focused ? getTime(message.createdAt) : ''}
          </p>
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
          <div
            className="message-content"
            dangerouslySetInnerHTML={{ __html: messageHTML }}
          />
        </div>
      </li>
    </React.Fragment>
  );
};

export default Message;
