"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.notAutorizedDefaultError = exports.notAutorized = exports.buildNormalResponse = exports.buildResponse = exports.buildRequestWidthHeaders = void 0;

const cors = require('cors')({
  origin: true
});

const buildRequestWidthHeaders = (url, data, headers) => {
  return {
    method: "POST",
    url,
    headers,
    body: JSON.stringify(data)
  };
};

exports.buildRequestWidthHeaders = buildRequestWidthHeaders;

const buildResponse = (request, response, status, data) => {
  return cors(request, response, () => {
    response.status(status).send(JSON.stringify(data));
  });
};

exports.buildResponse = buildResponse;

const buildNormalResponse = (request, response, status, data) => {
  return cors(request, response, () => {
    response.status(status).send(data);
  });
};

exports.buildNormalResponse = buildNormalResponse;

const notAutorized = (request, response, error) => {
  const data = {
    success: false,
    message: error
  };
  const custonBuild = buildResponse(request, response, 400, data);
  return custonBuild;
};

exports.notAutorized = notAutorized;

const notAutorizedDefaultError = (request, response) => {
  const data = {
    success: false,
    error_code: "user_unauthorized",
    error_title: "Error",
    error_message: "Usuario no autorizado"
  };
  const custonBuild = buildResponse(request, response, 400, data);
  return custonBuild;
};

exports.notAutorizedDefaultError = notAutorizedDefaultError;