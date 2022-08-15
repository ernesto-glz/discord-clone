import { Variants } from 'framer-motion';

interface VariantsObject {
  [key: string]: Variants;
}

export const AuthErrors = {
  INVALID_TOKEN: 'Invalid Token. Please log in again!',
  TOKEN_EXPIRED: 'Your token has expired! Please log in again',
  USER_NOT_FOUND: 'User not found',
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
  `Discord's official birthday is May 13'th, 2015.`,
];

export const Animations = {
  BigToSmall: {
    initial: { scale: 1.1 },
    visible: { scale: 1, transition: { duration: 0.2 } },
    exit: { scale: 1.1, transition: { duration: 0.2 } },
  },
  SmallToBig: {
    initial: { scale: 0.75 },
    visible: { scale: 1, transition: { duration: 0.2, type: 'spring' } },
    exit: { scale: 0.7, transition: { duration: 0.2 } },
  },
  BgOpacity: {
    initial: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.2 } },
    exit: { opacity: 0, transition: { duration: 0.2 } },
  },
} as VariantsObject;

export const ErrorCodes = {
  EMAIL: ['INVALID_EMAIL_TYPE', 'ALREADY_USED'],
  PASSWORD: ['INVALID_PASSWORD_TYPE', 'INVALID_PASSWORD'],
  USERNAME: ['INVALID_USERNAME_TYPE', 'TOO_MANY_USERS'],
  AUTH: ['ACCOUNT_LOCKED', 'INVALID_CREDENTIALS'],
  CURRENT_PWD: ['INVALID_CURRENT_PASSWORD_TYPE'],
  NEW_PWD: ['INVALID_NEW_PASSWORD_TYPE'],
  CONFIRM_PWD: ['PWD_NOT_MATCH'],
};

export type ErrorKey = keyof typeof ErrorCodes;
