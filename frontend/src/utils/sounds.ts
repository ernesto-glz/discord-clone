type Sound = 'STARTUP_JAPANESE' | 'NEW_MESSAGE';

const urls = {
  NEW_MESSAGE: '/songs/message_notification.mp3',
  STARTUP_JAPANESE: '/songs/startup_japanese.mp3'
};

export const playSound = (sound: Sound) => {
  const audio = new Audio(urls[sound]);
  try {
    audio.play();
  } catch {}
};
