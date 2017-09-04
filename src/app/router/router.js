import uiRouter from 'angular-ui-router';

export default angular.module('app.router', [
  uiRouter,
]).config(($stateProvider, $urlRouterProvider, $locationProvider) => {
  $stateProvider
    .state('login', {
      url: '/login',
      component: 'login'
    }).state('roomlist', {
      url: '/roomlist',
      component: 'roomlist'
    }).state('chatroom', {
      url: '/:id/chatroom',
      component: 'chatroom'
    });
  $urlRouterProvider.otherwise('/login');
})