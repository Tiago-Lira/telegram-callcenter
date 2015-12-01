/**
 * @summary Stores the history of the finished chats
 * @class collections.Cases
 * @instancename case
 * @param {String}    contactId     "ForeignKey" to Contacts instance
 * @param {String}    operatorId    "ForeignKey" to Users instance
 * @param {String}    chatId        "ForeignKey" to Chats instance
 * @param {Datetime}  startedAt     Start datetime of the chat
 * @param {Datetime}  finishedAt    End datetime of the chat
 * @param {Integer}   duration      The duration of the conversation
 * @param {String}    subject       The subject of the chat
 * @param {String}    obs           Observations about the case and contact
 * @param {List}      messages      All messages registered from the chat
 */
Cases = new Mongo.Collection('cases');
