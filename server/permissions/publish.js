'use strict';


Meteor.publish('contacts', function () {
  return Contacts.find();
});


Meteor.publish('cases', function (protocol) {
  var chat = Chats.findOne({protocol: parseInt(protocol), operatorId: this.userId});
  return Cases.find({contactId: chat.contactId}, {sort: {finishedAt: -1}});
})


Meteor.publish('chats', function () {
    return Chats.find({operatorId: this.userId, status: 'active'});
});


Meteor.publish('messages', function (protocol) {
  var chat = Chats.findOne({protocol: parseInt(protocol), operatorId: this.userId});

  if (chat) {
    var messages = Messages.find({chatId: chat._id});
    return messages;
  } else { return [] }
});

 
Meteor.publish('files', function() {
  return Files.find({});
});
