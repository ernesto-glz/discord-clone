import React from 'react';
import { Entity } from '@discord/types';
import { Spinner } from '../elements/Spinner';

interface Props {
  messages: Entity.Message[];
}

export const ChannelMessagesLoader: React.FC<Props> = ({ messages }) => {
  return messages.length ? (
    <div className="ChannelSpinner_Top">
      <Spinner />
    </div>
  ) : (
    <div className="ChannelSpinner_Full">
      <Spinner message="Loading channel content." />
    </div>
  );
};
