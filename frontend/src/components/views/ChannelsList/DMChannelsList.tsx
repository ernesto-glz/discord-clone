import React from 'react';
import { Entity } from '@discord/types';
import ChannelButton from './DMChannelButton';
import { useAppSelector } from 'src/redux/hooks';
import { GenericListButton } from './GenericListButton';
import { getDMChannels } from 'src/redux/states/channels';
import { Add } from '@styled-icons/material';
import { EmptyDMS } from 'src/components/images/EmptyDMS';

const ChannelList: React.FC = () => {
  const DMChannels = useAppSelector(getDMChannels());

  return (
    <div className="channels-list">
      <GenericListButton displayName="Friends" genericImage="FRIEND" />
      <GenericListButton displayName="Nitro" genericImage="NITRO" />

      <div className="privateChannelsHeader">
        <span>Direct Messages</span>
        <Add />
      </div>

      {DMChannels.length > 0 ? (
        DMChannels.map((channel: Entity.Channel) => (
          <ChannelButton channel={channel} key={channel.id} />
        ))
      ) : (
        <div style={{ width: '100%' }}>
          <EmptyDMS />
        </div>
      )}
    </div>
  );
};

export default ChannelList;
