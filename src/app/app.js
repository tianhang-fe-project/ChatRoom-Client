import angular from 'angular';
import AppComponent from './app.component.js';
import luegg from 'angularjs-scroll-glue';
import uiRouter from 'angular-ui-router';
import appRouter from './router/router';
import ngCookies from 'angular-cookies';
// import { LoginService } from './service/login.service';
// import loginService from './service/login.service';

import components from './components/components';
// import serviceModule from './service/service';

// console.log(serviceModule);

const MODULE_NAME = 'app';

angular.module(MODULE_NAME, ['luegg.directives', ngCookies, uiRouter, appRouter.name, components.name])
  .component('app', AppComponent)

export default MODULE_NAME;