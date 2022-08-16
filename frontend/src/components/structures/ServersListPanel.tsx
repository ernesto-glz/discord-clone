import React from 'react';
import { useAppSelector } from 'src/store/hooks';
import ServerButton from '../views/servers_list/ServerButton';

const ServerList: React.FC = () => {
  const activeGuild = useAppSelector((s) => s.ui.activeGuild);

  return (
    <nav className="ServerListPanel" aria-label="Servers sidebar">
      <ul>
        <ServerButton isHome selected={activeGuild === '@me'} />
        <div className="divider" />
        <ServerButton isAddButton />
        <ServerButton isExploreButton />
      </ul>
    </nav>
  );
};

export default ServerList;
