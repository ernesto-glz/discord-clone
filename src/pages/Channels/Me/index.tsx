import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelData from 'src/components/Channel/ChannelData';
import ChannelInfo from 'src/components/Channel/ChannelInfo';
import ChannelList from 'src/components/Channel/ChannelList';
import FriendsPage from 'src/components/Friends';
import { Pages } from 'src/components/Layout';
import { Loading } from 'src/components/Loading';
import RightPanel from 'src/components/RightPanel';
import ServerName from 'src/components/Server/ServerName';
import useFirstLoad from 'src/hooks/useFirstLoad';

export const Me: React.FC = () => {
  const [page, setPage] = useState<Pages>('Online');
  const { channelId } = useParams();
  const { initialRooms, isLoading } = useFirstLoad();

  return (
    <React.Fragment>
      <Loading loading={isLoading} />
      <ServerName />
      <ChannelInfo channelId={channelId} setPage={setPage} page={page} />
      <ChannelList channelId={channelId} initialRooms={initialRooms} />
      {channelId ? (
        <ChannelData channelId={channelId} channelName="replaceMe" />
      ) : (
        <FriendsPage page={page} />
      )}
      {!channelId && <RightPanel />}
    </React.Fragment>
  );
};
