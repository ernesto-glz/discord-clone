import { DisplayChannel } from 'src/redux/states/channels';
import client from '../client';

export const getOrCreateDMChannel = (data: DisplayChannel) => {
  return client.post('/channel/create', data);
};

export const getChannels = () => {
  return client.get('/channel/get');
};

export const getChannelById = (channelId: string) => {
  return client.get(`/channel/${channelId}`);
};
