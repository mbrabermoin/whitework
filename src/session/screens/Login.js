import React from "react";
import { auth } from "../../firebase";
import './Login.css';
function createMailUser() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
function signInMail() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
function resetPassword() {
  var email = document.getElementById("email").value;
  auth.sendPasswordResetEmail(email).catch(function (error) {
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
const LoginScreen = ({ signInGoogle, signInFacebook,signInTwitter, status }) => ( 
      <div>
        {status === "init" && <span>Intentando de restaurar sesión...</span>}
        {status === "restored" &&  <div>
<link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet"/>

<link href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67239/animate.min.css" rel="stylesheet" />

<div class="body"></div>

<div class="overlay">
  <div class="ui-panel login-panel animated bounceInDown">
    <header>
      <div class="left logo">
        <a href="#logo"><span>Changapp</span></a>
      </div>
    </header>
    
    <div class="login-form">
      <div class="subtitle">Login or register</div>
      <input type="text" id="email" placeholder="Usuario/email" />
      <input type="text" id="password" placeholder="Contraseña" />
    </div>
    
    <footer>      
      <div class="right form-actions">
        <a href="#login" onClick={resetPassword} class="ui-button inactive login">¿Olvido contraseña?</a>
        <a href="#register" onClick={signInMail} class="ui-button inactive register">Login</a>
      </div>
      <div class="left social-login">
        Loguearse con 
        <i onClick={signInFacebook} class="fa fa-fw fa-facebook"></i>
        <i onClick={signInGoogle} class="fa fa-fw fa-google-plus"></i>
        <i onClick={signInTwitter} class="fa fa-fw fa-twitter"></i>
      </div>
    </footer>
  </div>
</div>


  </div>/*<div>
          <label>Mail:</label>
          <br></br>
          <input type="text" id="email" name="email" />
          <br></br>
          <label>Password:</label>
          <br></br>
          <input type="text" id="password" name="password" />
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
        </div>*/
        }

      </div>
      );
      
export default LoginScreen;