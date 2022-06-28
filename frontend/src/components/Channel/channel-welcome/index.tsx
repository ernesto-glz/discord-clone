import React from 'react';
import { AvatarImage } from 'src/components/user-image/styles';
import { WelcomeContainer } from './styles';

type Props = { username: string; imageUrl: string };

export const ChannelWelcome: React.FC<Props> = (props) => {
  return (
    <WelcomeContainer>
      <AvatarImage customSize={80} customHeight={80} src={props.imageUrl} />
      <h1>{props.username}</h1>
      <div>
        This is the beginning of your direct message history with{' '}
        <strong>@{props.username}</strong>.
      </div>
    </WelcomeContainer>
  );
};
