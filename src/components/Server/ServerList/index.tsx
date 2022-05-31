import React from 'react';
import ServerButton from '../ServerButton';
import { Container, Separator } from './styles';

const ServerList: React.FC = () => (
  <Container>
    <ServerButton isHome />
    <Separator />
    {/* <ServerButton />
      <ServerButton hasNotifications />
      <ServerButton mentions={3} />
      <ServerButton mentions={100} /> */}
  </Container>
);

export default ServerList;
