import React, { useEffect, useMemo } from 'react';
import { ws } from 'src/ws/websocket';
import { useAppSelector } from 'src/redux/hooks';
import { DiscordTips } from 'src/utils/discord-tips';
import { Container, LoadingSpinner } from './styles';

export const LoadingScreen: React.FC = () => {
  const isLoggedIn = useAppSelector((s) => s.user.username);
  const randomTip = useMemo(
    () => Math.floor(Math.random() * DiscordTips.length),
    []
  );

  useEffect(() => {
    if (isLoggedIn && !ws.connected) {
      ws.connect();
    }
  }, [isLoggedIn]);

  return (
    <Container isVisible={true}>
      <LoadingSpinner autoPlay muted loop>
        <source src="/assets/videos/loading-spinner.webm" />
        <source src="/assets/videos/loading-spinner.mp4" type="video/mp4" />
      </LoadingSpinner>
      <h4>Did you know</h4>
      <p>{DiscordTips[randomTip]}</p>
    </Container>
  );
};
