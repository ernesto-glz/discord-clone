import React from 'react';
import ServerList from '../Server/ServerList';
import UserInfo from '../UserInfo';
import PageWrapper from 'src/pages/page-wrapper';
import { Outlet } from 'react-router-dom';
import { GridContainer } from './styles';
import { useSelector } from 'react-redux';
import { selectActiveChannel } from 'src/redux/states/ui';

export interface GridProps {
  channelId: string;
}
export type Pages = 'Online' | 'All' | 'Pending' | 'AddFriend';

export const Layout: React.FC = () => {
  const channelId = useSelector(selectActiveChannel);

  return (
    <PageWrapper>
      <GridContainer channelId={channelId}>
        <ServerList />
        <UserInfo />
        <Outlet />
      </GridContainer>
    </PageWrapper>
  );
};
