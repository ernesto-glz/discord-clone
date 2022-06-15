export const ApiRoutes = {
  AUTH: '/auth',
  USER: '/user',
  CHANNEL: '/channel',
  FRIEND: '/friend',
  MESSAGE: '/message'
};

export const AuthRoutes = {
  LOGIN: '/login',
  REGISTER: '/register'
};

export const FriendRoutes = {
  PENDING_REQUESTS: '/pending-requests',
  OUTGOING_REQUESTS: '/outgoing-requests',
  CREATE_REQUEST: '/create-request',
  ACCEPT_REQUEST: '/accept/:requestId',
  GET_FRIENDS: '/my-friends',
  DELETE_REQUEST: '/:requestId'
};

export const MessageRoutes = {
  GET_MESSAGES: '/get/:channelId',
  CREATE_MESSAGE: '/create'
};

export const ChannelRoutes = {
  CREATE_CHANNEL: '/create',
  GET_CHANNELS: '/get',
  DELETE_CHANNEL: '/:channelId',
  GET_CHANNEL_BY_ID: '/:channelId'
};

export const UserRoutes = {
  GET_USER: '/:userId',
  GET_SELF_USER: '/'
};
