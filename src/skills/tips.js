var FacebookUI = require('../UI/FacebookUI');

module.exports.condition = function (params) {

  switch (params.message.type) {

    case 'message_received':
      if (params.message.text.toLowerCase() == 'dicas') {
        return true;
      }

      break;

    case 'facebook_postback':
      if (params.message.text == 'PAYLOAD_TIPS') {
        return true;
      }
      break;
  }

  return false;
};


module.exports.run = function (params) {

  controller = params.controller;
  bot = params.bot;
  message = params.message;

  bot.reply(message, 'Aqui vão algumas dicas para você que participará do Hack Town', function () {
    var genericTemplate = FacebookUI.generic_template_model();

    survivalGuideimageUrl = 'https://cdn-images-1.medium.com/max/800/1*qd3CnCCuhlhY72AdXcBWyQ.jpeg';
    survivalGuideMediumUrl = 'https://medium.com/@hacktown/guia-de-sobreviv%C3%AAncia-hack-town-2017-976fe3a1c973';

    genericTemplate.addElement('Conheça o Guia de Sobrevivência do Hack Town 2017', survivalGuideimageUrl, null, 'postback', null, false, null);
    genericTemplate.addButton('Ver Guia', 'web_url', survivalGuideMediumUrl, 0);

    sharedRidesGroupImageUrl = 'http://hacktown.com.br/wp-content/uploads/2016/07/21652750718_9ac10b9555_o-1-1440x430.jpg';
    sharedRidesGroupUrl = 'https://www.facebook.com/groups/102853160319048'

    genericTemplate.addElement('Conheça a comunidade de caronas e hospedagens', sharedRidesGroupImageUrl, null, 'postback', null, false, null);
    genericTemplate.addButton('Ver comunidade', 'web_url', sharedRidesGroupUrl, 1);

    replyMessage = genericTemplate.message;
    bot.reply(message, replyMessage);

  });
};