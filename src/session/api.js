import { auth, providers } from "../firebase";
import db from "../index";

export default {

  signInGoogle: () => auth.signInWithPopup(providers.google).then(registeredUser => {
    var docRef = db.collection("usuarios").doc(registeredUser.user.email);
    docRef.get().then(function (doc) {
      if (!doc.exists) {
        db.collection("usuarios").doc(registeredUser.user.email).set({
          email: registeredUser.user.email,
          urlFoto: registeredUser.user.photoURL,
          telefono: registeredUser.user.phoneNumber,
          fullname: registeredUser.user.displayName,
          facebook: "",
          instagram: "",
          linkedin: "",
          twitter: "",
          empleadoActivo: false,
          descripcion: "",
          ocupacion: "",
          ubicacion: "",
        });
      }
    });
  }),
  signInFacebook: () => auth.signInWithPopup(providers.facebook).then(registeredUser => {
    var docRef = db.collection("usuarios").doc(registeredUser.user.email);
    docRef.get().then(function (doc) {
      if (!doc.exists) {
        db.collection("usuarios").doc(registeredUser.user.email).set({
          email: registeredUser.user.email,
          urlFoto: registeredUser.user.photoURL,
          telefono: registeredUser.user.phoneNumber,
          fullname: registeredUser.user.displayName,
          facebook: "",
          instagram: "",
          linkedin: "",
          twitter: "",
          empleadoActivo: false,
          descripcion: "",
          ocupacion: "",
          ubicacion: "",
        });
      }
    });
  }),
  signInTwitter: () => auth.signInWithPopup(providers.twitter),
  signOut: () => auth.signOut(),
  onChange: (callback) => auth.onAuthStateChanged(callback)


};