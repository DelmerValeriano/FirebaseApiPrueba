"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateUser = exports.deletUser = exports.getUsers = exports.getUserId = exports.createUser = void 0;

var _firebase = require("./../configs/firebase");

var _utilities = require("./../commons/utilities");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) { symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); } keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const date = _firebase.database.Timestamp.now();

const dateFormt = JSON.stringify(date.toDate()).replace(/['"]+/g, '').substring(0, 10);

const createUser = async (request, response) => {
  const {
    email
  } = request.body;
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = regex.test(email);
  const query = (0, _firebase.database)().collection('users').where('email', '==', email);
  const querySnapshot = await query.get();
  const docs = querySnapshot.docs;
  const responseEmail = docs.map(doc => ({
    email: doc.data().email
  }));
  console.log(responseEmail.length);

  if (responseEmail.length) {
    return (0, _utilities.buildResponse)(request, response, 400, {
      success: false,
      title: "Error",
      message: "Correo ya en uso."
    });
  } else if (!valid) {
    return (0, _utilities.buildResponse)(request, response, 400, {
      success: false,
      title: "Error",
      message: "Correo no valido."
    });
  }

  try {
    await (0, _firebase.database)().collection('users') // Almacena en la base de datos
    .doc().create({
      name: request.body.name,
      email: request.body.email,
      createBy: request.body.emailCreator,
      creationDate: dateFormt,
      // Toma la fecha Actual*
      modificationDate: dateFormt,
      modifiedBy: request.body.emailCreator
    });
    (0, _utilities.buildResponse)(request, response, 200, {
      success: true,
      title: "Confirmación",
      message: "Usuario Creado."
    });
  } catch (error) {
    (0, _utilities.buildResponse)(request, response, 400, {
      success: false,
      title: "Error",
      message: "Ha ocurrido un error inesperado, no se registro el usuario."
    });
  }
};

exports.createUser = createUser;

const getUserId = async (request, response) => {
  const {
    userId
  } = request.body;

  try {
    const doc = (0, _firebase.database)().collection('users').doc(userId);
    const result = await doc.get();
    const user = result.data();

    if (!user) {
      (0, _utilities.buildResponse)(request, response, 400, {
        success: false,
        title: "Error",
        message: "Usuario no encontrado."
      });
    }

    (0, _utilities.buildResponse)(request, response, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      user
    });
  } catch (error) {
    (0, _utilities.buildResponse)(request, response, 400, {
      success: false,
      title: "Error",
      message: "Ha ocurrido un error inesperado, usuario no encontrado."
    });
  }
};

exports.getUserId = getUserId;

const getUsers = async (request, response) => {
  try {
    const query = (0, _firebase.database)().collection('users');
    const order = query.orderBy('creationDate', 'desc');
    const querySnapshot = await order.get();
    const docs = querySnapshot.docs;
    const users = docs.map(doc => _objectSpread({
      id: doc.id
    }, doc.data()));
    (0, _utilities.buildResponse)(request, response, 200, {
      success: true,
      title: "Confirmación",
      message: "Ok",
      users
    });
  } catch (error) {
    (0, _utilities.buildResponse)(request, response, 400, {
      success: false,
      title: "Error",
      message: "Ha ocurrido un error inesperado, usuarios no encontrados."
    });
  }
};

exports.getUsers = getUsers;

const deletUser = async (request, response) => {
  const {
    userId
  } = request.body;

  try {
    const doc = (0, _firebase.database)().collection('users').doc(userId);
    const result = await doc.get();
    const user = result.data();

    if (!user) {
      (0, _utilities.buildResponse)(request, response, 400, {
        success: false,
        title: "Error",
        message: "Usuario no encontrado."
      });
    }

    await doc.delete();
    (0, _utilities.buildResponse)(request, response, 200, {
      success: true,
      title: "Confirmación",
      message: "Usuario Eliminado."
    });
  } catch (error) {
    (0, _utilities.buildResponse)(request, response, 400, {
      success: false,
      title: "Error",
      message: "Ha ocurrido un error inesperado, usuario no encontrado."
    });
  }
};

exports.deletUser = deletUser;

const updateUser = async (request, response) => {
  const {
    userId,
    email
  } = request.body;
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const valid = regex.test(email);

  if (!valid) {
    return (0, _utilities.buildResponse)(request, response, 400, {
      success: false,
      title: "Error",
      message: "Correo no valido."
    });
  }

  try {
    const user = (0, _firebase.database)().collection('users').doc(userId);
    await user.update({
      name: request.body.name,
      email: request.body.email,
      modificationDate: dateFormt,
      modifiedBy: request.body.emailCreator
    });
    (0, _utilities.buildResponse)(request, response, 200, {
      success: true,
      title: "Confirmación",
      message: "Usuario Actualizado",
      user
    });
  } catch (error) {
    (0, _utilities.buildResponse)(request, response, 400, {
      success: false,
      title: "Error",
      message: "Ha ocurrido un error inesperado, usuario no encontrado."
    });
  }
};

exports.updateUser = updateUser;