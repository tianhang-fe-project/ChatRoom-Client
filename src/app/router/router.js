import uiRouter from 'angular-ui-router';

export default angular.module('app.router', [
  uiRouter,
]).config(($stateProvider, $urlRouterProvider) => {
  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    }).state('roomlist', {
      url: '/roomlist',
      component: 'roomlist'
    }).state('chatroom', {
      url: '/chatroom',
      component: 'chatroom'
    });
  $urlRouterProvider.otherwise('/login');
})