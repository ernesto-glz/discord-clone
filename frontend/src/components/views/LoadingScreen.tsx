import React, { useMemo } from 'react';
import { DiscordTips } from 'src/config/constants';
import PageWrapper from 'src/pages/page-wrapper';

export const LoadingScreen: React.FC = () => {
  const randomTip = useMemo(() => Math.floor(Math.random() * DiscordTips.length), []);

  return (
    <PageWrapper>
      <div className='loading-screen'>
        <video className='spinner' autoPlay muted loop>
          <source src={`${ASSETS_PATH}media/loading-spinner.webm`} />
          <source src={`${ASSETS_PATH}media/loading-spinner.mp4`} type="video/mp4" />
        </video>
        <h4 className='title'>Did you know</h4>
        <p className='tip'>{DiscordTips[randomTip]}</p>
      </div>
    </PageWrapper>
  );
};