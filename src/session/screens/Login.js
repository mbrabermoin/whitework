import React from "react";
import { auth } from "../../firebase";
function createMailUser(){
  var email= document.getElementById("email").value;
  var password= document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password).catch(function(error) {
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
function signInMail(){
  var email= document.getElementById("email").value;
  var password= document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password).catch(function(error) {
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
function resetPassword(){
  var email= document.getElementById("email").value;
  auth.sendPasswordResetEmail(email).catch(function(error) {
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
const LoginScreen = ({ signInGoogle, signInFacebook, status }) => (
  <div>
    {status === "init" && <span>Intentando de restaurar sesión...</span>}
    {status === "restored" && <div>
    <label>Mail:</label>
    <br></br>
    <input type="text" id="email" name="email"/>
    <br></br>
    <label>Password:</label>
    <br></br>
    <input type="text" id="password" name="password"/>
    <br></br>
    <button onClick={signInMail}>Iniciar sesión</button>
    <br></br>
    <button onClick={resetPassword}>Olvide mi contraseña</button>
    <br></br>
    <button onClick={createMailUser}>Crear Cuenta</button>
    <br></br>
    <button onClick={signInGoogle}>Iniciar sesión con Google</button>
    <br></br>
    <button onClick={signInFacebook}>Iniciar sesión con Facebook</button>
    </div>
    }
   
  </div>
);

export default LoginScreen;