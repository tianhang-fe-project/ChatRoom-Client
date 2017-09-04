import template from './logindlg.html';
import controller from './logindlg.controller.js';
// import './createroom.css'

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