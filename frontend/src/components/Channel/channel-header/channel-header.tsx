import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getFriend } from 'src/redux/states/friend';
import { Channel, selectChannelName } from 'src/redux/states/channels';
import { Title, AIcon, Container, FileIcon, HelpIcon } from './styles';
import { OfflineStatus } from 'src/components/Images/user-status/offline';
import { OnlineStatus } from 'src/components/Images/user-status/online';

type Props = { channel: Channel };

export const ChannelHeader: React.FC<Props> = (props) => {
  const channelName = useAppSelector(selectChannelName);
  const user = useAppSelector(getFriend(props.channel?.dmUser?._id ?? '')) as any;
  const isOnline = user?.status === 'ONLINE';

  return (
    <Container>
      <div className="channel-info">
        <AIcon />
        <Title style={{ marginBottom: 3 }}>{channelName ?? 'Unknown'}</Title>
        {isOnline ? (
          <OnlineStatus styles={{ marginLeft: 6, marginTop: 2 }} />
        ) : (
          <OfflineStatus styles={{ marginLeft: 6, marginTop: 2 }} />
        )}
      </div>

      <div className="actions">
        <FileIcon />
        <HelpIcon />
      </div>
    </Container>
  );
};
