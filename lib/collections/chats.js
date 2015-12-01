/**
 * @summary Stores informations about the messages and time of conversation with a contact
 * @class collections.Chats
 * @instancename chat
 * @param {String}    contactId     "ForeignKey" to Contacts instance
 * @param {String}    operatorId    "ForeignKey" to Users instance
 * @param {Datetime}  startedAt    Start datetime of the chat
 * @param {Datetime}  finishedAt   End datetime of the chat
 * @param {Integer}   duration      The duration of the conversation
 * @param {String}    status        The status of the chat: ("active", "waiting", "done")
 */
Chats = new Mongo.Collection('chats');


/** Helpers for the collection Chats **/
Chats.helpers({

  /**
   * @summary Retrieve the contact instance of the chat
   * @method chat.contact
   * @memberOf collections.Chats
   * @instance
   * @returns {collections.Contacts}
   */
  contact: function () {
    return Contacts.findOne({_id: this.contactId});
  },

  /**
   * @summary Retrieve the operator instance of the chat
   * @method chat.operator
   * @memberOf collections.Chats
   * @instance
   * @returns {collections.Users}
   */
  operator: function () {
    return Meteor.users.findOne({_id: this.operatorId});
  },


  /**
   * @summary Retrieve all the messages instance of the chat
   * @method chat.messages
   * @memberOf collections.Chats
   * @instance
   * @returns {collections.Messages}
   */
  messages: function () {
    return Messages.find({chatId: this._id});
  },


  /**
   * @summary Retrieve the duration of the chat
   * @method chat.duration
   * @memberOf collections.Chats
   * @instance
   * @param {String} The measure that will be returned (seconds, hours or minutes)
   * @returns {Integer}
   */
  duration: function (measure) {
    if (measure == 'seconds') {
      return this.duration / 1000;
    } else {
      if (measure == 'hours') {
        return this.duration / 1000 / 60 / 60;
      } else {
        return this.duration / 1000 / 60;
      }
    }
  }

});
