import { auth, providers } from "../firebase";

export default {
  /*signInMail: () => auth.signInWithEmailAndPassword('mbrabermoin@grupoassa.com', 'lozano04').catch(function(error) {
    //var errorCode = error.code;
    var errorMessage = error.message;
    alert(errorMessage)
  }),*/
 
  signInGoogle: () => auth.signInWithPopup(providers.google),
  signInFacebook: () => auth.signInWithPopup(providers.facebook),
  signInTwitter: () => auth.signInWithPopup(providers.twitter),
  signOut: () => auth.signOut(),
  onChange: (callback) => auth.onAuthStateChanged(callback),
};