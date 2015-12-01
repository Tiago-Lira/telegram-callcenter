

Cases.allow({
  insert: function (userId, caseObject) {
    return userId && caseObject.operatorId === userId;
  },
  update: function (userId, caseObject, fields, modifier) {
    return userId && caseObject.operatorId === userId;
  },
  remove: function (userId, caseObject) {
    return userId && caseObject.operatorId === userId;
  }
});


Chats.allow({
  insert: function (userId, chat) {
    return userId && chat.operatorId === userId;
  },
  update: function (userId, chat, fields, modifier) {
    return userId && chat.operatorId === userId;
  },
  remove: function (userId, chat) {
    return userId && chat.operatorId === userId;
  }
});


Contacts.allow({
  insert: function (userId, contact) {
    return false;
  },
  update: function (userId, contact, fields, modifier) {
    return false;
  },
  remove: function (userId, contact) {
    return false;
  }
});


Messages.allow({
  insert: function (userId, message) {
    return false;
  },
  update: function (userId, message, fields, modifier) {
    return false;
  },
  remove: function (userId, message) {
    return false;
  }
});


Files.allow({
  insert: function (userId) {
    return true;
  },
  remove: function (userId) {
    return (userId ? true : false);
  },
  download: function () {
    return true;
  },
  update: function (userId) {
    return (userId ? true : false);
  }
});
