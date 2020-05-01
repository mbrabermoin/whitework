import firebase from "firebase/app";

import "firebase/auth";


firebase.initializeApp({
  apiKey: "AIzaSyCCAokt6mPDtn-x9JGWi82sIPDp6HPk9yA",
  authDomain: "changapp-1ef52.firebaseapp.com",
  databaseURL: "https://changapp-1ef52.firebaseio.com",
  projectId: "changapp-1ef52",
  storageBucket: "changapp-1ef52.appspot.com",
  messagingSenderId: "201931800257",
  appId: "1:201931800257:web:428066342fe624b0695e40",
});

const auth = firebase.auth();
const providers = {
  google: new firebase.auth.GoogleAuthProvider(),
  facebook: new firebase.auth.FacebookAuthProvider(),
  twitter: new firebase.auth.TwitterAuthProvider(),
};

export { auth, providers };
export default firebase;