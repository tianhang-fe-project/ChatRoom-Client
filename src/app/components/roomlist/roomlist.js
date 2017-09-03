import roomlistComponent from './roomlist.component.js';
import modal from 'angular-ui-bootstrap/src/modal';
export default angular.module('roomlist', [modal])
  .component('roomlist', roomlistComponent);