'use strict';

import angular from 'angular';

import loginComponent from './login/login';
import roomlistComponent from './roomlist/roomlist';
import chatroomComponent from './chatroom/chatroom';
import createroomComponent from './dialogue/createroom/createroom';

let componentsModule = angular.module('app.components', [
  loginComponent.name,
  roomlistComponent.name,
  chatroomComponent.name,
  createroomComponent.name
]);

export default componentsModule;