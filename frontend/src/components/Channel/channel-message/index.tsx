import React, { useState } from 'react';
import { UserImage } from 'src/components/user-image';
import { ContextMenuTrigger } from 'react-contextmenu';
import { Message as IMessage } from 'src/models/message.model';
import { dateFormatted, getTime } from 'src/utils/date';
import MessageMenu from 'src/components/context-menus/message-menu';
import { useAppSelector } from 'src/redux/hooks';
import { getFriend } from 'src/redux/states/friend';
import { FriendUser } from 'src/models/user.model';
import UserMenu from 'src/components/context-menus/user-menu';
import { FormatService } from 'src/services/format-service';
import { Container, Message, Header, Content } from './styles';

export interface Props {
  message: IMessage;
}

export interface ContentProps {
  mt?: number;
}

const ChannelMessage: React.FC<Props> = ({ message }) => {
  // TODO: Change getFriend with global Users state
  const author = useAppSelector(getFriend(message.sender));
  const [focused, setFocused] = useState(false);

  const messageHTML = message.content
    ? new FormatService().toHTML(message.content)
    : '';

  if (message.stackMessage) {
    return (
      // @ts-expect-error
      <ContextMenuTrigger holdToDisplay={-1} id={message._id}>
        <Container
          onMouseOver={() => setFocused(true)}
          onMouseLeave={() => setFocused(false)}
          className="stackMessage"
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
    <ContextMenuTrigger holdToDisplay={-1} id={message._id}>
      <Container
        onMouseOver={() => setFocused(true)}
        onMouseLeave={() => setFocused(false)}
        className="normal"
      >
        {/*  @ts-expect-error */}
        <ContextMenuTrigger holdToDisplay={-1} id={(author as FriendUser)._id}>
          <UserImage
            imageUrl={`${process.env.REACT_APP_API_ROOT}/assets/avatars/${author.avatar}.png`}
            isGeneric={false}
            customSize={40}
          />
          <UserMenu user={author as FriendUser} />
        </ContextMenuTrigger>
        <Message>
          <Header>
            <strong>{author.username}</strong>
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
