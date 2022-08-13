import { _r } from 'src/services/url-service'
type Sound = 'STARTUP_JAPANESE' | 'NEW_MESSAGE';

const urls = {
  NEW_MESSAGE: _r('/media/message_notification.mp3'),
  STARTUP_JAPANESE: _r('/media/startup_japanese.mp3')
};

export const playSound = (sound: Sound) => {
  const audio = new Audio(urls[sound]);
  try {
    audio.play();
  } catch {}
};
