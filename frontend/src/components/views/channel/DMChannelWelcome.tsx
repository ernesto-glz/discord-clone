import React from 'react';
import { AvatarImage } from 'src/components/user-image/styles';

type Props = { username: string; imageUrl: string };

export const DMChannelWelcome: React.FC<Props> = (props) => {
  return (
    <div className="channel-welcome">
      <AvatarImage customSize={80} customHeight={80} src={props.imageUrl} />
      <h1 className="title">{props.username}</h1>
      <div className="description">
        This is the beginning of your direct message history with{' '}
        <strong>@{props.username}</strong>.
      </div>
    </div>
  );
};
