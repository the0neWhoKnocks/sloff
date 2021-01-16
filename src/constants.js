module.exports = {
  APP__TITLE: 'Sloff',
  DISCONNECT_TIMEOUT: 5000,
  DOM__SVELTE_MOUNT_POINT: 'view',
  // ERROR_CODE__NAME_TAKEN: 101,
  LOGGER__NAMESPACE: 'sloff',
  SERVER__PORT: +process.env.SERVER_PORT || 3000,
  WS__CLOSE_CODE__USER_REMOVED: 4000, // Close event numbers https://developer.mozilla.org/en-US/docs/Web/API/CloseEvent
  WS__MSG_TYPE__SERVER_DOWN: 'server down',
};