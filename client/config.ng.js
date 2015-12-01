(function () {

  'use strict';

  angular.module('craw')
    .config(Config);

  Config.$inject = [
    '$urlRouterProvider',
    '$stateProvider',
    '$locationProvider'];

  /** Configuration of the main app **/
  function Config ($urlRouterProvider, $stateProvider, $locationProvider) {

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/entrar');
  
    /** Routes mapping **/
    authRoutes($stateProvider);
    chatsRoutes($stateProvider);
  }

  /** Routes mapping of Auth component **/
  function authRoutes ($stateProvider) {
    $stateProvider
      .state('auth', {
        abstract: true,
        template: '<span ui-view></span>',
      })
      .state('auth.login', {
        url: '/entrar',
        templateUrl: 'client/components/auth/views/login.ng.html',
        controller: 'LoginCtrl',
        controllerAs: 'vm'
      })
      .state('auth.register', {
        url: '/registro',
        templateUrl: 'client/components/auth/views/register.ng.html',
        controller: 'RegisterCtrl',
        controllerAs: 'vm',
      });
  }

  /** Routes mapping of Chats component **/
  function chatsRoutes ($stateProvider) {
    $stateProvider
      .state('chats', {
          abstract: true,
          templateUrl: 'client/components/chats/views/base.ng.html',
          resolve: {
            'currentUser': function ($meteor) {
              return $meteor.requireUser();
            }
          }
       })
      .state('chats.index', {
        url: '/chamados',
        templateUrl: 'client/components/chats/views/chats.ng.html',
        controller: 'ChatsIndexCtrl',
        controllerAs: 'vm',
      })
      .state('chats.detail', {
        url: '/chamados/:protocol',
        templateUrl: 'client/components/chats/views/messages.ng.html',
        controller: 'MessagesCtrl',
        controllerAs: 'vm',
      });
  }

})();