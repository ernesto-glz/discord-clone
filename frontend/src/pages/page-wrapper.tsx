import React, { useEffect } from 'react';
import { useStore } from 'react-redux';
import { useParams } from 'react-router-dom';
import ChannelList from 'src/components/channel/channel-list';
import ServerList from 'src/components/server/server-list';
import UserInfo from 'src/components/user-info';
import { WSListeners } from 'src/components/ws-listener';
import { useAppDispatch } from 'src/redux/hooks';
import { getChannel } from 'src/redux/states/channels';
import { pageSwitched } from 'src/redux/states/ui';
import { AppGridContainer } from 'src/styled-components/app-container';
import { Store } from 'types/store';

export type PageWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pageTitle?: string };

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { channelId, guildId } = useParams();
  const dispatch = useAppDispatch();
  const store = useStore();

  useEffect(() => {
    document.title = props.pageTitle ?? 'Discord Clone';
    dispatch(
      pageSwitched({
        channel: channelId
          ? getChannel(channelId!)(store.getState() as Store.AppState) ?? null
          : null,
        guild: guildId ?? '@me'
      })
    );
  }, [channelId, guildId]);

  return (
    <React.Fragment>
      <AppGridContainer channelId={channelId ?? ''}>
        <WSListeners />
        <ServerList />
        <UserInfo />
        <ChannelList />
        {props.children}
      </AppGridContainer>
    </React.Fragment>
  );
};

export default PageWrapper;
