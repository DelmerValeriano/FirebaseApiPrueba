"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.newPersonTrigger = void 0;

var _firebase = require("./../../configs/firebase");

const newPersonTrigger = (newPerson, context) => {
  if (newPerson.type) {
    (0, _firebase.database)().collection("places").doc(context.params.placeId).collection("children").doc(context.params.childPlaceId).update("people", _firebase.database.FieldValue.increment(1));
  } //....

};

exports.newPersonTrigger = newPersonTrigger;