import { database, auth } from "./../configs/firebase";
import {
    buildResponse,
    notAutorizedDefaultError,
} from "./../commons/utilities";

const date = database.Timestamp.now();

const dateFormt = JSON.stringify(date.toDate()).replace(/['"]+/g, '').substring(0,10);

export const createUser = async (request, response) => {
    const { email } = request.body;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regex.test(email);

    const query = database().collection('users').where('email', '==', email);
    const querySnapshot = await query.get();
    const docs = querySnapshot.docs;
    const responseEmail = docs.map(doc => ({
        email: doc.data().email,
    }));
    console.log(responseEmail.length);

    if (responseEmail.length) {
        return buildResponse(request, response, 400, {
            success: false,
            title: "Error",
            message: "Correo ya en uso.",
        });
    } else if (!valid) {
        return buildResponse(request, response, 400, {
            success: false,
            title: "Error",
            message: "Correo no valido.",
        });
    }

    try {
        await database().collection('users') // Almacena en la base de datos
            .doc()
            .create({
                name: request.body.name,
                email: request.body.email,
                createBy: request.body.emailCreator,
                creationDate: dateFormt, // Toma la fecha Actual*
                modificationDate: dateFormt,
                modifiedBy: request.body.emailCreator
            });

        buildResponse(request, response, 200, {
            success: true,
            title: "Confirmación",
            message: "Usuario Creado.",
        });
    } catch (error) {
        buildResponse(request, response, 400, {
            success: false,
            title: "Error",
            message: "Ha ocurrido un error inesperado, no se registro el usuario.",
        });
    }
};

export const getUserId = async (request, response) => {
    const { userId } = request.body;
    try {
        const doc = database().collection('users').doc(userId);
        const result = await doc.get();
        const user = result.data();
        if (!user) {
            buildResponse(request, response, 400, {
                success: false,
                title: "Error",
                message: "Usuario no encontrado.",
            });
        }

        buildResponse(request, response, 200, {
            success: true,
            title: "Confirmación",
            message: "Ok",
            user,
        });
    } catch (error) {
        buildResponse(request, response, 400, {
            success: false,
            title: "Error",
            message: "Ha ocurrido un error inesperado, usuario no encontrado.",
        });
    }
};

export const getUsers = async (request, response) => {
    try {
        const query = database().collection('users');
        const order = query.orderBy('creationDate', 'desc');
        const querySnapshot = await order.get();
        const docs = querySnapshot.docs;
        const users = docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
        }));
        buildResponse(request, response, 200, {
            success: true,
            title: "Confirmación",
            message: "Ok",
            users,
        });
    } catch (error) {
        buildResponse(request, response, 400, {
            success: false,
            title: "Error",
            message: "Ha ocurrido un error inesperado, usuarios no encontrados.",
        });
    }
};

export const deletUser = async (request, response) => {
    const { userId } = request.body;
    try {
        const doc = database().collection('users').doc(userId);
        const result = await doc.get();
        const user = result.data();
        if (!user) {
            buildResponse(request, response, 400, {
                success: false,
                title: "Error",
                message: "Usuario no encontrado.",
            });
        }
        await doc.delete();
        buildResponse(request, response, 200, {
            success: true,
            title: "Confirmación",
            message: "Usuario Eliminado.",
        });
    } catch (error) {
        buildResponse(request, response, 400, {
            success: false,
            title: "Error",
            message: "Ha ocurrido un error inesperado, usuario no encontrado.",
        });
    }
};

export const updateUser = async (request, response) => {
    const { userId, email } = request.body;
    const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    const valid = regex.test(email);

    if (!valid) {
        return buildResponse(request, response, 400, {
            success: false,
            title: "Error",
            message: "Correo no valido.",
        });
    }
    try {
        const user = database().collection('users').doc(userId);
        await user.update({
            name: request.body.name,
            email: request.body.email,
            modificationDate: dateFormt,
            modifiedBy: request.body.emailCreator,
        });
        buildResponse(request, response, 200, {
            success: true,
            title: "Confirmación",
            message: "Usuario Actualizado",
            user
        });
    } catch (error) {
        buildResponse(request, response, 400, {
            success: false,
            title: "Error",
            message: "Ha ocurrido un error inesperado, usuario no encontrado.",
        });
    }
};