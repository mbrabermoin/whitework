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
        <link href="//netdna.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.css" rel="stylesheet" />
        <link href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/67239/animate.min.css" rel="stylesheet" />
        <div className="body"></div>

        <div className="overlay">
          <div className="ui-panel login-panel animated bounceInDown">
            <header>
              <div className="left logo">
                <a href="#logo"><span>Changapp</span></a>
              </div>
            </header>

            <div className="login-form">
              <div className="subtitle">Ingresar o <a href="#register" onClick={this.props.registrarseModal} className="ui-button inactive register">Registrarse</a></div>
              <input type="text" id="email" placeholder="Usuario/email" />
              <input id="password" type="password" placeholder="Contraseña" />
            </div>

            <footer>
              <div className="right form-actions">
                <a href="#password" onClick={this.props.resetModal} className="ui-button inactive login">¿Olvidó su contraseña?</a>
                <a href="#login" onClick={signInMail} className="ui-button inactive register">Login</a>
              </div>
              <div className="left social-login">
                Ingresá con
                <i onClick={this.props.signInFacebook} className="fa fa-fw fa-lg fa-facebook" style={{cursor: 'pointer'}}></i>
                <i onClick={this.props.signInGoogle} className="fa fa-fw fa-lg fa-google" style={{cursor: 'pointer'}}></i>
                {/*    <i onClick={this.props.signInTwitter} className="fa fa-fw fa-twitter"></i>*/}
              </div>
            </footer>
          </div>
        </div>
      </div>


    );
  }
}

export default LoginScreenModal;