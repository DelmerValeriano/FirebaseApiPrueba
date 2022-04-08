"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newUserTrigger = void 0;

var _firebase = require("./../../configs/firebase");

const newUserTrigger = async newUser => {
  try {
    const {
      uid,
      email,
      providerData
    } = newUser;
    console.log(newUser);
    const usersRef = (0, _firebase.database)().collection("users");

    if (email) {
      usersRef.doc(uid).set({
        email
      });
    } else {
      usersRef.doc(uid).set({
        email: providerData[0].email
      });
    }

    console.log("Written user document");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};

exports.newUserTrigger = newUserTrigger;