/**
 * @summary Stores informations about the contact of the telegram
 * @class collections.Contacts
 * @instancename contact
 * @param {String}    username     The unique username for identify the contact in telegram
 * @param {String}    name         The name of the contact in the telegram (first_name + last_name)
 * @param {String}    telegramId   The unique id to send messages to the contact
 * @param {Image}     photo        The profile photo of the contact in Telegram
 */
Contacts = new Mongo.Collection('contacts');
