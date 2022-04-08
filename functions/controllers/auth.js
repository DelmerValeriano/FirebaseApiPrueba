"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirebaseToken = exports.helloWorld = void 0;

var _firebase = require("./../configs/firebase");

var _utilities = require("./../commons/utilities");

const helloWorld = (request, response) => {
  const {
    uid
  } = request.body; //...

  (0, _utilities.buildResponse)(request, response, 200, {
    success: true,
    title: "Hello World"
  });
};

exports.helloWorld = helloWorld;

const getFirebaseToken = async (request, response) => {
  const {
    source
  } = request.body;

  if (source === "triggers-cassia-security") {
    try {
      const uid = "kp7y9cTP1obLIRO3XOejRXNemIe2"; //this is a example uid

      const firebaseToken = await (0, _firebase.auth)().createCustomToken(uid);
      const user = await (0, _firebase.auth)().signInWithCustomToken(firebaseToken);
      (0, _utilities.buildResponse)(request, response, 200, {
        success: true,
        title: "Confirmación",
        message: "Token obtenido con éxito",
        firebaseToken,
        user
      });
    } catch (error) {
      (0, _utilities.buildResponse)(request, response, 400, {
        success: false,
        title: "Error",
        message: "Ha ocurrido un error inesperado, intentelo más tarde. Si el error persiste debe comunicarse con soporte."
      });
    }
  } else {
    (0, _utilities.notAutorizedDefaultError)(request, response);
  }
};

exports.getFirebaseToken = getFirebaseToken;