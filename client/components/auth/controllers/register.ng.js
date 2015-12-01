(function () {

  'use strict';

  angular.module('craw')
    .controller('RegisterCtrl', RegisterCtrl);

  RegisterCtrl.$inject = ['$meteor', '$state'];

  /**
   * @summary Controller to manage the register of users
   * @class client.auth.controllers.RegisterCtrl
   * @instancename registerCtrl
   */
  function RegisterCtrl ($meteor, $state) {
    var vm = this;

    initialize();
    
    /** Initialize variables of the controller context **/
    function initialize () {
      vm.error = '';
      vm.formData = {
        username: '',
        password: '',
        profile: {
          available: true,
          name: ''
        }
      };
    }
    

    /**
     * @summary Register a new user with the vm.formData
     * @method register
     * @memberOf client.auth.controllers.RegisterCtrl
     * @instance
     */
    vm.register = function () {
      $meteor.createUser(vm.formData)
        .then(registerSuccess, registerFail);
    }


    /**
     * @summary Sends the current user the de initial page
     * @method registerSuccess
     * @memberOf client.auth.controllers.RegisterCtrl
     * @instance
     */
    function registerSuccess (user) {
      $state.go('chats.index');
    }


    /**
     * @summary Show the error message in template
     * @method registerSuccess
     * @memberOf client.auth.controllers.RegisterCtrl
     * @instance
     * @param {string} err - The error message
     */
    function registerFail (err) {
      vm.error = 'Registration error - ' + err;
    }

  }

})();