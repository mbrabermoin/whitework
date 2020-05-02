import React from 'react';
import { auth } from "../../firebase";

function signInMail() {
  var email = document.getElementById("email").value;
  var password = document.getElementById("password").value;
  auth.signInWithEmailAndPassword(email, password).catch(function (error) {
    var errorMessage = error.message;
    alert(errorMessage)
  });
}
class LoginScreenModal extends React.Component {
  render() {
    return (
      <div>
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.0.3/css/font-awesome.css" rel="stylesheet" />
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
              <div class="subtitle">Ingresar o <a href="#register" onClick={this.props.registrarseModal} class="ui-button inactive register">Registrarse</a></div>
              <input type="text" id="email" placeholder="Usuario/email" />
              <input id="password" type="password" placeholder="Contraseña" />
            </div>

            <footer>
              <div class="right form-actions">
                <a href="#password" onClick={this.props.resetModal} class="ui-button inactive login">¿Olvido contraseña?</a>
                <a href="#login" onClick={signInMail} class="ui-button inactive register">Login</a>
              </div>
              <div class="left social-login">
                Loguearse con
                <i onClick={this.props.signInFacebook} class="fa fa-fw fa-facebook" style={{cursor: 'pointer'}}></i>
                <i onClick={this.props.signInGoogle} class="fa fa-fw fa-google-plus" style={{cursor: 'pointer'}}></i>
                {/*    <i onClick={this.props.signInTwitter} class="fa fa-fw fa-twitter"></i>*/}
              </div>
            </footer>
          </div>
        </div>
      </div>


    );
  }
}

export default LoginScreenModal;