import React from 'react';
import { useParams } from 'react-router-dom';

export const Channels: React.FC = () => {
  const { channelId } = useParams();
  return <>{channelId}</>;
};
