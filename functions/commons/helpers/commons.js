"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.buildResponse = void 0;

var _cors = _interopRequireDefault(require("cors"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const buildResponse = (request, response, status, data) => {
  return (0, _cors.default)(request, response, () => {
    response.status(status).send(JSON.stringify(data));
  });
};

exports.buildResponse = buildResponse;