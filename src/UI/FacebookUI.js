'use strict';

module.exports.imageMessage = function (imageUrl) {
  return {
    attachment: {
      type: "image",
      payload: {
        url: imageUrl
      }
    }
  };
};

module.exports.webview_button = function (textMessage, urlPath, buttonTitle) {
  return {
    message: {
      attachment: {
        type: 'template',
        payload: {
          template_type: 'button',
          text: textMessage,
          buttons: [
            {
              type: 'web_url',
              url: urlPath,
              title: buttonTitle,
              webview_height_ratio: 'tall',
            }
          ]
        }
      }
    }
  };
};

module.exports.staticMapLocationDisplay = function (title, lat, long, address) {
  return {
    attachment: {
      type: "template",
      payload: {
        template_type: "generic",
        elements: {
          element: {
            title: title,
            subtitle: address,
            image_url: "https:\/\/maps.googleapis.com\/maps\/api\/staticmap?size=764x400&center=" + lat + "," + long + "&zoom=16&markers=" + lat + "," + long,
            item_url: "http:\/\/maps.apple.com\/maps?q=" + lat + "," + long + "&z=16"
          }
        }
      }
    }
  };
};

module.exports.quick_reply = function () {

  var Widget = {
    message: {
      text: '',
      quick_replies: []
    },
    addQuickReply: function (content_type, title, payload) {
      var quick_reply = {
        content_type: content_type,
        title: title,
        payload: payload
      };
      Widget.message.quick_replies.push(quick_reply);
    }
  };
  return Widget;
};

module.exports.button = function (messageText) {

  var postbackButtonInterface = {

    postBackButton: {
      attachment: {
        type: "template",
        payload: {
          template_type: "button",
          text: messageText,
          buttons: []
        }
      }
    },

    addButton: function (title, type, url_or_payload) {
      var newButton;
      if (type === 'web_url') {
        newButton = {
          type: type,
          url: url_or_payload,
          title: title
        }
      }
      else if (type === 'postback') {
        newButton = {
          type: type,
          title: title,
          payload: url_or_payload //TODO payload com id para consultar detalhes de uma palestra
        }
      }
      postbackButtonInterface.postBackButton.attachment.payload.buttons.push(newButton);
    }

  };

  return postbackButtonInterface;
};

module.exports.generic_template_model = function () {
  var GenericTemplateInterface = {

    message: {
      attachment: {
        type: "template",
        payload: {
          template_type: "generic",
          elements: []
        }
      }
    },

    addElement: function (title, image_url, subtitle, type, urlPath, isExtension, fallback_url) {
      var newElement = {
        title: title,
        image_url: image_url,
        subtitle: subtitle,
        buttons: []
      };
      GenericTemplateInterface.message.attachment.payload.elements.push(newElement);
    },

    addButton: function (title, type, url_or_payload, elementIndex) {
      var newButton;
      if (type === 'web_url') {
        newButton = {
          type: type,
          url: url_or_payload,
          title: title
        }
      }
      else if (type === 'postback') {
        newButton = {
          type: type,
          title: title,
          payload: url_or_payload //TODO payload com id para consultar detalhes de uma palestra
        }
      }
      GenericTemplateInterface.message.attachment.payload.elements[elementIndex].buttons.push(newButton);
    }
  };

  return GenericTemplateInterface;
};