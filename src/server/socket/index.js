const { OPEN, Server } = require('ws');
const {
  uniqueNamesGenerator,
  adjectives,
  names,
} = require('unique-names-generator');
const log = require('../../utils/logger')('socket');
// const getUser = require('../utils/getUser');

const generateID = () => Math.random().toString(36).substr(2, 10).toUpperCase();

const users = new Map();
const uids = [];
const usernames = [];
const DEFAULT_ROOM_ID = 1224;
const commentsDB = new Map();

const mockRoomComments = new Map();
[
  {
    avatar: 'http://2.gravatar.com/avatar/84efbb7993402e39c9f04d9da361fc6f',
    cid: 1,
    content: 'A question',
    time: '12:45 PM',
    uid: 1,
    username: 'Nox',
  },
  {
    cid: 2,
    content: 'An answer',
    time: '12:50 PM',
    uid: 2,
    username: 'Pinky',
  },
].forEach(c => {
  mockRoomComments.set(c.cid, c);
});
commentsDB.set(DEFAULT_ROOM_ID, mockRoomComments);

// const rooms = new Map();
// const disconnectChecksForRoom = new Map();
// 
// const disconnectKey = (roomID, username) => `${roomID}__${username}`;

// NOTE - wrapping API in case I need to refactor again in the future
class ServerSocket {
  constructor(currentUserSocket, wsServerInst) {
    this.data = {};
    this.serverInstance = wsServerInst;
    this.socket = currentUserSocket;
  }
  
  createUser() {
    let uid;
    let username;
    
    while (
      !uid
      && (
        !uids.includes(uid)
        && !usernames.includes(username)
      )
    ) {
      uid = generateID();
      username = uniqueNamesGenerator({
        dictionaries: [names, adjectives],
        length: 2,
        separator: ' ',
        style: 'capital',
      });
    }
    
    uids.push(uid);
    usernames.push(username);
    
    const user = { uid, username };
    users.set(uid, user);
    
    log('createUser', users);
    
    return user;
  }
  
  getCommentsForRoom(roomID = DEFAULT_ROOM_ID) {
    return commentsDB.get(roomID);
  }
  
  postCommentToRoom(comment, roomID = DEFAULT_ROOM_ID) {
    const comments = commentsDB.get(roomID);
    const cid = comments.size + 1;
    const updatedComment = {
      ...comment,
      cid,
      time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', hour12: true, minute: 'numeric' }),
    };
    comments.set(cid, updatedComment);
    
    return updatedComment;
  }
  
  editingComment(cid, roomID = DEFAULT_ROOM_ID) {
    const comments = commentsDB.get(roomID);
    const comment = comments.get(cid);
    
    if (comment) {
      comment.editing = true;
      comments.set(cid, comment);
    }
    
    return comments;
  }
  
  updateComment({ cid, content }, roomID = DEFAULT_ROOM_ID) {
    const comments = commentsDB.get(roomID);
    const comment = comments.get(cid);
    
    if (comment) {
      comment.editing = false;
      comment.content = content;
      comments.set(cid, comment);
    }
    
    return comments;
  }
  
  // createRoom(roomID, data = {}) {
  //   let room = rooms.get(roomID);
  // 
  //   if (!room) {
  //     room = { data, sockets: [] };
  //     rooms.set(roomID, room);
  //   }
  // 
  //   return room;
  // }
  // 
  // deleteRoom(roomID) {
  //   rooms.delete(roomID);
  //   log(`Room "${roomID}" deleted`);
  // }

  emitToAll(type, data = {}) {
    this.serverInstance.clients.forEach((socket) => {
      if (socket.readyState === OPEN) {
        socket.send(JSON.stringify({ data, type }));
      }
    });
  }

  // emitToAllInRoom(roomID, type, data = {}) {
  //   this.serverInstance.clients.forEach((socket) => {
  //     const room = this.getRoom(roomID);
  // 
  //     if (
  //       room
  //       && room.sockets.includes(socket)
  //       && socket.readyState === OPEN
  //     ) {
  //       socket.send(JSON.stringify({ data, type }));
  //     }
  //   });
  // }
  // 
  // emitToOthersInRoom(roomID, type, data = {}) {
  //   this.serverInstance.clients.forEach((socket) => {
  //     const room = this.getRoom(roomID);
  // 
  //     if (
  //       room
  //       && room.sockets.includes(socket)
  //       && socket !== this.socket
  //       && socket.readyState === OPEN
  //     ) {
  //       socket.send(JSON.stringify({ data, type }));
  //     }
  //   });
  // }

  emitToSelf(type, data = {}) {
    if (this.socket.readyState === OPEN) {
      this.socket.send(JSON.stringify({ data, type }));
    }
  }

  // enterRoom(roomID, username, cb) {
  //   const room = rooms.get(roomID);
  // 
  //   if (room) room.sockets.push(this.socket);
  //   // User didn't create the room, they're just joining so keep a reference
  //   if (!this.data.roomID) this.data.roomID = roomID;
  // 
  //   // Rejoining a running game
  //   if (room && username) {
  //     const user =  getUser(room, username);
  // 
  //     if (user) {
  //       this.data.user = user;
  //       user.connected = true;
  // 
  //       const dKey = disconnectKey(roomID, username);
  //       const disconnectCheck = disconnectChecksForRoom.get(dKey);
  //       if (disconnectCheck) {
  //         clearTimeout(disconnectCheck);
  //         disconnectChecksForRoom.delete(dKey);
  //       }
  // 
  //       log(`User "${user.name}" reconnected`);
  //     }
  //   }
  // 
  //   cb(room);
  // }
  // 
  // getRoom(roomID) {
  //   return rooms.get(roomID);
  // }
  // 
  // leaveRoom(roomID, username, timeout) {
  //   disconnectChecksForRoom.set(disconnectKey(roomID, username), timeout);
  // }
}

module.exports = function socket(server) {
  const wss = new Server({ server });
  const socketHandlers = require('./socketHandlers');

  wss.on('connection', function connected(currentUserSocket) {
    log('Server Socket connected to Client');
    socketHandlers(currentUserSocket, new ServerSocket(currentUserSocket, wss));
  });

  return new ServerSocket(undefined, wss);
}
