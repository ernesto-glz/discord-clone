import React from 'react';
import { useAppSelector } from 'src/redux/hooks';
import { getFriend } from 'src/redux/states/friend';
import { Channel } from 'src/redux/states/channels';
import { Title, AIcon, Container, FileIcon, HelpIcon } from './styles';
import { OfflineStatus } from 'src/components/images/user-status/offline';
import { OnlineStatus } from 'src/components/images/user-status/online';

type Props = { channel: Channel };

export const ChannelHeader: React.FC<Props> = ({ channel }) => {
  const user = useAppSelector(getFriend(channel?.dmUser?._id ?? ''));
  const isOnline = user?.status === 'ONLINE';

  return (
    <Container>
      <div className="channel-info">
        <AIcon />
        <Title style={{ marginBottom: 3 }}>{channel?.name ?? 'Unknown'}</Title>
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
