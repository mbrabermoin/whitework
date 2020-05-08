import React from 'react';
import ModoEmpleado from "./ModoEmpleado";
import ModoEmpleador from "./ModoEmpleador";
import PerfilEmpleado from "./PerfilEmpleado";
import './App.css';
import auth from "./session/api";

let show = false;

// show/hide dropdown menu
function userOptions() {
    if (show === false) {
        document.getElementById("drop-container-id").style.display = "block";
        show = true;
    } else {
        document.getElementById("drop-container-id").style.display = "none";
        show = false;
    }
};
class Main extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            photoURL: this.props.photoURL,
            displayName: this.props.displayName,
            modo: "empleado",
        }
    }
    abrirEmpleador = () => {
        document.getElementById("empleador-li").style.color = "#eeeeee";
        document.getElementById("empleado-li").style.color = "#b2bbbd";
        document.getElementById("profileTitle").style.color = "#b2bbbd";
        this.setState({ modo: "empleador" });
    }
    abrirEmpleado = () => {
        document.getElementById("empleador-li").style.color = "#b2bbbd";
        document.getElementById("empleado-li").style.color = "#eeeeee";
        document.getElementById("profileTitle").style.color = "#b2bbbd";
        this.setState({ modo: "empleado" });
    }
    abrirPerfil = () => {
        document.getElementById("empleador-li").style.color = "#b2bbbd";
        document.getElementById("empleado-li").style.color = "#b2bbbd";
        document.getElementById("profileTitle").style.color = "#eeeeee";
        this.setState({ modo: "perfil" });
    }

    render() {
        var fotoPerfil = "";
        if (this.state.photoURL !== null) {
            fotoPerfil = <img src={this.state.photoURL} alt="Avatar" className="avatar" />
        } else {
            fotoPerfil = <img src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="Avatar" className="avatar" />
        }
        var screen = "";
        if (this.state.modo === "perfil") {
            screen = <PerfilEmpleado />
        } else {
            if (this.state.modo === "empleado") {
                screen = <ModoEmpleado/>
            } else {
                screen = <ModoEmpleador/>
            }
        }
        return (
            <div className="App">
                <nav className='navbar'>
                    <ul className="left-ui">
                        <li><img className='logo' alt="log" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331813/treehouse.svg" /></li>
                        <li className='home'>CHANGAPP</li>
                        <li id="empleado-li" onClick={this.abrirEmpleado} >Modo Empleado</li>
                        <li id="empleador-li" onClick={this.abrirEmpleador}>Modo Empleador</li>
                    </ul>
                    <ul className='right-ui'>
                        <li className='points' id="profileTitle" onClick={this.abrirPerfil}>{this.state.displayName}</li>
                        <div className='profile' onClick={userOptions}><div className='background'><i className="fas fa-user">{fotoPerfil}</i></div></div>
                        <li><i className="fas fa-bell bell"></i></li>
                    </ul>
                </nav>
                <div id='drop-container-id' className='drop-container'>
                    <i className="fas fa-caret-up caret"></i>
                    <ul className='dropdown'>
                        <li onClick={this.abrirPerfil}>Editar Perfil</li>
                        <li onClick={auth.signOut}>Cerrar Sesion</li>
                    </ul>
                </div>
                {screen}
            </div>);
    }
}

export default Main;