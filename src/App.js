import React from 'react';
import { useUser } from "./session/hooks";
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
function abrirEmpleador(){
  document.getElementById("modoEmpleador").style.display = "block";
  document.getElementById("modoEmpleado").style.display = "none";
  document.getElementById("perfilEmpleado").style.display = "none";
  document.getElementById("empleador-li").style.color = "#eeeeee";
  document.getElementById("empleado-li").style.color = "#b2bbbd";
  document.getElementById("profileTitle").style.color = "#b2bbbd";
}
function abrirEmpleado(){
  document.getElementById("modoEmpleador").style.display = "none";
  document.getElementById("modoEmpleado").style.display = "block";
  document.getElementById("perfilEmpleado").style.display = "none";
  document.getElementById("empleador-li").style.color = "#b2bbbd";
  document.getElementById("empleado-li").style.color = "#eeeeee";
  document.getElementById("profileTitle").style.color = "#b2bbbd";
}
function abrirPerfil(){
  document.getElementById("modoEmpleador").style.display = "none";
  document.getElementById("modoEmpleado").style.display = "none";
  document.getElementById("perfilEmpleado").style.display = "block";
  document.getElementById("empleador-li").style.color = "#b2bbbd";
  document.getElementById("empleado-li").style.color = "#b2bbbd";
  document.getElementById("profileTitle").style.color = "#eeeeee";
}

function App() {
  const user = useUser();
  var fotoPerfil="";
  if(user.photoURL!==null){
    fotoPerfil=<img src={user.photoURL} alt="Avatar" className="avatar" />
  }else{
    fotoPerfil=<img src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="Avatar" className="avatar" />
   }
  return (
    <div className="App">
      <nav className='navbar'>
        <ul className="left-ui">
          <li><img className='logo' alt="log" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331813/treehouse.svg" /></li>
          <li className='home'>CHANGAPP</li>
          <li id="empleado-li" onClick={abrirEmpleado} >Modo Empleado</li>
          <li id="empleador-li" onClick={abrirEmpleador}>Modo Empleador</li>
        </ul>
        <ul className='right-ui'>
          <li className='points' id="profileTitle" onClick={abrirPerfil}>{user.displayName}</li>
  <div className='profile' onClick={userOptions}><div className='background'><i className="fas fa-user">{fotoPerfil}</i></div></div>
          <li><i className="fas fa-bell bell"></i></li>
        </ul>
      </nav>
      <div id='drop-container-id' className='drop-container'>
        <i className="fas fa-caret-up caret"></i>
        <ul className='dropdown'>
          <li onClick={abrirPerfil}>Editar Perfil</li>
          <li onClick={auth.signOut}>Cerrar Sesion</li>
        </ul>
      </div>
      <div id="modoEmpleado">
        <ModoEmpleado/>
        </div>
        <div id="modoEmpleador" >
        <ModoEmpleador/>
        </div>
        <div id="perfilEmpleado" >
        <PerfilEmpleado/>
        </div>      
    </div>
  );
}

export default App;
