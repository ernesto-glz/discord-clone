import React from 'react';
import { Entity } from '@discord/types';
import ChannelButton from './DMChannelButton';
import { useAppSelector } from 'src/store/hooks';
import { GenericListButton } from './GenericListButton';
import { getDMChannels } from 'src/store/states/channels';
import { EmptyDMS } from 'src/components/images/EmptyDMS';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const ChannelList: React.FC = () => {
  const DMChannels = useAppSelector(getDMChannels());

  return (
    <div className="channels-list">
      <GenericListButton displayName="Friends" genericImage="FRIEND" />
      <GenericListButton displayName="Nitro" genericImage="NITRO" />

      <div className="privateChannelsHeader">
        <span>Direct Messages</span>
        <FontAwesomeIcon icon={faPlus} />
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
