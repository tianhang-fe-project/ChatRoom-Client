import logo from '../../../public/img/logo.png';
import avatar from '../../../public/img/avatar/avatar1.jpg';
import avatar2 from '../../../public/img/avatar/avatar2.jpg';
import audio from '../../../public/118.wav';
import io from 'socket.io-client';

const avatarMap = (ctx => {
  let keys = ctx.keys();
  let values = keys.map(ctx);
  return keys.reduce((o, k, i) => { o[k] = values[i]; return o; }, {});
})(require.context('../../../public/img/avatar', true, /.*/));

export default class ChatroomController {
  constructor($scope, $stateParams, loginService, chatRoomService, $state, $timeout) {

    console.log(avatarMap);
    this.logo = logo;
    this.avatar = avatar;
    this.avatar2 = avatar2;
    this.audio = audio;
    console.log(avatar2);
    this.avatarMap = avatarMap;
    this.mode = 'room';
    this.userInfo = {};
    this.msgList = [];
    this.loginService = loginService;
    this.$scope = $scope;
    this.$state = $state;
    this.$timeout = $timeout;
    this.room_id = $stateParams.id;
    this.chatRoomService = chatRoomService;
    this.checkLogin(() => {
      this.initSocketIO();
    });
  }

  load() {
    this.loadMsgs(this.room_id);
    this.loadUserList(this.room_id);
    this.loadChatRoomInfo(this.room_id);
    this.avatarKey = this.getRandomAvatarKey();
    this.myAvatar = this.getAvatarByKey(this.avatarKey);
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
    this.load();
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
        username: this.useremail,
        avatar: this.avatarKey
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
            this.loadMsgs(this.room_id);
            this.playAlertVoice();
          }
          break;
        case 'broadcast_say':
          console.log(msg.data.username + 'say: ' + msg.data.text);
          this.msgList.push(msg.data);
          console.log(msg);
          let msgSender = msg.data.useremail;
          if (msgSender !== this.useremail) {
            this.playAlertVoice();
          }
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
    if (!msg) return;
    this.sendRoomMsg(msg, this.room_id, this.useremail);
    this.msgText = "";
  }

  keyPress(e) {
    if (e.ctrlKey && e.keyCode == 13) {
      this.onSubmit(this.msgText);
    }
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

  getRandomAvatarKey() {
    // this.avatarMap
    let num = Math.floor(Math.random() * 20) + 1;
    let currKey = this.loginService.getAvatarKey();
    if (currKey) {
      return currKey;
    } else {
      return './avatar' + num + '.jpg';
    }
  }

  getAvatarByKey(key) {
    // this.avatarMap
    let avatarKey = this.loginService.getAvatarKey();
    if (avatarKey) {
      return this.avatarMap[avatarKey];
    } else {
      this.loginService.setAvatarKey(key)
      return this.avatarMap[key];
    }
  }

  playAlertVoice() {

    let audio = new Audio(this.audio);
    audio.play();

  }

}