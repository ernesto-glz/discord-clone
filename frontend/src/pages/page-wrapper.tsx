import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ServerList from 'src/components/server/server-list';
import UserInfo from 'src/components/user-info';
import store from 'src/redux/configure-store';
import { useAppDispatch } from 'src/redux/hooks';
import { getChannel } from 'src/redux/states/channels';
import { pageSwitched } from 'src/redux/states/ui';
import { AppGridContainer } from 'src/styled-components/app-container';

export type PageWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pageTitle?: string };

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const { channelId, guildId } = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    document.title = props.pageTitle ?? 'Discord Clone';
    dispatch(
      pageSwitched({
        channel: channelId
          ? getChannel(channelId!)(store.getState()) ?? null
          : null,
        guild: guildId ?? '@me'
      })
    );
  }, [channelId, guildId]);

  return (
    <React.Fragment>
      <AppGridContainer channelId={channelId ?? ''}>
        <ServerList />
        <UserInfo />
        {props.children}
      </AppGridContainer>
    </React.Fragment>
  );
};

export default PageWrapper;
