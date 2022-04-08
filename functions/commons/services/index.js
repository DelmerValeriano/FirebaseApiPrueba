"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sendPushNotifications = void 0;

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

var _firebaseFunctions = require("firebase-functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  server_key
} = (0, _firebaseFunctions.config)().development;

const buildRequest = data => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `key=${server_key}`
    },
    body: JSON.stringify(data)
  };
};

const sendPushNotifications = async (phoneToken, statusOrder) => {
  let data = {
    to: `${phoneToken}`,
    notification: {
      sound: "default",
      body: `Pronto le infoma que su orden se encuentra en ${statusOrder}`,
      title: "Estado de tu orden pronto",
      content_available: true,
      priority: "high",
      color: "#000000"
    },
    data: {
      sound: "default",
      body: `Pronto le infoma que su orden se encuentra en ${statusOrder}`,
      title: "Estado de tu orden pronto",
      content_available: true,
      priority: "high",
      color: "#000000"
    }
  };
  let response = await (0, _nodeFetch.default)("https://fcm.googleapis.com/fcm/send", buildRequest(data));
  let responseJson = await response.json();
  return responseJson;
};

exports.sendPushNotifications = sendPushNotifications;