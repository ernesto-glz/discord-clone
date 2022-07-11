import React, { useEffect, useState } from 'react';
import ChannelData from 'src/components/channel/channel-data';
import FriendsHeader from 'src/components/friends/friend-header';
import ServerName from 'src/components/server/server-name';
import FriendsPage from 'src/components/friends';
import RightPanel from 'src/components/right-pannel';
import { useParams } from 'react-router-dom';
import PageWrapper from './page-wrapper';
import { ChannelHeader } from 'src/components/channel/channel-header/channel-header';
import { useAppSelector } from 'src/redux/hooks';
import { useDispatch } from 'react-redux';
import { pageSwitched } from 'src/redux/states/ui';

export type Pages = 'ONLINE' | 'ALL' | 'PENDING' | 'ADD';

export const GuildPage: React.FC = () => {
  const { channelId, guildId } = useParams();
  const [page, setPage] = useState<Pages>('ONLINE');
  const { activeGuild, activeChannel } = useAppSelector((s) => s.ui);
  const channel = useAppSelector((s) => s.channels.find((c) => c.id === channelId));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(pageSwitched({
      channel: channelId ? channel ?? null : null,
      guild: guildId ?? '@me'
    }));
  }, [channelId, guildId]);

  return (activeGuild) ? (
    <PageWrapper pageTitle={activeChannel?.name ?? 'Discord Clone'}>
      <ServerName />
      {activeChannel ? (
        <ChannelHeader />
      ) : (
        <FriendsHeader pageState={[page, setPage]} />
      )}
      {activeChannel ? <ChannelData /> : <FriendsPage page={page} />}
      {!activeChannel && <RightPanel />}
    </PageWrapper>
  ) : null;
};
