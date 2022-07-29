import React, { useEffect } from 'react';
import ChannelPanel from 'src/components/channel/channel-panel';
import ServerName from 'src/components/server/server-name';
import PageWrapper from './page-wrapper';
import { ChannelHeader } from 'src/components/channel/channel-header/channel-header';
import { useAppDispatch, useAppSelector } from 'src/redux/hooks';
import { AppGridContainer } from 'src/styled-components/app-container';
import ServerList from 'src/components/server/server-list';
import UserInfo from 'src/components/user-info';
import ChannelList from 'src/components/channel/channel-list';
import { actions as uiActions } from 'src/redux/states/ui';
import { useParams } from 'react-router-dom';
import { getChannel } from 'src/redux/states/channels';

export const GuildPage: React.FC = () => {
  const { channelId, guildId }: any = useParams();
  const ui = useAppSelector((s) => s.ui);
  const channel = useAppSelector(getChannel(channelId)) ?? null;
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(uiActions.pageSwitched({ guild: guildId ?? '@me', channel }))
  }, [channelId])

  return (ui.activeGuild) ? (
    <PageWrapper pageTitle={ui.activeChannel?.name ?? 'Discord Clone'}>
      <AppGridContainer>
        <UserInfo />
        <ServerList />
        <ServerName />
        <ChannelList />
        {ui.activeChannel && <ChannelPanel /> }
        <ChannelHeader />
      </AppGridContainer>
    </PageWrapper>
  ) : null;
};
