import React, { useState } from 'react';
import { UserImage } from 'src/components/user-image';
import MessageMenu from 'src/components/context-menus/message-menu/message-menu';
import UserMenu from 'src/components/context-menus/user-menu/user-menu';
import { FormatService } from 'src/services/format-service';
import { Entity } from '@discord/types';
import { getUserById } from 'src/redux/states/users';
import { useAppSelector } from 'src/redux/hooks';
import { getAvatarUrl } from 'src/utils/utils';
import { MessageDivider } from 'src/components/message-divider';
import {
  Container,
  Message as MessageWrapper,
  Header,
  Content
} from './styles';
import {
  dateFormatted,
  getTime,
  isExtraForTime,
  isNewDay
} from 'src/utils/date';
import { MenuTrigger } from 'src/components/context-menus/menu-trigger';

export interface Props {
  message: Entity.Message;
  wrappedRef?: React.RefObject<HTMLDivElement>;
}

export interface ContentProps {
  mt?: number;
}

const Message: React.FC<Props> = ({ message, wrappedRef }) => {
  const messages = useAppSelector((s) => s.messages.list);
  const author = useAppSelector(getUserById(message.sender)) as Entity.User;
  const [focused, setFocused] = useState(false);

  const messageHTML = message.content
    ? new FormatService().toHTML(message.content)
    : '';

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
      <MenuTrigger id={message.id}>
        <Container
          ref={wrappedRef}
          onMouseOver={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
          className={isActuallyExtra ? 'isExtra' : 'normal'}
        >
          {isActuallyExtra ? (
            <React.Fragment>
              <p className="messageDate">
                {focused ? getTime(message.createdAt) : ''}
              </p>
            </React.Fragment>
          ) : (
            <MenuTrigger id={author.id}>
              <UserImage
                imageUrl={getAvatarUrl(author)}
                isGeneric={false}
                customSize={40}
              />
              <UserMenu user={author} />
            </MenuTrigger>
          )}
          <MessageWrapper>
            {!isActuallyExtra && (
              <Header>
                <strong>{author!.username}</strong>
                <time>{dateFormatted(message.createdAt) ?? 'Unknown'}</time>
              </Header>
            )}
            <Content
              mt={2}
              className="message"
              dangerouslySetInnerHTML={{ __html: messageHTML }}
            />
          </MessageWrapper>
        </Container>
        <MessageMenu message={message} />
      </MenuTrigger>
    </React.Fragment>
  );
};

export default Message;
