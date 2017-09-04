import roomlistComponent from './roomlist.component.js';
import createRoom from '../dialogue/createroom/createroom';
import { LoginService } from '../../service/login.service';
import ngCookies from 'angular-cookies';

console.log(LoginService);
console.log(createRoom);
import modal from 'angular-ui-bootstrap/src/modal';
export default angular.module('roomlist', [modal, createRoom.name, ngCookies])
  .component('roomlist', roomlistComponent)
  .service('loginService', LoginService)