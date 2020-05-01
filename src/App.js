import React from 'react';
import { useUser } from "./session/hooks"
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
  return (
    <div className="App">
      <nav class='navbar'>
        <ul class='left-ui'>
          <li><img class='logo' src="https://s3-us-west-2.amazonaws.com/s.cdpn.io/331813/treehouse.svg" /></li>
          <li class='home'>Principal</li>
          <li>Ofertas</li>
          <li>Demandas</li>
        </ul>
        <ul class='right-ui'>
          <li class='points'>{user.displayName}</li>
          <div class='profile' onClick={userOptions}><div class='background'><i class="fas fa-user"><img src={user.photoURL} alt="Avatar" class="avatar" /></i></div></div>
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
      <main class='grid'>
        <div class='progress-bar'>
          <span>Pendientes</span>
          <span>En Proceso</span>
          <span>Completados</span>
        </div>
        <div class='track'>
          <div class='top'>
            <p class='ux'>Trabajos Temporales</p>
          </div>
          <div class='middle'>
            <h2 class='h2'>Asignados</h2>
            <p class='instruction'>Tienes asignados las siguientes trabajos:</p>
          </div>
          <ul class='track-classes'>
            <li><i class="fas fa-user"></i>Mudanza Mabel</li>
            <li><i class="fas fa-play"></i>Pasear Pitbull</li>
            <li><i class="fas fa-play"></i>Acto fin de año</li>
          </ul>
        </div>
        <div class='message'>
          <div class='r-container'>
            <h3 class='in-progress'>Nuevas Propuestas:</h3>
            <p>Estas buscando nuevos trabajos? Te acercamos algunos recomendados para vos...</p>
          </div>
          <button class='message-btn'>Ver más</button>
        </div>
        <div class='library'>
          <div class='card one'>
            <div class='top-library'>
              <i class="fas fa-book-open book"></i>
              <i class="fas fa-ellipsis-h dots"></i>
              <span>Mudanza de oficina</span>
            </div>
            <div class='middle-library'>
              <p class='type'>En el dia</p>
              <h3 class='job-name'>Alem 155, Palermo</h3>
              <p class='desc'>Necesitaria 3 voluntarios para ayudar en una mudanza de oficina...</p>
              <button class='resume-btn btn-one'>Ver Detalle</button>
            </div>
          </div>
          <div class='card two'>
            <div class='top-library'>
              <i class="fas fa-book-open book"></i>
              <i class="fas fa-ellipsis-h dots"></i>
              <span>Obra de teatro</span>
            </div>
            <div class='middle-library'>
              <p class='type'>Semana</p>
              <h3 class='job-name'>Zona San Telmo</h3>
              <p class='desc'>Buscamos una chicha de entre 20-30 años para participar como extra en obra de teatro toda una semana..</p>
              <button class='resume-btn btn-two'>Ver Detalle</button>
            </div>
          </div>
          <div class='card three'>
            <div class='top-library'>
              <i class="fas fa-book-open book"></i>
              <i class="fas fa-ellipsis-h dots"></i>
              <span>Suplencia secretaria</span>
            </div>
            <div class='middle-library'>
              <p class='type'>2 semanas</p>
              <h3 class='job-name'>Recoleta</h3>
              <p class='desc'>Necesitaria una persona de entre 30-50 años para reemplazo temporal de secretaria...</p>
              <button class='resume-btn btn-three'>Ver Detalle</button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
