import { Outlet, useParams } from 'react-router-dom';
import React from 'react';
import { GridContainer } from './styles';
import ServerList from '../Server/ServerList';
import UserInfo from '../UserInfo';

export interface GridProps {
  channelId: string | boolean | undefined | null;
}
export type Pages = 'Online' | 'All' | 'Pending' | 'AddFriend';

export const Layout: React.FC = () => {
  const { channelId } = useParams();

  return (
    <GridContainer channelId={channelId}>
      <ServerList />
      <UserInfo />
      <Outlet />
    </GridContainer>
  );
};
