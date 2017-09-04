import roomlistComponent from './roomlist.component.js';
import createRoom from '../dialogue/createroom/createroom';
import { LoginService } from '../../service/login.service';

console.log(LoginService);
console.log(createRoom);
import modal from 'angular-ui-bootstrap/src/modal';
export default angular.module('roomlist', [modal, createRoom.name])
  .component('roomlist', roomlistComponent)
  .service('loginSerivce', LoginService)