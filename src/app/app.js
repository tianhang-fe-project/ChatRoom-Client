import angular from 'angular';
import AppComponent from './app.component.js';
import luegg from 'angularjs-scroll-glue';

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['luegg.directives'])
  .component('app', AppComponent)
  // .controller('AppCtrl', AppCtrl);

export default MODULE_NAME;