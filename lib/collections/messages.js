/**
 * @summary Store the text sended by the contact or operator
 * @class collections.Messages
 * @instancename message
 * @param {String}    text          The text sended by the operator or contact
 * @param {String}    messageId     The messageId from telegram, if the message it's from contact
 * @param {Datetime}  timestamp     The datetime of the message when received by our server
 * @param {Boolean}   isOperator    If the message it's from the operator or the contact
 * @param {String}    chatId        The id of the chat instance
 */
Messages = new Mongo.Collection('messages');
