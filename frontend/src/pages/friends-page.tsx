import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import ChannelList from 'src/components/views/channels_list/DMChannelsList';
import FriendsPanel from 'src/components/structures/FriendsPanel';
import FriendsHeader from 'src/components/views/friends/FriendsHeader';
import RightPanel from 'src/components/structures/RightPanel';
import ServerList from 'src/components/structures/ServersListPanel';
import UserInfo from 'src/components/structures/UserPanel';
import { useAppDispatch } from 'src/store/hooks';
import PageWrapper from './page-wrapper';
import { actions as ui } from 'src/store/states/ui';
import { ChannelsListHeader } from 'src/components/views/channels_list/ChannelsListHeader';

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
        <ServerList />
        <ChannelsListHeader />
        <ChannelList />
        <RightPanel />
        <FriendsPanel />
        <FriendsHeader />
      </section>
    </PageWrapper>
  );
};

export default FriendsPage;
