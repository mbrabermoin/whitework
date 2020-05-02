import React from 'react';
import { useUser } from "./session/hooks";
import ModoEmpleado from "./ModoEmpleado";
import ModoEmpleador from "./ModoEmpleador";
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


function App() {
  const user = useUser();
  var fotoPerfil="";
  if(user.photoURL!==null){
    fotoPerfil=<img src={user.photoURL} alt="Avatar" class="avatar" />
  }else{
    fotoPerfil=<img src="https://f1.pngfuel.com/png/1008/352/43/circle-silhouette-user-user-profile-user-interface-login-user-account-avatar-data-png-clip-art.png" alt="Avatar" class="avatar" />
   }
  return (
    <div className="App">
      <nav class='navbar'>
        <ul class='left-ui'>
          <li><img class='logo' alt="log" src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331813/treehouse.svg" /></li>
          <li class='home'>Principal</li>
          <li>Ofertas</li>
          <li>Demandas</li>
        </ul>
        <ul class='right-ui'>
          <li class='points'>{user.displayName}</li>
  <div class='profile' onClick={userOptions}><div class='background'><i class="fas fa-user">{fotoPerfil}</i></div></div>
          <li><i class="fas fa-bell bell"></i></li>
        </ul>
      </nav>
      <div id='drop-container-id' class='drop-container'>
        <i class="fas fa-caret-up caret"></i>
        <ul class='dropdown'>
          <li>Editar Perfil</li>
          <li onClick={auth.signOut}>Cerrar Sesion</li>
        </ul>
      </div>
      <ModoEmpleado/>
      <ModoEmpleador/>
    </div>
  );
}

export default App;
