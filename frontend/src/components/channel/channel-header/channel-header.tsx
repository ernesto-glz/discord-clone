import React from 'react';
import { Title, AIcon, Container, FileIcon, HelpIcon } from './styles';
import { OfflineStatus } from 'src/components/images/user-status/offline';
import { OnlineStatus } from 'src/components/images/user-status/online';
import { getUserById } from 'src/redux/states/users';
import { useAppSelector } from 'src/redux/hooks';

export const ChannelHeader: React.FC = () => {
  const { activeChannel } = useAppSelector((s) => s.ui);
  const user = useAppSelector(getUserById(activeChannel?.dmUserId ?? ''));
  const isOnline = user?.status === 'ONLINE';

  return (
    <Container>
      <div className="channel-info">
        <AIcon />
        <Title style={{ marginBottom: 3 }}>{user?.username ?? 'Unknown'}</Title>
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
