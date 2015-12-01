
Meteor.startup(function () {

    var items = [];
    var messages = [];

    TelegramBot.token = process.env.TELEGRAM_TOKEN;
    TelegramBot.poll = poll;

    if (process.env.USE_TELEGRAM == 'true') {
      TelegramBot.start();
    }

    /** Override's of poll method from TelegramBot **/
    function poll () {
      var result = TelegramBot.method('getUpdates', {
        offset: TelegramBot.getUpdatesOffset + 1
      });
      if (result) {
        handlePollResult(result.result);
      }
    }

    /** Handles all messages updates from telegram **/
    function handlePollResult(data) {
      data.map(function (item) {

          item_id = item.update_id;
          message_id = item.message.message_id;

          if (items.indexOf(item_id) == -1 && messages.indexOf(message_id) == -1) {
              TelegramBot.getUpdatesOffset = item.update_id;
              var message = item.message;
              items.push(item_id);
              messages.push(message_id);
              Meteor.call('handleMessages', message);
          }
      });
    };


    TelegramBot.sendMessage = function (chatId, message, parse_mode) {
      return new Promise(function (success, error) {

        if (!parse_mode) {
          parse_mode = 'Markdown';
        }

        var url = TelegramBot.requestUrl('sendMessage');
        var response = HTTP.get(url, {
          params: {
            chat_id: chatId,
            text: message,
            parse_mode: parse_mode
          }
        });

        if (response.data) {
          success();
        } else {
          error();
        }
      })
    }

    TelegramBot.sendDocument = function(chatId, file) {

      var restler = Npm.require('restler');
      var url = TelegramBot.requestUrl('sendDocument') + '?chat_id=' + chatId;
      var path = FilesStore.path + '/' + file.copies.files.key;
      var fileName = file.name();
      var fileSize = file.size();
      var contentType = file.type();
      var encoding = 'utf-8';

      restler.post(url, {
        data: {
          chat_id: chatId,
          document: restler.file(path, fileName, fileSize, encoding, contentType),
        },
        multipart: true
      }).on('complete', function (data) {});
    }

});