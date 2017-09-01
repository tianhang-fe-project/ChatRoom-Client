import angular from 'angular';
import AppComponent from './app.component.js';


const MODULE_NAME = 'app';

angular.module(MODULE_NAME, [])
  .component('app', AppComponent)
  // .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;