import React, { useMemo } from 'react';
import { DiscordTips } from 'src/config/constants';
import PageWrapper from 'src/pages/page-wrapper';
import { Image } from './elements/Image';

export const LoadingScreen: React.FC = () => {
  const randomTip = useMemo(() => Math.floor(Math.random() * DiscordTips.length), []);

  return (
    <PageWrapper>
      <div className='loading-screen'>
        <video autoPlay className='spinner' muted loop playsInline>
          <source src={_r('/media/loading_logo_spin.webm')} type="video/webm" />
          <source src={_r('/media/loading_logo_spin.mp4')} type="video/mp4" />
          <Image src='/img/loading-skeleton.png' />
        </video>
        <h4 className='title'>Did you know</h4>
        <p className='tip'>{DiscordTips[randomTip]}</p>
      </div>
    </PageWrapper>
  );
};
