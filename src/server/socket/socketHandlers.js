const log = require('../../utils/logger')('socket:socketHandlers');
const logHeartbeat = require('../../utils/logger')('socket:socketHandlers:heartbeat');

module.exports = function connection(socket, serverSocket) {
  const {
    WS__MSG_TYPE__PING,
    WS__MSG_TYPE__PONG,
  } = require('../../constants');
  // const setUserState = require('../gameActions/setUserState')(serverSocket);

  socket.on('message', (payload) => {
    const { data, type } = JSON.parse(payload);
    const _log = (type === WS__MSG_TYPE__PING) ? logHeartbeat : log;
    
    _log(`[HANDLE] "${type}"`);

    switch (type) {
      case WS__MSG_TYPE__PING: {
        serverSocket.emitToSelf(WS__MSG_TYPE__PONG);
        break;
      }
      // case WS__MSG_TYPE__SET_ADMIN: setUserState(data, 'admin'); break;
      default: {
        log(`[WARN] Message type "${type}" is not valid, no action taken data:`, data);
      }
    }
  });

  socket.on('close', (code, reason) => {
    log(`[CLOSE] code: ${code} | reason: ${reason}`);
    
    // const {
    //   DISCONNECT_TIMEOUT,
    //   WS__CLOSE_CODE__USER_REMOVED,
    //   WS__MSG_TYPE__ROOM_DESTROYED,
    //   WS__MSG_TYPE__USER_DISCONNECTED,
    // } = require('../../constants');
    // const assignNextAdmin = require('../utils/assignNextAdmin');
    // const assignNextCzar = require('../utils/assignNextCzar');
    // const resetGameRound = require('../utils/resetGameRound');
    // const dealCards = require('../gameActions/dealCards');
    // 
    // const { roomID, user } = serverSocket.data;
    // const room = serverSocket.getRoom(roomID);
    // 
    // if (room) {
    //   if (user) {
    //     user.connected = false;
    // 
    //     serverSocket.emitToOthersInRoom(roomID, WS__MSG_TYPE__USER_DISCONNECTED, {
    //       room: room.data.public,
    //     });
    // 
    //     const timeoutDuration = (code === WS__CLOSE_CODE__USER_REMOVED)
    //       ? 0
    //       : DISCONNECT_TIMEOUT;
    // 
    //     // if a User refreshed their Browser, `connected` will be set back to
    //     // `true` fairly quickly. The timeout value is a guesstimate based on a
    //     // User having assets cached so the reload time should be quick.
    //     const disconnectCheck = setTimeout(() => {
    //       if (!user.connected) {
    //         const { private: { cards: { live } } } = room.data;
    //         const { admin, cards, czar } = user;
    // 
    //         // user is Admin, assign next admin
    //         if (admin) assignNextAdmin(room);
    // 
    //         // user is Czar, assign next czar
    //         if (czar) {
    //           assignNextCzar(room, true);
    //           dealCards(serverSocket)({ newRound: true, roomID });
    //         }
    // 
    //         // remove the User
    //         room.data.public.users = room.data.public.users.filter(({ name }) => name !== user.name);
    // 
    //         // if all Users have left, kill the room
    //         if (!room.data.public.users.length) {
    //           log(`All Users have left, killing room "${roomID}"`);
    // 
    //           // it's possible that a User is in the process of joining when
    //           // the Admin left the room, so lets tell them that the room no
    //           // longer exists.
    //           serverSocket.emitToSelf(WS__MSG_TYPE__ROOM_DESTROYED);
    // 
    //           serverSocket.deleteRoom(roomID);
    //         }
    //         else {
    //           // dump white cards back into `live` cards
    //           cards.forEach(({ text }) => { live.white.push(text); });
    // 
    //           // if there aren't enough players, put game back into a waiting state
    //           if (room.data.public.users.length === 1) {
    //             room.data.public.users[0].czar = false;
    //             room.data.public.users[0].points = 0;
    //             resetGameRound(room);
    //           }
    // 
    //           log(
    //             code === WS__CLOSE_CODE__USER_REMOVED
    //               ? reason
    //               : `User "${user.name}" left room "${roomID}" due to disconnection`
    //           );
    // 
    //           const socketNdx = room.sockets.indexOf(serverSocket.socket);
    //           if (socketNdx > -1) room.sockets.splice(socketNdx, 1);
    // 
    //           serverSocket.emitToOthersInRoom(roomID, WS__MSG_TYPE__USER_LEFT_ROOM, {
    //             room: room.data.public,
    //           });
    //         }
    //       }
    //     }, timeoutDuration);
    // 
    //     serverSocket.leaveRoom(roomID, user.name, disconnectCheck);
    // 
    //     log(`User "${user.name}" disconnected from room "${roomID}" while a game was running`);
    //   }
    //   else {
    //     log(`User disconnected from room "${roomID}" that they didn't join`);
    // 
    //     if (!room.data.public.users.length) {
    //       log(`No users in room "${roomID}", killing it`);
    //       serverSocket.deleteRoom(roomID);
    //     }
    //   }
    // }
    // else {
      log('User disconnected');
    // }
  });
}