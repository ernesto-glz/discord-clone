import React from 'react';
import { Entity } from '@discord/types';
import ChannelButton from '../channel-button';
import { Container, Category, AddCategoryIcon } from './styles';
import { useAppSelector } from 'src/redux/hooks';
import { GenericButton } from '../channel-button/generic-button';

const ChannelList: React.FC = () => {
  const selfUser = useAppSelector((s) => s.auth.user)!;
  const channels = useAppSelector((s) => s.channels.filter((c) => {
      return c.type === 'DM' && selfUser.activeDMCS.includes(c.id);
    })
  );

  return (
    <Container>
      <GenericButton displayName="Friends" genericImage="FRIEND" />
      <GenericButton displayName="Nitro" genericImage="NITRO" />

      <Category>
        <span>Direct Messages</span>
        <AddCategoryIcon />
      </Category>

      {channels.length > 0 &&
        channels.map((c: Entity.Channel, i: number) => (
          <ChannelButton channel={c} key={i} />
        ))}
    </Container>
  );
};

export default ChannelList;
