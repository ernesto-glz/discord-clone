import React, { useEffect } from 'react';
import { Outlet, useParams } from 'react-router-dom';
import ServerList from 'src/components/server/server-list';
import UserInfo from 'src/components/user-info';
import { useAppDispatch } from 'src/redux/hooks';
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
    dispatch(
      pageSwitched({ channel: channelId ?? '', guild: guildId ?? '@me' })
    );
  }, [channelId, guildId]);

  useEffect(() => {
    document.title = props.pageTitle ?? 'Discord Clone';
  }, []);

  return (
    <React.Fragment>
      <AppGridContainer channelId={channelId ?? ''}>
        <ServerList />
        <UserInfo />
        <Outlet />
      </AppGridContainer>
    </React.Fragment>
  );
};

export default PageWrapper;
