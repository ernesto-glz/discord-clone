import { Container, WampusImage, WampusMessage } from '../styles';

export const OnlineFriends = () => (
  <Container>
    <WampusImage src="/assets/no_online_friends.svg" alt="noOnline" />
    <WampusMessage>No one&apos;s around to play with Wumpus.</WampusMessage>
  </Container>
);
