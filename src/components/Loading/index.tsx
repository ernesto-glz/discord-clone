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
        <source src="/assets/3b0d96ed8113994f3d139088726cfecd.webm" />
        <source
          src="/assets/6d5b64b094944af6d52d895c8c2b8a59.mp4"
          type="video/mp4"
        />
      </LoadingSpinner>
      <h4>Did you know</h4>
      <p>{DidYouKnow[randomTip]}</p>
    </Container>
  );
};
