import React, { useState } from 'react';
import ChannelData from 'src/components/Channel/ChannelData';
import ChannelInfo from 'src/components/Channel/ChannelInfo';
import ChannelList from 'src/components/Channel/ChannelList';
import FriendsPage from 'src/components/Friends';
import { Pages } from 'src/components/Layout';
import { Loading } from 'src/components/Loading';
import RightPanel from 'src/components/RightPanel';
import ServerName from 'src/components/Server/ServerName';
import { useAppSelector } from 'src/redux/hooks';
import { hasFetchedEntities } from 'src/redux/states/meta';
import { selectActiveChannel } from 'src/redux/states/ui';

export const Me: React.FC = () => {
  const [page, setPage] = useState<Pages>('Online');
  const isLoading = useAppSelector(hasFetchedEntities);
  const activeChannel = useAppSelector(selectActiveChannel);

  return (
    <React.Fragment>
      <Loading loading={!isLoading} />
      <ServerName />
      <ChannelInfo setPage={setPage} page={page} />
      <ChannelList />
      {activeChannel ? <ChannelData /> : <FriendsPage page={page} />}
      {!activeChannel && <RightPanel />}
    </React.Fragment>
  );
};
