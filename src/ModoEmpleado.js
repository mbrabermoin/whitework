import React from 'react';
import TrabajoTarjeta from "./components/TrabajoTarjeta";

function elegirEstadoPendiente(){
  document.getElementById("busqueda").style.color = "#b2bbbd";
  document.getElementById("pendientes").style.color = "black";
  document.getElementById("enproceso").style.color = "#b2bbbd";
  document.getElementById("completados").style.color = "#b2bbbd";
}
function elegirEstadoEnProceso(){
  document.getElementById("busqueda").style.color = "#b2bbbd";
  document.getElementById("pendientes").style.color = "#b2bbbd";
  document.getElementById("enproceso").style.color = "black";
  document.getElementById("completados").style.color = "#b2bbbd";
}
function elegirEstadoCompletado(){
  document.getElementById("busqueda").style.color = "#b2bbbd";
  document.getElementById("pendientes").style.color = "#b2bbbd";
  document.getElementById("enproceso").style.color = "#b2bbbd";
  document.getElementById("completados").style.color = "black";
}
function elegirEstadoBusqueda(){
  document.getElementById("busqueda").style.color = "black";
  document.getElementById("pendientes").style.color = "#b2bbbd";
  document.getElementById("enproceso").style.color = "#b2bbbd";
  document.getElementById("completados").style.color = "#b2bbbd";
}
class ModoEmpleado extends React.Component {
  render() {
    return (
      <main class='grid'>
        <div class='progress-bar'>
          <span onClick={elegirEstadoBusqueda} id="busqueda">Busqueda</span>
          <span onClick={elegirEstadoPendiente} id="pendientes">Pendientes</span>
          <span onClick={elegirEstadoEnProceso} id="enproceso">En Proceso</span>
          <span onClick={elegirEstadoCompletado} id="completados">Completados</span>
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
          <TrabajoTarjeta titulo="Mudanza Simple" zona="Quilmes" tipo="dia" tiempo="3 horas" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
          <TrabajoTarjeta titulo="Mudanza Complicada" zona="Burzaco" tipo="semana" tiempo="4 dias" descripcion="Mudando mi empresa se nos complica..." />
          <TrabajoTarjeta titulo="Obra de teatro" zona="Palermo" tipo="dia" tiempo="3 horas" descripcion="Necesito actor de extra para una obra, no es muy popular, pero me ayudaria mucho..." />
          <TrabajoTarjeta titulo="Cocacolera en la cancha" zona="Quilmes" tipo="dia" tiempo="3 horas" descripcion="Repartimo coca con lo pibes ahi la barra y nos hacemos unos pesos..." />
          <TrabajoTarjeta titulo="Concierto de Arpas" zona="Morón" tipo="quincena" tiempo="2 semanas" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
          <TrabajoTarjeta titulo="Mudanza Complicada" zona="Burzaco" tipo="quincena" tiempo="4 dias" descripcion="Nos juntamos en plazas a dar conciertos y necesitamos un organizador de arpas..." />
          <TrabajoTarjeta titulo="Obra de teatro" zona="Palermo" tipo="quincena" tiempo="3 horas" descripcion="Necesito actor de extra para una obra, no es muy popular, pero me ayudaria mucho..." />
          <TrabajoTarjeta titulo="Cocacolera en la cancha" zona="Quilmes" tipo="quincena" tiempo="3 horas" descripcion="Repartimo coca con lo pibes ahi la barra y nos hacemos unos pesos..." />
        </div>
      </main>
    );
  }
}

export default ModoEmpleado;