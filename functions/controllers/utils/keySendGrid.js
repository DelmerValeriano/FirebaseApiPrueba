"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.key = void 0;

var _firebaseFunctions = require("firebase-functions");

const {
  sendgrid_key
} = (0, _firebaseFunctions.config)().development;
const key = sendgrid_key;
exports.key = key;