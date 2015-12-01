(function () {

  'use strict';

  angular.module('craw')
    .controller('CoreCtrl', CoreCtrl);

  CoreCtrl.$inject = ['$meteor', '$state', '$rootScope'];

  /**
   * @summary
   * @class client.core.controllers.CoreCtrl
   * @instancename coreCtrl
   */
  function CoreCtrl ($meteor, $state, $rootScope) {
    var vm = this;
    vm.isLoginContent = $rootScope.isLoginContent;

    // Detact Mobile Browser
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
       angular.element('html').addClass('ismobile');
    }

    vm.logout = function () {
      $meteor.logout()
        .then(function () {
          $state.go('auth.login');
        });
    }
    

    vm.getUsername = function () {
      var user = $rootScope.currentUser;
      if (user) {
        return user.username;
      }
    }


    //Fullscreen View
    vm.fullScreen = function() {
        //Launch
        function launchIntoFullscreen(element) {
            if(element.requestFullscreen) {
                element.requestFullscreen();
            } else if(element.mozRequestFullScreen) {
                element.mozRequestFullScreen();
            } else if(element.webkitRequestFullscreen) {
                element.webkitRequestFullscreen();
            } else if(element.msRequestFullscreen) {
                element.msRequestFullscreen();
            }
        }

        //Exit
        function exitFullscreen() {
            if(document.exitFullscreen) {
                document.exitFullscreen();
            } else if(document.mozCancelFullScreen) {
                document.mozCancelFullScreen();
            } else if(document.webkitExitFullscreen) {
                document.webkitExitFullscreen();
            }
        }

        if (exitFullscreen()) {
            launchIntoFullscreen(document.documentElement);
        }
        else {
            launchIntoFullscreen(document.documentElement);
        }
    }
  }

})();