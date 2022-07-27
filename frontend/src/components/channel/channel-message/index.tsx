import React, { useState } from 'react';
import { UserImage } from 'src/components/user-image';
import { ContextMenuTrigger } from 'react-contextmenu';
import { dateFormatted, getTime, isExtraForTime } from 'src/utils/date';
import MessageMenu from 'src/components/context-menus/message-menu';
import UserMenu from 'src/components/context-menus/user-menu';
import { FormatService } from 'src/services/format-service';
import { Container, Message, Header, Content } from './styles';
import { Entity } from '@discord/types';
import { getUserById } from 'src/redux/states/users';
import { useAppSelector } from 'src/redux/hooks';

export interface Props {
  message: Entity.Message;
}

export interface ContentProps {
  mt?: number;
}

const ChannelMessage: React.FC<Props> = ({ message }) => {
  const messages = useAppSelector((s) => s.messages.list);
  const author = useAppSelector(getUserById(message.sender));
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
  }

  if (isExtra()) {
    return (
      // @ts-expect-error
      <ContextMenuTrigger holdToDisplay={-1} id={message.id}>
        <Container
          onMouseOver={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
          className="isExtra"
        >
          <p className="messageDate">
            {focused ? getTime(message.createdAt) : ''}
          </p>
          <Message>
            <Content
              className="message"
              dangerouslySetInnerHTML={{ __html: messageHTML }}
            />
          </Message>
        </Container>
        <MessageMenu message={message} />
      </ContextMenuTrigger>
    );
  }

  return (
    // @ts-expect-error
    <ContextMenuTrigger holdToDisplay={-1} id={message.id}>
      <Container
        onMouseOver={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        className="normal"
      >
        {/*  @ts-expect-error */}
        <ContextMenuTrigger holdToDisplay={-1} id={(author as Entity.User).id}>
          <UserImage
            imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${author!.avatar}.png`}
            isGeneric={false}
            customSize={40}
          />
          <UserMenu user={author as Entity.User} />
        </ContextMenuTrigger>
        <Message>
          <Header>
            <strong>{author!.username}</strong>
            <time>{dateFormatted(message.createdAt) ?? 'Unknown'}</time>
          </Header>
          <Content
            mt={2}
            className="message"
            dangerouslySetInnerHTML={{ __html: messageHTML }}
          />
        </Message>
      </Container>
      <MessageMenu message={message} />
    </ContextMenuTrigger>
  );
};

export default ChannelMessage;
