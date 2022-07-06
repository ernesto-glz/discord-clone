import React, { useState } from 'react';
import ChannelData from 'src/components/channel/channel-data';
import FriendsHeader from 'src/components/friends/friend-header';
import ServerName from 'src/components/server/server-name';
import FriendsPage from 'src/components/friends';
import RightPanel from 'src/components/right-pannel';
import { useParams } from 'react-router-dom';
import PageWrapper from './page-wrapper';
import { ChannelHeader } from 'src/components/channel/channel-header/channel-header';
import { Store } from 'types/store';
import { useAppSelector } from 'src/redux/hooks';

export type Pages = 'ONLINE' | 'ALL' | 'PENDING' | 'ADD';

export const GuildPage: React.FC = () => {
  const { channelId, guildId } = useParams();
  const [page, setPage] = useState<Pages>('ONLINE');
  const activeChannel = useAppSelector((s) => s.ui.activeChannel);
  const channel = useAppSelector((s: Store.AppState) =>
    s.channels.find((c) => c._id === channelId)
  );

  return guildId ? (
    <PageWrapper pageTitle={channel?.name ?? 'Discord Clone'}>
      <ServerName />
      {activeChannel ? (
        <ChannelHeader channel={channel!} />
      ) : (
        <FriendsHeader pageState={[page, setPage]} />
      )}
      {activeChannel ? <ChannelData /> : <FriendsPage page={page} />}
      {!activeChannel && <RightPanel />}
    </PageWrapper>
  ) : null;
};
