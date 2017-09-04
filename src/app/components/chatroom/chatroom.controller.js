import logo from '../../../public/img/logo.png'
import avatar from '../../../public/img/avatar/avatar1.jpg'
import io from 'socket.io-client';

export default class ChatroomController {
  constructor($scope, $stateParams, loginService) {
    console.log("chat room ctrl ..");

    this.logo = logo;
    this.avatar = avatar;
    this.mode = 'room';
    this.userInfo = {};
    this.msgList = [];
    this.loginService = loginService;
    this.$scope = $scope;
    //this.initClient();
    this.room_id = $stateParams.id;
    this.checkLogin(() => {
      this.initSocketIO();
    });

  }

  initSocketIO() {
    let socket = io('http://localhost:3000?roomid=' + this.room_id);
    this.socket = socket;
    console.log("socket:", socket)
    socket.on('connect', function() {
      console.log("connect ...");
      console.log("socket id:", socket.id)
      socket.emit('join', {
        username: 'tianhang'
      });
    });

    socket.on('event', function(data) {
      console.log(data);
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
            //showNotice(data);
          }
          break;
        case 'broadcast_say':
          // console.log("this:", this)
          if (msg.data.username !== this.userInfo.username) {
            console.log(msg.data.username + '说: ' + msg.data.text);
            //showMessage(msg.data);
            console.log(msg);
            this.msgList.push(msg.data);
            this.$scope.$apply(); //this triggers a $digest
          }
          break;
        case 'broadcast_quit':
          if (msg.data.username) {
            console.log(msg.data.username + 'leave the chatroom');
            var data = {
              text: msg.data.username + 'leave the chatroom'
            };
            //showNotice(data);
          }
          break;
      }
    })
  }

  onSubmit(msg) {
    this.sendRoomMsg(msg, this.room_id);
  }

  sendMsg(text, socketId) {
    this.socket.emit('msg', {
      username: 'tianhang',
      text: text,
      id: socketId,
      type: 'msg'
    });
  }

  sendRoomMsg(text, roomId) {
    this.socket.emit('roommsg', {
      username: 'tianhang',
      text: text,
      id: roomId,
      type: 'roommsg'
    });
  }

  checkLogin(cb) {
    if (!this.loginService.isLogin()) {
      this.loginService.openLoginDlg((email) => {
        cb();
      });
    } else {
      cb();
    }
  }

}