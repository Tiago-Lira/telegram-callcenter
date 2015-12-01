(function () {

  'use strict';

  angular.module('craw')
    .controller('MessagesCtrl', MessagesCtrl);

  MessagesCtrl.$inject = ['$rootScope', '$timeout'];

  function MessagesCtrl ($rootScope, $timeout) {
    var vm = this;
  }

})();