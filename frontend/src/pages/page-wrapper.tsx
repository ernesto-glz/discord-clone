import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import ChannelList from 'src/components/channel/channel-list';
import ServerList from 'src/components/server/server-list';
import UserInfo from 'src/components/user-info';
import { WSListeners } from 'src/components/ws-listener';
import { useAppSelector } from 'src/redux/hooks';
import { AppGridContainer } from 'src/styled-components/app-container';

export type PageWrapperProps = React.DetailedHTMLProps<
  React.HTMLAttributes<HTMLDivElement>,
  HTMLDivElement
> & { pageTitle?: string };

const PageWrapper: React.FC<PageWrapperProps> = (props) => {
  const activeChannel = useAppSelector((s) => s.ui.activeChannel);
  const { channelId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    document.title = props.pageTitle ?? 'Discord Clone';
    if (!activeChannel && channelId) navigate('/channels/@me')
  }, [])

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
