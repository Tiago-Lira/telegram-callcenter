(function () {

  'use strict';

  angular.module('craw')
    .controller('ChatsCtrl', ChatsCtrl);

  ChatsCtrl.$inject = ['$timeout', '$meteor', '$stateParams', '$state'];

  function ChatsCtrl ($timeout, $meteor, $stateParams, $state) {
    var vm = this;

    initialize();


    /**
     * Initialize variables of the controller context
     */
    function initialize () {
        $meteor.subscribe('contacts');
        $meteor.subscribe('chats');
        vm.chats = $meteor.collection(Chats);
        handleAvailable();
    }


    /**
     * @summary Sends the user to the route to see details of the chat
     * @method show
     * @memberOf client.chats.controllers.ChatsListCtrl
     * @instance
     * @param {collections.Chat} chat - The chat instance selected
     */
    vm.show = function (chat) {
      $state.go('chats.detail', {protocol: chat.protocol}, {reload: true});
    }


    /**
     * @summary Checks if the chat is the current
     * @method isActive
     * @memberOf client.chats.controllers.ChatsListCtrl
     * @instance
     * @param {collections.Chat} chat - The chat instance
     * @returns {Boolean} true if is the current chat
     */
    vm.isActive = function (chat) {
      return chat.protocol == $stateParams.protocol;
    }


    /**
     * @summary Toggle the state of the operator logged
     * @method handleAvailable
     * @memberOf client.chats.controllers.ChatsListCtrl
     * @instance
     */
    function handleAvailable () {
        if (vm.chats.length < 20) {
            toggleAvailable(true);
        } else {
            toggleAvailable(false);
        }
    }


    /**
     * @summary Updates the state of the operator logged
     * @method toggleAvailable
     * @memberOf client.chats.controllers.ChatsListCtrl
     * @instance
     */
    function toggleAvailable (available) {
        $meteor.call('toggleAvailable', available);
    }

    $timeout(function () {
      $('#list-chats').niceScroll();
    });
  }

})();