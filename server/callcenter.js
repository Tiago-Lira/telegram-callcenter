
var URL = Npm.require('url');
var mime = Npm.require('mime');
var path = Npm.require('path');


Meteor.methods({

  /**
   * @summary Update's operator state
   * @method Meteor.toggleAvailable
   * @param {Boolean} available - Indicate if is available
   */
  toggleAvailable: function (available) {
    var user = Meteor.user();
    user.profile.available = available;
    Meteor.users.update({_id: this.userId}, {$set: { profile: user.profile}});

    if (available) {

      var chat = Chats.findOne({status: 'waiting'});
      
      if (chat) {
          chat.operatorId = this.userId;
          chat.startedAt = new Date();
          chat.protocol = Date.now();
          chat.status = 'active';
          Chats.update({_id: chat._id}, {$set: chat});
      }

    }
  },


  /**
   * @summary Finish a chat and create a case
   * @method Meteor.closeCase
   * @param {Object} contactCase - object with subject, obs and protocol
   */
  closeCase: function (contactCase) {

    var chat = Chats.findOne({
      protocol: parseInt(contactCase.protocol)
    });

    chat.status = 'done';
    chat.finishedAt = new Date();
    chat.duration = Math.abs(chat.finishedAt.getTime() - chat.startedAt.getTime());

    var messages = Messages.find({chatId: chat._id}).fetch();

    var data = {};
    data.subject = contactCase.subject;
    data.obs = contactCase.obs;
    data.messages = messages;
    data.chatId = chat._id;
    data.contactId = chat.contactId;
    data.operatorId = chat.operatorId;
    data.startedAt = chat.startedAt;
    data.finishedAt = chat.finishedAt;
    data.duration = chat.duration;

    Cases.insert(data);
    Chats.update({_id: chat._id}, {$set: chat});
  },


  sendDocument: function (message, document_id) {

    var chat = Chats.findOne({
        protocol: parseInt(message.protocol),
        operatorId: this.userId,
    });

    var chatId = chat.contact().telegramId;
    var file = Files.findOne({_id: document_id});
    TelegramBot.sendDocument(chatId, file);

    var message = {
      text: 'Você enviou um arquivo',
      type: 'file',
      timestamp: new Date(),
      isOperator: true,
      chatId: chat._id,
      file: document_id,
    }

    Messages.insert(message);
  },

  /**
   * @summary Sends a message to contact on telegram
   * @method Meteor.sendMessage
   * @param {Object} message - Message from operator
   */
  sendMessage: function (message) {

    var chat = Chats.findOne({
        protocol: parseInt(message.protocol),
        operatorId: this.userId,
    });

    var chatId = chat.contact().telegramId;
    var operatorName = chat.operator().profile.name;

    var message = {
      text: message.text,
      type: 'text',
      timestamp: new Date(),
      isOperator: true,
      chatId: chat._id,
    }

    message._id = Messages.insert(message);
    var text = '*' + operatorName + '*\n' + message.text
    TelegramBot.sendMessage(chatId, text).then(
      function () {
        message.sent = true;
        Messages.update({_id: message._id}, {$set: message});
      },
      function () {
        message.error = true;
        Messages.update({_id: message._id}, {$set: message});
      });
  },

  /**
   * @summary Handles all messages from telegram and sends the message to the operator
   * @method Meteor.handleMessages
   * @param {Object} telegramMessage - Message object from telegram
   */
  handleMessages: function (message) {

      var contact = updateInfo(message.from);
      var chat = getChat(contact);
      clientMessage(chat, message);

      if (chat.status == 'waiting') {

        availableOperator = Meteor.users.findOne({
          'profile.available': true
        });

        if (availableOperator) {
          chat.operatorId = availableOperator._id;
          chat.startedAt = new Date();
          chat.protocol = Date.now();
          chat.status = 'active';
          Chats.update({_id: chat._id}, {$set: chat});
        }
      }
  }

});


/**
 * @summary Inserts the message in the chat
 * @method server.callcenter.clientMessage
 * @param {Object} telegramMessage - Message object from telegram
 */
function clientMessage(chat, telegramMessage) {

  var message = {
    text: telegramMessage.text,
    messageId: telegramMessage.message_id,
    timestamp: new Date(),
    isOperator: false,
    chatId: chat._id
  }

  Messages.update({
    messageId: message.messageId
  }, {$set: message}, {upsert: true});
}


/**
 * @summary Get the active or waiting chat from the contact
 * @method server.callcenter.getChat
 * @param {Contacts} contact
 * @returns {Chats} Instance of Chats object
 */
function getChat(contact) {

  var query = {
    contactId: contact._id,
    status: 'active'
  };

  var chat = Chats.findOne(query);

  if (chat) {
    return chat;

  } else {

    query.status = 'waiting';
    chat = Chats.findOne(query);

    if (chat) {
      return chat;

    } else {
      query._id = Chats.insert(query);
      return query
    }
  }
}


/**
 * @summary Updates info of the contact from telegramUser
 * @method server.callcenter.updateInfo
 * @param {Object} user - user from telegram
 * @returns {Contacts} Instance of Contacts object
 */
function updateInfo(user) {

  contact = {};
  contact.telegramId = user.id;
  contact.name = user.first_name + ' ' + user.last_name;
  contact.username = user.username;

  Contacts.update(
    { telegramId: contact.telegramId },
    { $set: contact },
    { upsert: true })

  return Contacts.findOne({telegramId: contact.telegramId});

}
