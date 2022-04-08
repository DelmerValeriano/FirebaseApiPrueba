import cors from "cors";

const buildResponse = (request, response, status, data) => {
  return cors(request, response, () => {
    response.status(status).send(JSON.stringify(data));
  });
};

export { buildResponse };
