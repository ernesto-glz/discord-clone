import React from 'react';
import { useAppSelector } from 'src/store/hooks';
import ServerButton from '../server-button';
import { Container, Separator } from './styles';

const ServerList: React.FC = () => {
  const activeGuild = useAppSelector((s) => s.ui.activeGuild);

  return (
    <Container>
      <ServerButton isHome selected={activeGuild === '@me'} />
      <Separator />
      <ServerButton isAddButton />
      <ServerButton isExploreButton />
      {/* <ServerButton />
      <ServerButton hasNotifications />
      <ServerButton mentions={3} />
      <ServerButton mentions={100} /> */}
    </Container>
  );
};

export default ServerList;
