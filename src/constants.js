module.exports = {
  APP__TITLE: 'Sloff',
  DISCONNECT_TIMEOUT: 5000,
  DOM__SVELTE_MOUNT_POINT: 'view',
  // ERROR_CODE__NAME_TAKEN: 101,
  LOGGER__NAMESPACE: 'sloff',
  SERVER__PORT: +process.env.SERVER_PORT || 3000,
  WS__CLOSE_CODE__USER_REMOVED: 4000, // Close event numbers https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
  WS__MSG_TYPE__COMMENT_POSTED: 'commented posted',
  WS__MSG_TYPE__CREATE_USER: 'create user',
  WS__MSG_TYPE__GET_COMMENTS: 'get comments',
  WS__MSG_TYPE__GOT_COMMENTS: 'got comments',
  WS__MSG_TYPE__PING: 'ping',
  WS__MSG_TYPE__PONG: 'pong',
  WS__MSG_TYPE__POST_COMMENT: 'post comment',
  WS__MSG_TYPE__SERVER_DOWN: 'server down',
  WS__MSG_TYPE__USER_CREATED: 'user created',
};