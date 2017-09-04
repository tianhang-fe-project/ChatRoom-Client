import logo from '../public/img/logo.png'
import avatar from '../public/img/avatar/avatar1.jpg'
import io from 'socket.io-client';
// import SockJS from 'sockjs-client'
// import chatClient from './chatclient.js'

class AppCtrl {
  constructor($scope) {
    this.url = 'https://github.com/preboot/angular-webpack';
    console.log(logo);
    this.logo = logo;
    this.avatar = avatar;
    this.mode = 'room';
    this.userInfo = {};
    this.msgList = [];
    //this.initClient();
  }
}

export default AppCtrl;