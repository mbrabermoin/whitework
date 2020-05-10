import { auth, providers } from "../firebase";
import db from "../index";

export default {
  /*signInMail: () => auth.signInWithEmailAndPassword('mbrabermoin@grupoassa.com', 'lozano04').catch(function(error) {
    //var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  }),*/
 
  signInGoogle: () => auth.signInWithPopup(providers.google).then(registeredUser => {
    db.collection("usuarios").doc(registeredUser.user.uid).set({
      email: registeredUser.user.email,
      urlFoto: registeredUser.user.photoURL,
      telefono: registeredUser.user.phoneNumber,
      fullname: registeredUser.user.displayName
  });
  }),
  signInFacebook: () => auth.signInWithPopup(providers.facebook).then(registeredUser => {
    db.collection("usuarios").doc(registeredUser.user.uid).set({
      email: registeredUser.user.email
  });
  }),
  signInTwitter: () => auth.signInWithPopup(providers.twitter),
  signOut: () => auth.signOut(),
  onChange: (callback) => auth.onAuthStateChanged(callback)

  
};