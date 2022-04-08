const cors = require('cors')({ origin: true });

export const buildRequestWidthHeaders = (url, data, headers) => {
  return {
    method: "POST",
    url,
    headers,
    body: JSON.stringify(data),
  };
};

export const buildResponse = (request, response, status, data) => {
  return cors(request, response, () => {
    response.status(status).send(JSON.stringify(data));
  });
};

export const buildNormalResponse = (request, response, status, data) => {
  return cors(request, response, () => {
    response.status(status).send(data);
  });
};

export const notAutorized = (request, response, error) => {
  const data = {
    success: false,
    message: error,
  };
  const custonBuild = buildResponse(request, response, 400, data);
  return custonBuild;
};

export const notAutorizedDefaultError = (request, response) => {
  const data = {
    success: false,
    error_code: "user_unauthorized",
    error_title: "Error",
    error_message: "Usuario no autorizado",
  };
  const custonBuild = buildResponse(request, response, 400, data);
  return custonBuild;
};
