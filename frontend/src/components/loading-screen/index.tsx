import React, { useMemo } from 'react';
import { Container, LoadingSpinner } from './styles';
import { DiscordTips } from 'src/config/constants';
import PageWrapper from 'src/pages/page-wrapper';
import { useAppSelector } from 'src/redux/hooks';

export const LoadingScreen: React.FC = () => {
  const { fetchedEntities } = useAppSelector((s) => s.meta);
  const randomTip = useMemo(
    () => Math.floor(Math.random() * DiscordTips.length),
    []
  );

  return (
    <PageWrapper pageTitle={!fetchedEntities ? 'Loading...' : undefined}>
      <Container isVisible={true}>
        <LoadingSpinner autoPlay muted loop>
          <source src="/assets/videos/loading-spinner.webm" />
          <source src="/assets/videos/loading-spinner.mp4" type="video/mp4" />
        </LoadingSpinner>
        <h4>Did you know</h4>
        <p>{DiscordTips[randomTip]}</p>
      </Container>
    </PageWrapper>
  );
};
