var BotUI = require('../components/BotUI');
var SessionService = require('../components/SessionService');

module.exports = function (bot, message) {

    let SkillSet = {

        about : function () {
            bot.startTyping(message, function () {
                bot.reply(message, BotUI().aboutMessage());
            });
        },

        showTodayWebview : function () {
             bot.startTyping(message, function () {
                  SessionService().getToday()
                    .then(function (items) {
                      BotUI().todayInWebview(bot, message);
                    })
                    .catch(function (err) {
                      console.log('ERROR SessionService().getToday()');
                      console.log(err);
                    });
            });
        },

        today: function() {
            bot.startTyping(message, function () {

                date = new Date();
                bot.reply(message, 'Atividades para hoje ' + (date.getMonth() + 1) + '/' + date.getDate() + ":");

                SessionService().getToday()
                    .then(function (items) {
                    BotUI().formatList(bot, message, items);
                })
                .catch(function (err) {
                    console.log('ERROR SessionService().getToday()');
                    console.log(err);
                });
            });
        },

        tomorrow: function() {
            bot.startTyping(message, function () {

              date = new Date();
              bot.reply(message, 'Atividades para amanhã ' + (date.getMonth() + 1) + '/' + (date.getDate() + 1) + ":");

              SessionService().getTomorrow()
                .then(function (items) {
                  BotUI().formatList(bot, message, items, false);
                })
                .catch(function (err) {
                  console.log('ERROR SessionService().getToday()');
                  console.log(err);
                });
            });
        },

        next: function () {
            bot.startTyping(message, function () {

                SessionService().getNext()
                .then(function (items) {
                    if(items.length > 0){
                        item = items[0];
                        msg = item.title + ' (' + item.track + ")\n" + item.presenter + ' - ' + item.date_start + '/' + item.date_end;
                        bot.reply(message, msg);
                    }else {
                        bot.reply(message, 'Não existem atividades para serem exibidas ;)');
                    }
                })
                .catch(function (err) {
                    console.log('ERROR SessionService().getNext()');
                    console.log(err);
                });
            });

        },

        current: function() {
            bot.startTyping(message, function () {

            SessionService().getCurrent()
            .then(function (items) {
                if (items.length > 0) {
                    item = items[0];
                    msg = item.title + ' (' + item.track + ")\n" + item.presenter + ' - ' + item.date_start + '/' + item.date_end;
                    bot.reply(message, msg);
                  } else {
                    bot.reply(message, 'Não há atividades agora ;)');
                  }
                })
                .catch(function (err) {
                  console.log('ERROR SessionService().getCurrent()');
                  console.log(err);
                });
            });
        },




    }

    return SkillSet;
}
