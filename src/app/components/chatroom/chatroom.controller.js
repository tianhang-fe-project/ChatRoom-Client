import logo from '../../../public/img/logo.png'
import avatar from '../../../public/img/avatar/avatar1.jpg'
import avatar2 from '../../../public/img/avatar/avatar2.jpg'
import io from 'socket.io-client';

export default class ChatroomController {
  constructor($scope, $stateParams, loginService, chatRoomService, $state, $timeout) {

    this.logo = logo;
    this.avatar = avatar;
    this.avatar2 = avatar2;
    this.mode = 'room';
    this.userInfo = {};
    this.msgList = [];
    this.loginService = loginService;
    this.$scope = $scope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.room_id = $stateParams.id;
    this.checkLogin(() => {
      this.initSocketIO();
    });
    this.chatRoomService = chatRoomService;
    this.loadMsgs(this.room_id);
    this.loadUserList(this.room_id);
    this.loadChatRoomInfo(this.room_id);
  }

  loadMsgs(roomid) {
    this.chatRoomService.fetchMsgList(roomid).then((data) => {
      console.log(data.data);
      this.msgList = data.data.messageList;
    });
  }

  loadUserList(roomid) {
    this.chatRoomService.fetchRoomUserList(roomid).then((data) => {
      console.log('load user list ..');
      console.log(data.data);
      this.userList = data.data.userList;
    });
  }

  loadChatRoomInfo(roomid) {
    this.chatRoomService.fetchRoomInfo(roomid).then((data) => {
      console.log(data.data);
      // this.userList = data.data.userList;
      this.roomAdmin = data.data.roomInfo.admin;
    });
  }

  initSocketIO() {
    this.useremail = this.loginService.getCurrUserEmail();
    // 'ws://localhost:3000', {transports: ['websocket']}
    // let socket = io('http://127.0.0.1:3000?roomid=' + this.room_id);
    let socket = io('ws://127.0.0.1:3000?roomid=' + this.room_id, { transports: ['websocket'] });
    this.socket = socket;
    socket.on('connect', () => {
      console.log("connect ...");
      console.log({
        username: this.useremail
      });
      this.socket.emit('join', {
        username: this.useremail
      });
    });

    socket.on('disconnect', function() {
      console.log("disconnect ...");
    });

    socket.on('message', (msg) => {
      console.log('msg:', msg);
      switch (msg.event) {
        case 'join':
          if (msg.data.username) {
            console.log(msg.data.username + 'join the chatroom');
            var data = {
              text: msg.data.username + 'join the chatroom'
            };
            this.loadUserList(this.room_id);
          }
          break;
        case 'broadcast_say':
          console.log(msg.data.username + 'say: ' + msg.data.text);
          this.msgList.push(msg.data);
          this.$scope.$apply(); //this triggers a $digest
          break;
        case 'broadcast_quit':
          if (msg.data.username) {
            console.log(msg.data.username + 'leave the chatroom');
            var data = {
              text: msg.data.username + 'leave the chatroom'
            };
            this.loadUserList(this.room_id);
            if (msg.data.username === this.useremail) {
              this.goBack();
            }
          }
          break;

      }
    })
  }

  onSubmit(msg) {
    this.msgText = "";
    this.sendRoomMsg(msg, this.room_id, this.useremail);
  }

  sendRoomMsg(text, roomId, useremail) {
    this.socket.emit('roommsg', {
      username: useremail,
      text: text,
      room_id: roomId,
      type: 'roommsg'
    });
  }

  checkLogin(cb) {
    if (!this.loginService.isLogin()) {
      this.loginService.openLoginDlg((email) => {
        cb();
      }, () => {
        this.$state.go('roomlist');
      });
    } else {
      cb();
    }
  }

  exit() {
    // disconnect
    this.socket.emit('leave', {
      username: this.useremail
    });
    this.loginService.logout();
    this.goBack();
  }

  removeUser(email) {
    console.log(email)
    console.log(this.useremail)
    this.socket.emit('leave', {
      username: email
    });

    // this.loadUserList(this.room_id);
    this.$state.reload();
  }

  goBack() {
    this.$state.go('roomlist');
  }

}