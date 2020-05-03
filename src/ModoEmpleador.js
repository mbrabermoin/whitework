import React from 'react';
import TrabajoTarjeta from "./components/TrabajoTarjeta";

function elegirEstadoPendiente(){
  document.getElementById("pendientes-empleador").style.color = "black";
  document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
  document.getElementById("completados-empleador").style.color = "#b2bbbd";
}
function elegirEstadoEnProceso(){
  document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
  document.getElementById("enproceso-empleador").style.color = "black";
  document.getElementById("completados-empleador").style.color = "#b2bbbd";
}
function elegirEstadoCompletado(){
  document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
  document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
  document.getElementById("completados-empleador").style.color = "black";
}
class ModoEmpleador extends React.Component {
  render() {
    return (
      <main class='grid'>
        <div class='progress-bar'>
          <span onClick={elegirEstadoPendiente} id="pendientes-empleador">Pendientes</span>
          <span onClick={elegirEstadoEnProceso} id="enproceso-empleador">En Proceso</span>
          <span onClick={elegirEstadoCompletado}id="completados-empleador">Completado</span>
          <div class="push-right"><button class='agregarTrabajo-btn'>Agregar Trabajo</button></div>
        </div>
        <div class='track'>
          <div class='top'>
            <p class='ux'>Trabajos Temporales</p>
          </div>
          <div class='middle middle-empleador'>
            <h2 class='h2'>Asignados</h2>
            <p class='instruction'>Tienes asignados las siguientes trabajos:</p>
          </div>
          <div class='library'>
            <TrabajoTarjeta titulo="Mudanza Simple" zona="Quilmes" tipo="dia" tiempo="3 horas" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
            <TrabajoTarjeta titulo="Mudanza Complicada" zona="Burzaco" tipo="semana" tiempo="4 dias" descripcion="Mudando mi empresa se nos complica..." />
            <TrabajoTarjeta titulo="Mudanza Simple" zona="Quilmes" tipo="dia" tiempo="3 horas" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
            <TrabajoTarjeta titulo="Mudanza Complicada" zona="Burzaco" tipo="semana" tiempo="4 dias" descripcion="Mudando mi empresa se nos complica..." />
          </div>
        </div>


      </main>
    );
  }
}

export default ModoEmpleador;