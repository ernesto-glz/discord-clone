import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import ChannelList from 'src/components/channel/channel-list';
import FriendsPageWrapper from 'src/components/friends';
import FriendsHeader from 'src/components/friends/friend-header';
import RightPanel from 'src/components/right-pannel';
import ServerList from 'src/components/server/server-list';
import ServerName from 'src/components/server/server-name';
import UserInfo from 'src/components/user-info';
import { useAppDispatch } from 'src/redux/hooks';
import { FriendsContainer } from 'src/styled-components/app-container';
import PageWrapper from './page-wrapper';
import { actions as ui } from 'src/redux/states/ui';

export type Pages = 'ONLINE' | 'ALL' | 'PENDING' | 'ADD';

const FriendsPage: React.FC = () => {
  const { channelId, guildId }: any = useParams();
  const [page, setPage] = useState<Pages>('ONLINE');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ui.pageSwitched({ guild: guildId ?? '@me', channel: null }))
  }, [channelId]);

  return (
    <PageWrapper>
      <FriendsContainer>
        <UserInfo />
        <ServerName />
        <ServerList />
        <ChannelList />
        <RightPanel />
        <FriendsPageWrapper page={page} />
        <FriendsHeader pageState={[page, setPage]} />
      </FriendsContainer>
    </PageWrapper>
  );
};

export default FriendsPage;
