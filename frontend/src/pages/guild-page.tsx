import React, { useEffect } from 'react';
import { Navigate as Redirect } from 'react-router-dom';
import ChannelPanel from 'src/components/structures/ChannelPanel';
import PageWrapper from './page-wrapper';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import ServerList from 'src/components/structures/ServersListPanel';
import UserInfo from 'src/components/structures/UserPanel';
import ChannelList from 'src/components/views/channels_list/DMChannelsList';
import { actions as uiActions } from 'src/store/states/ui';
import { useParams } from 'react-router-dom';
import { getChannel } from 'src/store/states/channels';
import { ChannelHeader } from 'src/components/views/channels/ChannelHeader';
import { ChannelsListHeader } from 'src/components/views/channels_list/ChannelsListHeader';

export const GuildPage: React.FC = () => {
  const { channelId, guildId }: any = useParams();
  const ui = useAppSelector((s) => s.ui);
  const channel = useAppSelector(getChannel(channelId)) ?? null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(uiActions.pageSwitched({ guild: guildId ?? '@me', channel }))
  }, [channelId])

  if (!channel) {
    return <Redirect to="/channels/@me" />
  }

  return (ui.activeGuild) ? (
    <PageWrapper pageTitle={`${ui.activeChannel?.name} - Discord Clone` ?? 'Discord Clone'}>
      <section className='app-section'>
        <UserInfo />
        <ServerList />
        <ChannelsListHeader />
        <ChannelList />
        {ui.activeChannel && <ChannelPanel /> }
        <ChannelHeader />
      </section>
    </PageWrapper>
  ) : null;
};
