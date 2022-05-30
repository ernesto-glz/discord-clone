export const ApiRoutes = {
  AUTH: '/auth',
  USER: '/user',
  ROOM: '/room',
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
  GET_MESSAGES: '/get/:roomId',
  CREATE_MESSAGE: '/create'
};

export const RoomRoutes = {
  CREATE_ROOM: '/create-room',
  GET_ROOMS: '/get-all',
  DELETE_ROOM: '/:roomId'
};

export const UserRoutes = {
  GET_USER: '/:userId'
};