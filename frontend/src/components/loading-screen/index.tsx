import React, { useMemo } from 'react';
import { Container, LoadingSpinner } from './styles';
import { DiscordTips } from 'src/config/constants';
import PageWrapper from 'src/pages/page-wrapper';

export const LoadingScreen: React.FC = () => {
  const randomTip = useMemo(() => Math.floor(Math.random() * DiscordTips.length), []);

  return (
    <PageWrapper>
      <Container isVisible={true}>
        <LoadingSpinner autoPlay muted loop>
          <source src={`${ASSETS_PATH}/videos/loading-spinner.webm`} />
          <source src={`${ASSETS_PATH}/videos/loading-spinner.mp4`} type="video/mp4" />
        </LoadingSpinner>
        <h4>Did you know</h4>
        <p>{DiscordTips[randomTip]}</p>
      </Container>
    </PageWrapper>
  );
};
