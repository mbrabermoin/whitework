import React from 'react';
import { auth } from "../../firebase";

function resetPassword() {
    var email = document.getElementById("email").value;
    if (email === "") {
        alert("Por favor ingresar mail para resetear contraseña.")
    } else {
        if (email.search("@") && email.search(/\./) > 0) {
            auth.sendPasswordResetEmail(email).then(function (value) {
                alert("Un mail con link se ha enviado a " + email + " para restablecer contraseña. Presionar X para volver a ingresar su usuario.");
            })
                .catch(function (error) {
                    var errorMessage = error.message;
                    alert(errorMessage);
                });
        } else {
            alert("El formato del email is incorrecto.")
        }
    }
}

class ResetPassword extends React.Component {
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
                                <a href="#logo"><span>WhiteWork</span></a>
                            </div>
                            <div className="right">
                                <i onClick={this.props.volverLoginModal} className="fa fa-fw fa-window-close"></i>
                            </div>
                        </header>

                        <div className="login-form">
                            <div className="subtitle">Ingrese un mail para recuperar la contraseña:</div>
                            <input type="text" id="email" placeholder="email" />
                        </div>
                        <footer>
                            <div className="right form-actions">
                                <a href="#reset" onClick={resetPassword} className="ui-button inactive register">Resetear contraseña</a>
                            </div>
                        </footer>
                    </div>
                </div>


            </div>
        );
    }
}

export default ResetPassword;