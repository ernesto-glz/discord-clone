import React, { useMemo } from 'react';
import { DiscordTips } from 'src/utils/discord-tips';
import { Container, LoadingSpinner } from './styles';

export const Loading: React.FC = () => {
  const randomTip = useMemo(
    () => Math.floor(Math.random() * DiscordTips.length),
    []
  );
  return (
    <Container isVisible={true}>
      <LoadingSpinner autoPlay muted loop>
        <source src="/assets/loading-spinner.webm" />
        <source src="/assets/loading-spinner.mp4" type="video/mp4" />
      </LoadingSpinner>
      <h4>Did you know</h4>
      <p>{DiscordTips[randomTip]}</p>
    </Container>
  );
};
