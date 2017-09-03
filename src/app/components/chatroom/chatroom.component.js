import template from './chatroom.html';
import './chatroom.css';
import controller from './chatroom.controller.js';

export default {
  restrict: 'E',
  template,
  controller,
  controllerAs: 'vm'
};