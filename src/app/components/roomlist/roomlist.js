import roomlistComponent from './roomlist.component.js';
import createRoom from '../dialogue/createroom/createroom';
import loginDlg from '../dialogue/login/logindlg';
import { LoginService } from '../../service/login.service';
import { ChatRoomService } from '../../service/chatroom.service';
// import serviceModule from '../../service/service';



import modal from 'angular-ui-bootstrap/src/modal';
export default angular.module('roomlist', [modal, createRoom.name, loginDlg.name])
  .component('roomlist', roomlistComponent)
  .service('loginService', LoginService)
  .service('chatRoomService', ChatRoomService)