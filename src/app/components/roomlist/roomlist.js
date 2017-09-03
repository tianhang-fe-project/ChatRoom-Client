import roomlistComponent from './roomlist.component.js';
import createRoom from '../dialogue/createroom/createroom';

import modal from 'angular-ui-bootstrap/src/modal';
export default angular.module('roomlist', [modal, createRoom.name])
  .component('roomlist', roomlistComponent);