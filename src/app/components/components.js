'use strict';

import angular from 'angular';

import loginComponent from './login/login';
import roomlistComponent from './roomlist/roomlist';
import chatroomComponent from './chatroom/chatroom';

let componentsModule = angular.module('app.components', [
  loginComponent.name,
  roomlistComponent.name,
  chatroomComponent.name
]);

export default componentsModule;