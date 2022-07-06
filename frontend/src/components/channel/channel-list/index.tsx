import React from 'react';
import { Store } from 'types/store';
import { Entity } from '@discord/types';
import ChannelButton from '../channel-button';
import { Container, Category, AddCategoryIcon } from './styles';
import { useAppSelector } from 'src/redux/hooks';
import { getDMChannels } from 'src/redux/states/channels';
import { GenericButton } from '../channel-button/generic-button';

const ChannelList: React.FC = () => {
  const selfUser = useAppSelector((s: Store.AppState) => s.auth.user)!;
  const channels = useAppSelector(getDMChannels);

  return (
    <Container>
      <GenericButton displayName="Friends" genericImage="FRIEND" />
      <GenericButton displayName="Nitro" genericImage="NITRO" />

      <Category>
        <span>Direct Messages</span>
        <AddCategoryIcon />
      </Category>

      {channels.length > 0 &&
        channels.map((c: Entity.Channel, i: number) => {
          return (
            !selfUser.hiddenDMChannels.includes(c._id) && (
              <ChannelButton channel={c} key={i} />
            )
          );
        })}
    </Container>
  );
};

export default ChannelList;
