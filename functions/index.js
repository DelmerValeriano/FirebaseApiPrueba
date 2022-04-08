"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.triggerUser = exports.verifyAuthUser = exports.updateUser = exports.deletUser = exports.getUsers = exports.getUserId = exports.createUser = void 0;

var _firebaseFunctions = require("firebase-functions");

var _auth = require("./controllers/middleware/auth");

var user = _interopRequireWildcard(require("./controllers/auth"));

var crud = _interopRequireWildcard(require("./controllers/user"));

var userTrigger = _interopRequireWildcard(require("./controllers/triggers/user"));

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

//Imports all controllers
//Imports all triggers
//----------------------
const createUser = _firebaseFunctions.https.onRequest(async (request, response) => {
  (await (0, _auth.buildWithAuth)(request, response))(crud.createUser);
});

exports.createUser = createUser;

const getUserId = _firebaseFunctions.https.onRequest(async (request, response) => {
  (await (0, _auth.buildWithAuth)(request, response))(crud.getUserId);
});

exports.getUserId = getUserId;

const getUsers = _firebaseFunctions.https.onRequest(async (request, response) => {
  (await (0, _auth.buildWithAuth)(request, response))(crud.getUsers);
});

exports.getUsers = getUsers;

const deletUser = _firebaseFunctions.https.onRequest(async (request, response) => {
  (await (0, _auth.buildWithAuth)(request, response))(crud.deletUser);
});

exports.deletUser = deletUser;

const updateUser = _firebaseFunctions.https.onRequest(async (request, response) => {
  (await (0, _auth.buildWithAuth)(request, response))(crud.updateUser);
});

exports.updateUser = updateUser;

const verifyAuthUser = _firebaseFunctions.https.onRequest(async (request, response) => {
  (await (0, _auth.buildWithAuth)(request, response))(user.helloWorld);
}); //Triggers


exports.verifyAuthUser = verifyAuthUser;

const triggerUser = _firebaseFunctions.auth.user().onCreate(async user => {
  await userTrigger.newUserTrigger(user);
});

exports.triggerUser = triggerUser;