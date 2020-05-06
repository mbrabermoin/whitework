import React from 'react';
import TrabajoTarjeta from "./components/TrabajoTarjeta";
import AgregarTrabajo from "./components/AgregarTrabajo";

function elegirEstadoPendiente() {
  document.getElementById("pendientes-empleador").style.color = "black";
  document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
  document.getElementById("completados-empleador").style.color = "#b2bbbd";
  document.getElementById("temporales-titulo").textContent = "Trabajos Temporales - Pendientes";
}
function elegirEstadoEnProceso() {
  document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
  document.getElementById("enproceso-empleador").style.color = "black";
  document.getElementById("completados-empleador").style.color = "#b2bbbd";
  document.getElementById("temporales-titulo").textContent = "Trabajos Temporales - En Progreso";
}
function elegirEstadoCompletado() {
  document.getElementById("pendientes-empleador").style.color = "#b2bbbd";
  document.getElementById("enproceso-empleador").style.color = "#b2bbbd";
  document.getElementById("completados-empleador").style.color = "black";
  document.getElementById("temporales-titulo").textContent = "Trabajos Temporales - Completado";
}
class ModoEmpleador extends React.Component {
  render() {
    var trabajos = "";
    if (1 === 1) {
      trabajos = <div className="sinTrabajos">
        No se han encontrado trabajos.
    </div>
    } else {
      trabajos = <div className='library'>
        <TrabajoTarjeta titulo="Mudanza Simple" zona="Quilmes" tipo="dia" tiempo="3 horas" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
        <TrabajoTarjeta titulo="Mudanza Complicada" zona="Burzaco" tipo="semana" tiempo="4 dias" descripcion="Mudando mi empresa se nos complica..." />
        <TrabajoTarjeta titulo="Mudanza Simple" zona="Quilmes" tipo="dia" tiempo="3 horas" descripcion="Me estoy mudando estoy necesitando gente que me ayude con las cajas..." />
        <TrabajoTarjeta titulo="Mudanza Complicada" zona="Burzaco" tipo="semana" tiempo="4 dias" descripcion="Mudando mi empresa se nos complica..." />
      </div>
    }
    return (
      <main className='grid'>
        <div className='progress-bar'>
          <span onClick={elegirEstadoPendiente} id="pendientes-empleador">Pendientes</span>
          <span onClick={elegirEstadoEnProceso} id="enproceso-empleador">En Proceso</span>
          <span onClick={elegirEstadoCompletado} id="completados-empleador">Completado</span>
          <div className="push-right"><AgregarTrabajo/></div>
        </div>
        <div className='track'>
          <div className='top'>
            <p id="temporales-titulo" className='ux'>Trabajos Temporales - Pendientes</p>
          </div>
          {trabajos}
        </div>
      </main>
    );
  }
}

export default ModoEmpleador;