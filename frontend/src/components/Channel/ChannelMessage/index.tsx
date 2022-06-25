import React, { useState } from 'react';
import { UserImage } from 'src/components/UserImage';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Message as IMessage } from 'src/models/message.model';
import { dateFormatted, getTime } from 'src/utils/date';
import MessageMenu from 'src/components/context-menus/message-menu';
import { Container, Message, Header, Content } from './styles';
import { useAppSelector } from 'src/redux/hooks';
import { getFriend } from 'src/redux/states/friend';

export interface Props {
  message: IMessage;
}

const ChannelMessage: React.FC<Props> = ({ message }) => {
  const selfUser = useAppSelector((s) => s.user);
  const author =
    message.sender === selfUser._id
      ? selfUser
      : useAppSelector(getFriend(message.sender));
  const [focused, setFocused] = useState(false);

  if (message.stackMessage) {
    return (
      // @ts-expect-error
      <ContextMenuTrigger id={message._id}>
        <Container
          onMouseOver={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
          className="stackMessage"
        >
          <p className="messageDate">
            {focused ? getTime(message.createdAt) : ''}
          </p>
          <Message>
            <Content>{message.content}</Content>
          </Message>
        </Container>
        <MessageMenu message={message} />
      </ContextMenuTrigger>
    );
  }

  return (
    // @ts-expect-error
    <ContextMenuTrigger id={message._id}>
      <Container
        onMouseOver={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        className="normal"
      >
        <UserImage
          imageUrl={`/assets/avatars/${author.avatar}.png`}
          isGeneric={false}
          customSize={40}
        />
        <Message>
          <Header>
            <strong>{author.username}</strong>
            <time>{dateFormatted(message.createdAt!) ?? 'Unknown'}</time>
          </Header>
          <Content>{message.content}</Content>
        </Message>
      </Container>
      <MessageMenu message={message} />
    </ContextMenuTrigger>
  );
};

export default ChannelMessage;
