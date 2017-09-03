import template from './createroom.html';
import controller from './createroom.controller.js';
import './createroom.css'

export default {
  restrict: 'E',
  bindings: {
    resolve: '<',
    close: '&',
    dismiss: '&'
  },
  template,
  controller,
  controllerAs: 'vm'
};