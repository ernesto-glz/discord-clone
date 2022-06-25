import React, { useState } from 'react';
import ChannelData from 'src/components/Channel/ChannelData';
import ChannelInfo from 'src/components/Channel/ChannelInfo';
import ChannelList from 'src/components/Channel/ChannelList';
import ServerName from 'src/components/Server/ServerName';
import FriendsPage from 'src/components/Friends';
import RightPanel from 'src/components/RightPanel';
import { useAppSelector } from 'src/redux/hooks';
import { selectActiveChannel } from 'src/redux/states/ui';

export type Pages = 'ONLINE' | 'ALL' | 'PENDING' | 'ADD';

export const Me: React.FC = () => {
  const [page, setPage] = useState<Pages>('ONLINE');
  const activeChannel = useAppSelector(selectActiveChannel);

  return (
    <React.Fragment>
      <ServerName />
      <ChannelInfo setPage={setPage} page={page} />
      <ChannelList />
      {activeChannel ? <ChannelData /> : <FriendsPage page={page} />}
      {!activeChannel && <RightPanel />}
    </React.Fragment>
  );
};
