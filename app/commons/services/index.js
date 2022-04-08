import fetch from "node-fetch";
import { config } from "firebase-functions";
const { server_key } = config().development;

const buildRequest = (data) => {
  return {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `key=${server_key}`,
    },
    body: JSON.stringify(data),
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
      color: "#000000",
    },
    data: {
      sound: "default",
      body: `Pronto le infoma que su orden se encuentra en ${statusOrder}`,
      title: "Estado de tu orden pronto",
      content_available: true,
      priority: "high",
      color: "#000000",
    },
  };
  let response = await fetch(
    "https://fcm.googleapis.com/fcm/send",
    buildRequest(data)
  );
  let responseJson = await response.json();
  return responseJson;
};

export { sendPushNotifications };
