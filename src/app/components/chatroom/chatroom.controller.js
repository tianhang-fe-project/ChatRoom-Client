import logo from '../../../public/img/logo.png'
import avatar from '../../../public/img/avatar/avatar1.jpg'
import io from 'socket.io-client';

export default class ChatroomController {
  constructor($scope, $stateParams, loginService, chatRoomService) {
    console.log("chat room ctrl ..");

    this.logo = logo;
    this.avatar = avatar;
    this.mode = 'room';
    this.userInfo = {};
    this.msgList = [];
    this.loginService = loginService;
    this.$scope = $scope;
    this.room_id = $stateParams.id;
    this.checkLogin(() => {
      this.initSocketIO();
    });
    this.chatRoomService = chatRoomService;
    this.page = 0;
    this.loadMsgs(this.room_id, 0);
  }

  loadMsgs(roomid, page) {
    this.chatRoomService.fetchMsgList(roomid, page).then((data) => {
      console.log(data.data);
      this.msgList = data.data.messageList;
    });
  }

  initSocketIO() {
    this.useremail = this.loginService.getCurrUserEmail();
    let socket = io('http://localhost:3000?roomid=' + this.room_id);
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
          // if (msg.data.username !== this.userInfo.username) {
          console.log(msg.data.username + 'say: ' + msg.data.text);
          //showMessage(msg.data);
          console.log(msg);
          this.msgList.push(msg.data);
          this.$scope.$apply(); //this triggers a $digest
          // }
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
    this.msgText = "";
    this.sendRoomMsg(msg, this.room_id, this.useremail);
  }

  sendMsg(text, socketId) {
    this.socket.emit('msg', {
      username: 'tianhang',
      text: text,
      id: socketId,
      type: 'msg'
    });
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
      });
    } else {
      cb();
    }
  }

}