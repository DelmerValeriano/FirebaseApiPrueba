import { database, auth } from "./../configs/firebase";
import {
  buildResponse,
  notAutorizedDefaultError,
} from "./../commons/utilities";

export const helloWorld = (request, response) => {
  const { uid } = request.body;
  //...
  buildResponse(request, response, 200, {
    success: true,
    title: "Hello World",
  });
};

export const getFirebaseToken = async (request, response) => {
  const { source } = request.body;
  if (source === "triggers-cassia-security") {
    try {
      const uid = "kp7y9cTP1obLIRO3XOejRXNemIe2"; //this is a example uid
      const firebaseToken = await auth().createCustomToken(uid);
      const user = await auth().signInWithCustomToken(firebaseToken);
      buildResponse(request, response, 200, {
        success: true,
        title: "Confirmación",
        message: "Token obtenido con éxito",
        firebaseToken,
        user,
      });
    } catch (error) {
      buildResponse(request, response, 400, {
        success: false,
        title: "Error",
        message:
          "Ha ocurrido un error inesperado, intentelo más tarde. Si el error persiste debe comunicarse con soporte.",
      });
    }
  } else {
    notAutorizedDefaultError(request, response);
  }
};
