import React, { useEffect } from 'react';
import ChannelPanel from 'src/components/structures/ChannelPanel';
import ServerName from 'src/components/server/server-name';
import PageWrapper from './page-wrapper';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import ServerList from 'src/components/server/server-list';
import UserInfo from 'src/components/user-info';
import ChannelList from 'src/components/views/ChannelsList/DMChannelsList';
import { actions as uiActions } from 'src/redux/states/ui';
import { useParams } from 'react-router-dom';
import { getChannel } from 'src/redux/states/channels';
import { ChannelHeader } from 'src/components/views/channel/ChannelHader';

export const GuildPage: React.FC = () => {
  const { channelId, guildId }: any = useParams();
  const ui = useAppSelector((s) => s.ui);
  const channel = useAppSelector(getChannel(channelId)) ?? null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(uiActions.pageSwitched({ guild: guildId ?? '@me', channel }))
  }, [channelId])

  return (ui.activeGuild) ? (
    <PageWrapper pageTitle={`${ui.activeChannel?.name} - Discord Clone` ?? 'Discord Clone'}>
      <section className='app-section'>
        <UserInfo />
        <ServerList />
        <ServerName />
        <ChannelList />
        {ui.activeChannel && <ChannelPanel /> }
        <ChannelHeader />
      </section>
    </PageWrapper>
  ) : null;
};
