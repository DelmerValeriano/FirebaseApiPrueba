import { auth } from "./../../configs/firebase";
import { notAutorized } from "./../../commons/utilities";

export const buildWithAuth = async (request, response, database) => {
  const { idToken, source, enviroment } = request.body;

  try {
    if (source !== "triggers-custom-key-2019") {
      const decodedToken = await auth().verifyIdToken(idToken);
      request.body.uid = decodedToken.uid;
      return (callback) => {
        return callback(request, response, database);
      };
    } else {
      const uid = enviroment === "production" ? "12345" : "54321";
      request.body.uid = uid;
      return (callback) => {
        return callback(request, response, database);
      };
    }
  } catch (error) {
    return () => {
      const errorMessage =
        error.code === "auth/argument-error"
          ? "Usuario no autorizado"
          : error.message;
      return notAutorized(request, response, errorMessage);
    };
  }
};

export const buildWithoutAuth = async (request, response, database) => {
  return (callback) => {
    return callback(request, response, database);
  };
};
