import { database } from "./../../configs/firebase";

export const newUserTrigger = async (newUser) => {
  try {
    const { uid, email, providerData } = newUser;
    console.log(newUser);
    const usersRef = database().collection("users");
    if (email) {
      usersRef.doc(uid).set({
        email,
      });
    } else {
      usersRef.doc(uid).set({
        email: providerData[0].email,
      });
    }
    console.log("Written user document");
  } catch (error) {
    console.error("Error adding document: ", error);
  }
};
