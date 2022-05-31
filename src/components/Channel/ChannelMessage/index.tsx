import React from 'react';
import { UserImage } from 'src/components/UserImage';
import { User } from 'src/models/user.model';
import { Container, Avatar, Message, Header, Content } from './styles';

export { Mention } from './styles';

export interface Props {
  author: User;
  date: string;
  content: string | React.ReactElement | React.ReactNode;
  stackMessage?: boolean;
}

export interface MessageProps {
  stackMessage?: boolean;
}

const ChannelMessage: React.FC<Props> = ({
  author,
  date,
  content,
  stackMessage = false
}) => {
  if (stackMessage) {
    return (
      <Container className="stackMessage">
        <Message className="stackMessage" stackMessage>
          {!stackMessage && (
            <Header>
              <strong>{author.username}</strong>
              <time>{date || 'Undetermined'}</time>
            </Header>
          )}
          <Content>{content}</Content>
        </Message>
      </Container>
    );
  }

  return (
    <Container>
      <UserImage
        imageUrl={`/assets/avatars/${author.avatar}.png`}
        isGeneric={false}
      />
      <Message>
        <Header>
          <strong>{author.username}</strong>
          <time>{date || 'Undetermined'}</time>
        </Header>
        <Content>{content}</Content>
      </Message>
    </Container>
  );
};

export default ChannelMessage;
