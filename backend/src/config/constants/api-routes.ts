export const ApiRoutes = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register'
  },
  USER: {
    GET_USER: '/user/:userId',
    GET_SELF_USER: '/user'
  },
  CHANNEL: {
    CREATE_CHANNEL: '/channel/create',
    GET_CHANNELS: '/channel/get',
    GET_CHANNEL_BY_ID: '/channel/:channelId'
  },
  FRIEND: {
    PENDING_REQUESTS: '/friend/pending-requests',
    OUTGOING_REQUESTS: '/friend/outgoing-requests',
    CREATE_REQUEST: '/friend/create-request',
    ACCEPT_REQUEST: '/friend/accept/:requestId',
    GET_FRIENDS: '/friend/my-friends',
    DELETE_REQUEST: '/friend/:requestId'
  },
  MESSAGE: {
    GET_MESSAGES: '/message/get/:channelId',
    CREATE_MESSAGE: '/message/create'
  }
};
