const SessionService = require('../services/SessionService');
const PresenterService = require('../services/PresenterService');
const BotUI = require('../UI/BotUI');

module.exports = function (controller) {

    controller.hears(['session_details_'+'(.*)'],['message_received'], function (bot, message) {
        var sessionId = message.match[1];

        bot.startTyping(message, function () {
            SessionService().getDetails(sessionId)
            .then(function (items) {
                BotUI().showActivityDetails(bot, message, items)
            })
            .catch(function (err) {
                console.log('ERROR SessionService().getDetails()');
                console.log(err);
            });
        });
    });

};