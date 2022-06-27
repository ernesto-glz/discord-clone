import React, { useState } from 'react';
import ChannelData from 'src/components/channel/channel-data';
import ChannelInfo from 'src/components/channel/channel-info';
import ChannelList from 'src/components/channel/channel-list';
import ServerName from 'src/components/server/server-name';
import FriendsPage from 'src/components/friends';
import RightPanel from 'src/components/right-pannel';
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
