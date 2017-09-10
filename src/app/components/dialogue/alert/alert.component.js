import template from './alert.html';
import controller from './alert.controller.js';

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