import React from 'react';
import { BaseAvatar } from '../avatars/BaseAvatar';

type Props = { username: string; imageUrl: string };

export const DMChannelWelcome: React.FC<Props> = (props) => {
  return (
    <div className="channel-welcome">
      <BaseAvatar customSize={80} imageUrl={props.imageUrl} />
      <h1 className="title">{props.username}</h1>
      <div className="description">
        This is the beginning of your direct message history with{' '}
        <strong>@{props.username}</strong>.
      </div>
    </div>
  );
};
