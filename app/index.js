import { https, auth, firestore } from "firebase-functions";
import { buildWithAuth, buildWithoutAuth } from "./controllers/middleware/auth";

//Imports all controllers
import * as user from "./controllers/auth";
import * as crud from "./controllers/user";

//Imports all triggers
import * as userTrigger from "./controllers/triggers/user";
//----------------------

export const createUser = https.onRequest(async (request, response) => {
  (await buildWithAuth(request, response))(crud.createUser);
});

export const getUserId = https.onRequest(async (request, response) => {
  (await buildWithAuth(request, response))(crud.getUserId);
});

export const getUsers = https.onRequest(async (request, response) => {
  (await buildWithAuth(request, response))(crud.getUsers);
});

export const deletUser = https.onRequest(async (request, response) => {
  (await buildWithAuth(request, response))(crud.deletUser);
});

export const updateUser = https.onRequest(async (request, response) => {
  (await buildWithAuth(request, response))(crud.updateUser);
});

export const verifyAuthUser = https.onRequest(async (request, response) => {
  (await buildWithAuth(request, response))(user.helloWorld);
});

//Triggers
export const triggerUser = auth.user().onCreate(async user => {
  await userTrigger.newUserTrigger(user);
});
