export const AuthErrors = {
  INVALID_TOKEN: 'Invalid Token. Please log in again!',
  TOKEN_EXPIRED: 'Your token has expired! Please log in again',
  USER_NOT_FOUND: 'User not found'
};

export const DiscordTips = [
  'Use CTRL + / to bring up a list of keyboard shortcuts.',
  'Press SHIFT + ESC to mark an entire server as read.',
  'Hide muted channels in a server by right clicking the server name.',
  'SHIFT + ALT + UP or DOWN will navigate between unread channels.',
  'ALT + Click a message to mark it as unread.',
  'Right click to pin messages in a channel [if given the ability] or DM to save them for later.',
  'Characters like @, #, !, and * will narrow Quick Switcher results.',
  'Hide muted channels in a server by right-clicking the server name.',
  'You can create channel categories to group and organize your channels.',
  'Click the compass in the server list to find new servers',
  `Discord's official birthday is May 13'th, 2015.`
];

export const Animations = {
  'BigToSmall': {
    medium: {
      scale: 1.1
    },
    visible: {
      scale: 1,
      transition: {
        duration: 0.2
      }
    },
    hidden: {
      scale: 2,
      opacity: 0,
      transition: {
        duration: 4
      }
    }
  },
  'SmallToBig': {
    medium: {
      scale: 0.75
    },
    visible: {
      scale: 1,
      transition: {
        duration: 0.3,
        type: 'spring'
      }
    }
  }
}
