import React, { useMemo } from 'react';
import { DidYouKnow } from 'src/utils/discord-tips';
import { Container, LoadingSpinner } from './styles';

interface Props {
  loading: boolean;
}

export const Loading: React.FC<Props> = ({ loading }) => {
  const randomTip = useMemo(
    () => Math.floor(Math.random() * DidYouKnow.length),
    []
  );
  return (
    <Container isVisible={loading}>
      <LoadingSpinner autoPlay muted loop>
        <source src="/assets/loading-spinner.webm" />
        <source src="/assets/loading-spinner.mp4" type="video/mp4" />
      </LoadingSpinner>
      <h4>Did you know</h4>
      <p>{DidYouKnow[randomTip]}</p>
    </Container>
  );
};
