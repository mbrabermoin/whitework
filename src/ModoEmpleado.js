import React from 'react';
import TrabajoTarjeta from "./components/TrabajoTarjeta";


class ModoEmpleado extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modo: "busqueda"
    }
  }
  elegirEstadoPendiente = () => {
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("pendientes").style.color = "black";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ modo: "pendientes" });
  }
  elegirEstadoEnProceso = () => {
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "black";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ modo: "enproceso" });
  }
  elegirEstadoCompletado = () => {
    document.getElementById("busqueda").style.color = "#b2bbbd";
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "black";
    this.setState({ modo: "completados" });
  }
  elegirEstadoBusqueda = () => {
    document.getElementById("busqueda").style.color = "black";
    document.getElementById("pendientes").style.color = "#b2bbbd";
    document.getElementById("enproceso").style.color = "#b2bbbd";
    document.getElementById("completados").style.color = "#b2bbbd";
    this.setState({ modo: "busqueda" });
  }

  render() {
    return (
      <main className='grid'>
        <div className='progress-bar'>
          <span onClick={this.elegirEstadoBusqueda} id="busqueda">Busqueda</span>
          <span onClick={this.elegirEstadoPendiente} id="pendientes">Pendientes</span>
          <span onClick={this.elegirEstadoEnProceso} id="enproceso">En Proceso</span>
          <span onClick={this.elegirEstadoCompletado} id="completados">Completados</span>
        </div>
        <div className='track'>
          <div className='top'>
            <p className='ux'>Trabajos Temporales</p>
          </div>
          <div className='middle'>
            <h2 className='h2'>Asignados</h2>
            <p className='instruction'>Tienes asignados las siguientes trabajos:</p>
          </div>
          <ul className='track-classes'>
            <li><i className="fas fa-user"></i>Mudanza Mabel</li>
            <li><i className="fas fa-play"></i>Pasear Pitbull</li>
            <li><i className="fas fa-play"></i>Acto fin de año</li>
          </ul>
        </div>
        <div className='message'>
          <div className='r-container'>
            <h3 className='in-progress'>Nuevas Propuestas:</h3>
            <p>Estas buscando nuevos trabajos? Te acercamos algunos recomendados para vos...</p>
          </div>
          <button className='message-btn'>Ver más</button>
        </div>
        <div className='library'>
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