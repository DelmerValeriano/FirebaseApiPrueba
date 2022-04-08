"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.auth = exports.storage = exports.database = void 0;

var _firebaseAdmin = _interopRequireDefault(require("firebase-admin"));

var _firebaseFunctions = require("firebase-functions");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const {
  type,
  project_id,
  private_key_id,
  private_key,
  client_email,
  client_id,
  auth_uri,
  token_uri,
  auth_provider_x509_cert_url,
  client_x509_cert_url,
  storage_bucket
} = (0, _firebaseFunctions.config)().development;

_firebaseAdmin.default.initializeApp({
  credential: _firebaseAdmin.default.credential.cert({
    type,
    project_id,
    private_key_id,
    private_key: private_key.replace(/\\n/g, "\n"),
    client_email,
    client_id,
    auth_uri,
    token_uri,
    auth_provider_x509_cert_url,
    client_x509_cert_url
  }),
  storageBucket: storage_bucket
});

const database = _firebaseAdmin.default.firestore;
exports.database = database;
const storage = _firebaseAdmin.default.storage;
exports.storage = storage;
const auth = _firebaseAdmin.default.auth;
exports.auth = auth;