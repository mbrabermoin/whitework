import React from 'react';
import { auth } from "../../firebase";

function createMailUser() {
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;
    var password2 = document.getElementById("password2").value;
    if (email === "") {
        alert("Por favor ingresar mail para resetear contraseña.");
    } else {
        if (email.search("@") && email.search(/\./) > 0) {
            if (password === "") {
                alert("Contraseña es requerida.");
            } else {
                if (password2 === "") {
                    alert("Por favor repetir la contraseña.");
                } else {
                    if (password !== password2) {
                        alert("Contraseñas ingresadas no son identicas.");
                    } else {
                        if (password2.length <6) {
                            alert("Contraseña debe poseer al menos 6 caracteres.");
                        } else {
                            auth.createUserWithEmailAndPassword(email, password).catch(function (error) {
                                var errorMessage = error.message;
                                alert(errorMessage)
                            });
                        }
                    }
                }
            }
        } else {
            alert("El formato del email is incorrecto.");
        }
    }
}
class RegistrarseModal extends React.Component {
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
                            <div className="right">
                                <i onClick={this.props.volverLoginModal} class="fa fa-fw fa-window-close"></i>
                            </div>
                        </header>

                        <div className="login-form">
                            <div className="subtitle">Registrarse</div>
                            <input type="text" id="email" placeholder="Usuario/email" />
                            <input id="password" type="password" placeholder="Contraseña" />
                            <input id="password2" type="password" placeholder="Repetir Contraseña" />
                        </div>
                        <footer>
                            <div className="right form-actions">
                                <a href="#login" onClick={createMailUser} class="ui-button inactive register">Registrarse</a>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>


        );
    }
}

export default RegistrarseModal;