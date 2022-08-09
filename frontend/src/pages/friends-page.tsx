import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChannelList from 'src/components/channel/channel-list';
import FriendsPanel from 'src/components/structures/FriendsPanel';
import FriendsHeader from 'src/components/views/friends/FriendsHeader';
import RightPanel from 'src/components/structures/RightPanel';
import ServerList from 'src/components/server/server-list';
import ServerName from 'src/components/server/server-name';
import UserInfo from 'src/components/user-info';
import { useAppDispatch } from 'src/redux/hooks';
import PageWrapper from './page-wrapper';
import { actions as ui } from 'src/redux/states/ui';

const FriendsPage: React.FC = () => {
  const { channelId, guildId }: any = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(ui.pageSwitched({ guild: guildId ?? '@me', channel: null }));
  }, [channelId]);

  return (
    <PageWrapper>
      <section className="friends-section">
        <UserInfo />
        <ServerName />
        <ServerList />
        <ChannelList />
        <RightPanel />
        <FriendsPanel />
        <FriendsHeader />
      </section>
    </PageWrapper>
  );
};

export default FriendsPage;
