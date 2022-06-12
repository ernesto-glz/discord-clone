import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ChannelData from 'src/components/Channel/ChannelData';
import ChannelInfo from 'src/components/Channel/ChannelInfo';
import ChannelList from 'src/components/Channel/ChannelList';
import FriendsPage from 'src/components/Friends';
import { Pages } from 'src/components/Layout';
import { Loading } from 'src/components/Loading';
import RightPanel from 'src/components/RightPanel';
import ServerName from 'src/components/Server/ServerName';
import useFirstLoad from 'src/hooks/useFirstLoad';
import { selectActiveChannel } from 'src/redux/states/ui';

export const Me: React.FC = () => {
  const [page, setPage] = useState<Pages>('Online');
  const { isLoading, channelName } = useFirstLoad();
  const activeChannel = useSelector(selectActiveChannel);

  return (
    <React.Fragment>
      <Loading loading={isLoading} />
      <ServerName />
      <ChannelInfo
        channelId={activeChannel}
        setPage={setPage}
        page={page}
        channelName={channelName}
      />
      <ChannelList />
      {activeChannel ? (
        <ChannelData channelName={channelName} />
      ) : (
        <FriendsPage page={page} />
      )}
      {!activeChannel && <RightPanel />}
    </React.Fragment>
  );
};
